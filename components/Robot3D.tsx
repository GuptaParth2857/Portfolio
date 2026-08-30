"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Sparkles,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/robot-warrior.glb";
const SCALE = 2.1;

useGLTF.preload(MODEL_URL);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CHEST_LOW = 1.28;
const CHEST_MID = 1.42;
const CHEST_HIGH = 1.52;
const CHEST_PLANE = 0.128;
const CHEST_SHOULDER = 0.055;

const MATERIAL_ROUGHNESS = 0.28;
const MATERIAL_METALNESS = 0.62;
const MATERIAL_ENV = 1.3;

function makeSilverMap(map: THREE.Texture): THREE.Texture {
  const image = map.image as HTMLImageElement | undefined;
  if (!image || !image.width) return map;
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return map;
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const v = Math.min(255, lum * 1.6);
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = map.colorSpace;
  tex.wrapS = map.wrapS;
  tex.wrapT = map.wrapT;
  tex.flipY = map.flipY;
  tex.anisotropy = map.anisotropy;
  return tex;
}

function upgradeMaterial(material: THREE.MeshStandardMaterial) {
  const mat = new THREE.MeshStandardMaterial();
  mat.copy(material);
  if (mat.map) mat.map = makeSilverMap(mat.map);
  mat.color.setRGB(1.12, 1.13, 1.16);
  mat.roughness = MATERIAL_ROUGHNESS;
  mat.metalness = MATERIAL_METALNESS;
  mat.envMapIntensity = MATERIAL_ENV;
  return mat;
}

const ARM_PARTS = new Set([
  "Scifi_piece1_low",
  "upper_arm_low",
  "outer_arm3_low",
  "inner_arm_low",
  "hand_low",
  "ihand_low",
  "finger_low",
]);

const HEAD_PARTS = new Set([
  "Tube_shape_gen_low",
  "Bottom_pi_low",
  "Back_pi_low",
  "extra_pi_low",
  "glass_low",
  "Top_piece_low",
]);
const SHOULDER_R = new THREE.Vector3(0.18, 1.45, -0.008);

const SHOULDER_L = new THREE.Vector3(-0.18, 1.45, -0.008);

function splitHalfGeometry(geo: THREE.BufferGeometry, side: 1 | -1) {
  const pos = geo.attributes.position;
  const keep: number[] = [];
  for (let v = 0; v < pos.count; v++) {
    if (side * pos.getX(v) > 0.0005) keep.push(v);
  }
  const map = new Map<number, number>();
  keep.forEach((v, i) => map.set(v, i));
  const n = keep.length;
  const out = new THREE.BufferGeometry();
  for (const name of ["position", "normal", "uv", "tangent"] as const) {
    const a = geo.getAttribute(name);
    if (!a) continue;
    const src = a.array as Float32Array;
    const dst = new Float32Array(n * a.itemSize);
    for (let i = 0; i < n; i++) {
      for (let c = 0; c < a.itemSize; c++) dst[i * a.itemSize + c] = src[keep[i] * a.itemSize + c];
    }
    out.setAttribute(name, new THREE.BufferAttribute(dst, a.itemSize));
  }
  const idx = geo.getIndex();
  if (idx) {
    const src = idx.array as Uint16Array | Uint32Array;
    const Ctor = src instanceof Uint32Array ? Uint32Array : Uint16Array;
    const dst = new Ctor(idx.count);
    for (let i = 0; i < idx.count; i++) dst[i] = map.get(src[i]) ?? 0;
    out.setIndex(new THREE.BufferAttribute(dst, 1));
  }
  return out;
}

function splitArms(holder: THREE.Object3D) {
  const right = new THREE.Group();
  const left = new THREE.Group();
  right.name = "rightArm";
  left.name = "leftArm";
  right.position.copy(SHOULDER_R);
  left.position.copy(SHOULDER_L);
  holder.add(right, left);

  const armMeshes: THREE.Mesh[] = [];
  holder.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const part = obj.parent ? obj.parent.name : "";
      if (part && ARM_PARTS.has(part)) armMeshes.push(obj as THREE.Mesh);
    }
  });

  armMeshes.forEach((mesh) => {
    const gR = splitHalfGeometry(mesh.geometry, 1);
    const gL = splitHalfGeometry(mesh.geometry, -1);
    gR.translate(-SHOULDER_R.x, -SHOULDER_R.y, -SHOULDER_R.z);
    gL.translate(-SHOULDER_L.x, -SHOULDER_L.y, -SHOULDER_L.z);

    const material = mesh.material;
    const mR = new THREE.Mesh(gR, material);
    const mL = new THREE.Mesh(gL, material);
    mR.name = `${mesh.parent?.name ?? "arm"}_R`;
    mL.name = `${mesh.parent?.name ?? "arm"}_L`;
    right.add(mR);
    left.add(mL);

    mesh.parent?.remove(mesh);
  });

  return { right, left };
}

const SILHOUETTE: ReadonlyArray<readonly [number, number]> = [
  [0.0, 1.0],
  [0.6, 1.0],
  [0.8, 1.0],
  [0.95, 0.82],
  [1.05, 0.86],
  [1.15, 1.0],
  [1.3, 1.22],
  [1.45, 1.3],
  [1.55, 1.12],
  [1.9, 1.05],
];

const CORE_DEPTH = new Set([
  "inner_low",
  "main_body_low",
  "front_stomach1_low",
  "back_stomach2_low",
  "hip_front_piece1_low",
  "hip_back_piece1_low",
  "collar_low",
]);

function silhouetteScale(y: number) {
  if (y <= SILHOUETTE[0][0]) return SILHOUETTE[0][1];
  for (let i = 1; i < SILHOUETTE.length; i++) {
    const [y0, s0] = SILHOUETTE[i - 1];
    const [y1, s1] = SILHOUETTE[i];
    if (y <= y1) return lerp(s0, s1, (y - y0) / (y1 - y0 || 1));
  }
  return SILHOUETTE[SILHOUETTE.length - 1][1];
}

function masculinize(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    if (obj.name === "breast_pieces_low" || obj.parent?.name === "breast_pieces_low") {
      obj.visible = false;
      return;
    }
    if (!(obj as THREE.Mesh).isMesh) return;
    const part = obj.parent ? obj.parent.name : "";
    const geo = (obj as THREE.Mesh).geometry;
    if (!geo.attributes.position) return;
    const pos = geo.attributes.position.array as Float32Array;
    let changed = false;

    for (let i = 0; i < pos.length; i += 3) {
      const y = pos[i + 1];
      const s = silhouetteScale(y);
      const vx = pos[i] * s;
      let vz = pos[i + 2];

      if (part === "main_body_low" && y >= CHEST_LOW && y <= CHEST_HIGH) {
        const target =
          y <= CHEST_MID
            ? CHEST_PLANE
            : lerp(CHEST_PLANE, CHEST_SHOULDER, (y - CHEST_MID) / (CHEST_HIGH - CHEST_MID));
        if (vz > target) vz = target;
      }

      if (CORE_DEPTH.has(part)) vz *= 1.06;

      if (vx !== pos[i] || vz !== pos[i + 2]) changed = true;
      pos[i] = vx;
      pos[i + 2] = vz;
    }

    if (changed) geo.computeVertexNormals();
  });
}

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = useRef(0);
  const timer = useRef(new THREE.Timer());
  const rightArm = useRef<THREE.Group | null>(null);
  const leftArm = useRef<THREE.Group | null>(null);
  const headNodes = useRef<THREE.Object3D[]>([]);
  const chestNode = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF(MODEL_URL);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group || !scene) return;

    const dispose = (obj: THREE.Object3D) => {
      obj.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          (mesh.material as THREE.Material)?.dispose();
        }
      });
    };
    const clear = () => {
      while (group.children.length) {
        const child = group.children[0];
        dispose(child);
        group.remove(child);
      }
      rightArm.current = null;
      leftArm.current = null;
      headNodes.current = [];
      chestNode.current = null;
    };
    clear();

    const model = scene.clone(true);
    const upgraded = new Map<string, THREE.MeshStandardMaterial>();
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry = mesh.geometry.clone();
        const base = mesh.material as THREE.MeshStandardMaterial;
        if (base?.isMeshStandardMaterial) {
          const key = base.uuid;
          let mat = upgraded.get(key);
          if (!mat) {
            mat = upgradeMaterial(base);
            upgraded.set(key, mat);
          }
          mesh.material = mat;
        }
      }
      if (HEAD_PARTS.has(child.name)) headNodes.current.push(child);
      if (child.parent?.name === "main_body_low") chestNode.current = child;
    });
    masculinize(model);
    const { right, left } = splitArms(model);
    rightArm.current = right;
    leftArm.current = left;
    group.add(model);
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.x -= center.x;
    group.position.z -= center.z;
    group.position.y -= box.min.y;
    baseY.current = group.position.y;

    return clear;
  }, [scene]);

  useFrame(() => {
    timer.current.update();
    const group = groupRef.current;
    if (!group) return;
    const t = timer.current.getElapsed();

    headNodes.current.forEach((node) => {
      node.rotation.y = Math.sin(t * 0.4) * 0.2 + Math.sin(t * 0.93) * 0.04;
    });

    if (chestNode.current) {
      chestNode.current.scale.y = 1 + Math.sin(t * 1.1) * 0.012;
    }
  });

  return <group ref={groupRef} scale={SCALE} />;
}

function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <RobotModel />
        <Environment resolution={256} background={false}>
          <Lightformer intensity={3.6} color="#ffffff" position={[0, 4, 2]} scale={[7, 3.5, 1]} />
          <Lightformer intensity={2.2} color="#ffffff" position={[0, 4.5, -3]} scale={[6, 3, 1]} />
          <Lightformer intensity={1.8} color="#6366f1" position={[-4, 1.5, 2]} scale={[3, 5, 1]} />
          <Lightformer intensity={1.4} color="#a855f7" position={[4, -1, 3]} scale={[3, 5, 1]} />
          <Lightformer intensity={1.4} color="#ffffff" position={[0, 0, 4.5]} scale={[5, 5, 1]} />
          <Lightformer intensity={1.0} color="#93a3ff" position={[1.5, -2, 3]} scale={[4, 2, 1]} />
          <Lightformer intensity={1.6} color="#93b4ff" position={[-3.5, 2.5, -3]} scale={[3, 3, 1]} />
          <Lightformer intensity={3.0} color="#22d3ee" position={[0, 2, -4]} scale={[3, 6, 1]} />
        </Environment>
        <Sparkles count={24} scale={[6, 4, 3]} size={1.8} speed={0.4} color="#a855f7" opacity={0.6} />
      </Suspense>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={10} blur={2.8} far={3.5} color="#000000" frames={1} />
      <OrbitControls
        target={[0, 1.95, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        minPolarAngle={Math.PI * 0.26}
        maxPolarAngle={Math.PI * 0.62}
      />
    </>
  );
}

export default function Robot3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 5.6], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.65} />
      <Scene />
    </Canvas>
  );
}
type IconProps = {
  className?: string;
};

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.33.72-4.03-1.6-4.03-1.6-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18a4.56 4.56 0 0 1 1.24 3.22c0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28Z" />
      <path d="M5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z" />
      <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export function LeetCodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.23l-3.85 4.13a5.27 5.27 0 0 0-1.21 2.1 5.3 5.3 0 0 0-.13.51 5.52 5.52 0 0 0 .06 2.36 5.83 5.83 0 0 0 .35 1.02 5.94 5.94 0 0 0 1.27 1.82l4.28 4.19.04.04a5.82 5.82 0 0 0 8.06-.08l2.4-2.39a1.38 1.38 0 0 0 0-1.96 1.38 1.38 0 0 0-1.95 0l-2.4 2.4a3.02 3.02 0 0 1-4.2.04l-.02-.02-4.28-4.19a2.68 2.68 0 0 1-.94-2.27 2.54 2.54 0 0 1 .06-.52 2.55 2.55 0 0 1 .63-1.17l3.85-4.13c1.06-1.13 3.2-1.27 4.43-.28l3.5 2.83a1.38 1.38 0 0 0 1.73-2.15l-3.5-2.83a5.77 5.77 0 0 0-2.77-1.2l2.02-2.16A1.38 1.38 0 0 0 13.48 0Zm-2.86 12.82a1.38 1.38 0 0 0-1.38 1.38 1.38 1.38 0 0 0 1.38 1.38h7.31a1.38 1.38 0 0 0 1.38-1.38 1.38 1.38 0 0 0-1.38-1.38Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12Z" />
    </svg>
  );
}

const socialIconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  leetcode: LeetCodeIcon,
  x: XIcon,
} as const;

export type SocialIconName = keyof typeof socialIconMap;

export function SocialIcon({ name, className }: { name: SocialIconName; className?: string }) {
  const Cmp = socialIconMap[name];
  return <Cmp className={className} />;
}
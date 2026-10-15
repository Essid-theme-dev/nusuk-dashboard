/**
 * Demo portrait URLs via pravatar.cc (real headshot-style photos, stable per ?img=).
 * Replace with your own CDN or user-upload URLs in production.
 */
const host = "https://i.pravatar.cc";

/** Stable face per seed string (e.g. email slug or name), size in px. */
export function demoAvatarUrl(seed: string, size: number): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const img = (h % 70) + 1;
  return `${host}/${size}?img=${img}`;
}

/** Named characters so the same person matches across screens. */
export const demoAvatars = {
  alexCarter: `${host}/256?img=12`,
  emma: `${host}/256?img=47`,
  sophieEvans: `${host}/256?img=16`,
  linaPorter: `${host}/256?img=23`,
  masonClark: `${host}/256?img=33`,
  miraStone: `${host}/256?img=5`,
  oliviaReed: `${host}/256?img=9`,
  ethanBrooks: `${host}/256?img=14`,
  noahSmith: `${host}/256?img=18`,
  emmaLewis: `${host}/256?img=32`,
  employeeProfile: `${host}/384?img=44`,
} as const;

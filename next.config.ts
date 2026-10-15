import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && Boolean(process.env.GITHUB_REPOSITORY);
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const projectBasePath = isGitHubPagesBuild && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: projectBasePath,
  },
  output: isGitHubPagesBuild ? "export" : undefined,
  trailingSlash: isGitHubPagesBuild,
  basePath: isGitHubPagesBuild ? projectBasePath : undefined,
  assetPrefix: isGitHubPagesBuild ? projectBasePath : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

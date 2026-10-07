import type { NextConfig } from "next";

// GitHub Pages(won2070-commits.github.io/hansung-church)용 하위 경로. 공식 도메인으로 옮길 땐 BASE_PATH 없이 빌드.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;

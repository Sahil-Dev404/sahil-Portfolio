import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error Next.js 16 agentRules flag
  agentRules: false,
};

export default nextConfig;

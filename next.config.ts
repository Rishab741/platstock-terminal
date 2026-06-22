import type { NextConfig } from "next";
import os from "os";

function getLocalDevOrigins(): string[] {
  const origins: string[] = [];
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces ?? []) {
      if (iface.family === "IPv4" && !iface.internal) {
        origins.push(iface.address);
      }
    }
  }
  return origins;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalDevOrigins(),
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

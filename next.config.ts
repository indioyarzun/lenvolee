import { getDomain } from "@/utils/vercelBlob";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${getDomain(process.env.BLOB_READ_WRITE_TOKEN ?? "")}.public.blob.vercel-storage.com`,
      },
    ],
  },
};

export default withPayload(nextConfig);

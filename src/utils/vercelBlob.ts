import { Media } from "@/payload-types";

export const getDomain = (token: string) => {
  return token.split("_")[3].toLowerCase();
};

export const getUrl = (token: string) => {
  return `https://${getDomain(token)}.public.blob.vercel-storage.com`;
};

export const getPicture = (_picture?: number | Media | null): Media => {
  const picture = _picture as Media;
  if (!picture || typeof picture === "number") {
    return picture;
  }
  picture!.url = `${getUrl(process.env.BLOB_READ_WRITE_TOKEN ?? "")}/${picture?.prefix}/${picture?.filename}`;

  return picture;
};

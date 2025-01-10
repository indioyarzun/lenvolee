import { Media } from "@/payload-types";

export const getDomain = (token: string) => {
  return token.split("_")[3].toLowerCase();
};

export const getUrl = (token: string) => {
  return `https://${getDomain(token)}.public.blob.vercel-storage.com`;
};

export const getPicture = (_picture?: number | Media | null) => {
  let picture: Media;
  if (!_picture) {
    picture = {
      url: "",
      alt: "",
    } as Media;
  } else {
    picture = _picture as Media;
  }
  picture.url = `${getUrl(process.env.BLOB_READ_WRITE_TOKEN ?? "")}/${picture?.prefix}/${picture?.filename}`;

  return picture;
};

import type { GlobalConfig } from "payload";
import SeoBlock from "./SeoBlock";
import ContentBlock from "./ContentBlock";
import TableBlock from "./TableBlock";

export const Home: GlobalConfig = {
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    livePreview: {
      url: (data) => {
        const url = new URL(data.req.headers.get("referer") ?? "");

        return `${url.origin}?draft=true`;
      },
    },
  },
  slug: "home",
  label: {
    fr: "Accueil",
  },
  dbName: "home",
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "picture",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      labels: {
        singular: {
          fr: "Bloc de contenu",
        },
        plural: {
          fr: "Blocs de contenu",
        },
      },
      type: "blocks",
      blocks: [ContentBlock, TableBlock],
    },
    {
      name: "seo",
      labels: {
        singular: {
          fr: "Référencement",
        },
        plural: {
          fr: "Référencements",
        },
      },
      type: "blocks",
      required: true,
      maxRows: 1,
      blocks: [SeoBlock],
    },
  ],
};

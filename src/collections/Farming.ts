import type { GlobalConfig } from "payload";
import ContentBlock from "./ContentBlock";
import SeoBlock from "./SeoBlock";
import TableBlock from "./TableBlock";

export const Farming: GlobalConfig = {
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

        return `${url.origin}/elevage?draft=true`;
      },
    },
  },
  slug: "farming",
  label: {
    fr: "Élevage",
  },
  dbName: "farming",
  fields: [
    {
      name: "title",
      label: {
        fr: "Titre",
      },
      type: "text",
      required: true,
      maxLength: 100,
    },
    {
      name: "picture",
      label: {
        fr: "Image",
      },
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      label: {
        fr: "Blocs de contenu",
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
      maxRows: 1,
      blocks: [SeoBlock],
    },
  ],
};

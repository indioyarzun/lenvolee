import type { GlobalConfig } from "payload";
import ContentBlock from "./blocks/ContentBlock";
import SeoBlock from "./blocks/SeoBlock";
import TableBlock from "./blocks/TableBlock";

export const Courses: GlobalConfig = {
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    livePreview: {
      url: (data) => {
        const url = new URL(data.req.headers.get("referer") ?? "");

        return `${url.origin}/formations?draft=true`;
      },
    },
  },
  slug: "course",
  label: {
    fr: "Formation",
  },
  dbName: "course",
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
      maxRows: 1,
      blocks: [SeoBlock],
    },
  ],
};

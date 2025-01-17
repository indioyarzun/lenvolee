import type { GlobalConfig } from "payload";
import ContentBlock from "./blocks/ContentBlock";
import SeoBlock from "./blocks/SeoBlock";
import TableBlock from "./blocks/TableBlock";

export const Farming: GlobalConfig = {
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

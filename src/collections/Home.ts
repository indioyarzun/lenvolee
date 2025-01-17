import type { GlobalConfig } from "payload";
import SeoBlock from "./blocks/SeoBlock";
import ContentBlock from "./blocks/ContentBlock";
import TableBlock from "./blocks/TableBlock";

export const Home: GlobalConfig = {
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

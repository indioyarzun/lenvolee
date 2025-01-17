import type { GlobalConfig } from "payload";
import SeoBlock from "./blocks/SeoBlock";

export const HoneysPage: GlobalConfig = {
  slug: "honeyPage",
  label: {
    fr: "Miels",
  },
  dbName: "honeyPage",
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
      name: "description",
      label: {
        fr: "Description",
      },
      type: "richText",
      required: true,
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

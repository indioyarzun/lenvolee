import type { GlobalConfig } from "payload";
import SeoBlock from "./blocks/SeoBlock";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: {
    fr: "Contact",
  },
  dbName: "contact",
  fields: [
    {
      name: "title",
      label: {
        fr: "Titre",
      },
      type: "text",
      required: true,
      defaultValue: "",
      maxLength: 100,
    },
    {
      name: "email",
      label: {
        fr: "Email de reception",
      },
      type: "text",
      required: true,
    },
    {
      name: "toSend",
      label: {
        fr: "Message",
      },
      type: "richText",
      required: true,
    },
    {
      name: "sended",
      label: {
        fr: "Message envoyé",
      },
      type: "text",
      required: true,
      defaultValue: "",
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

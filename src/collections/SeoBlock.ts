import { Block } from "payload";

const SeoBlock: Block = {
  slug: "Seo",
  labels: {
    singular: "Référencement",
    plural: "Référencements",
  },
  imageURL: "/icons/globe.svg",
  imageAltText: "Référencement",
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      defaultValue: "",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "",
    },
  ],
};

export default SeoBlock;

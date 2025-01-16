import { Block } from "payload";

const PictureBlock: Block = {
  slug: "PictureBlock",
  labels: {
    singular: "Texte et photo",
    plural: "Textes et photos",
  },
  imageURL: "/icons/text.svg",
  imageAltText: "Texte et photo",
  interfaceName: "PictureBlock",

  fields: [
    {
      name: "description",
      label: "Description",
      type: "richText",
      required: true,
    },
    {
      name: "picture",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default PictureBlock;

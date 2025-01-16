import { Block } from "payload";

const TableBlock: Block = {
  slug: "TableBlock",
  labels: {
    singular: "Tableau",
    plural: "Tableaux",
  },
  imageURL: "/icons/table.svg",
  imageAltText: "Tableau",
  interfaceName: "TableBlock",
  fields: [
    {
      name: "picture",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      type: "array",
      name: "lines",
      labels: {
        singular: "Ligne",
        plural: "Lignes",
      },
      fields: [
        {
          name: "left",
          label: "Partie gauche",
          type: "text",
          required: true,
        },
        {
          name: "right",
          label: "Partie droite",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
      ],
    },
  ],
};

export default TableBlock;

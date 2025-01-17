import type { CollectionConfig } from "payload";

export const Honeys: CollectionConfig = {
  admin: {
    listSearchableFields: ["title"],
    useAsTitle: "title",
  },
  slug: "honeys",
  labels: {
    singular: {
      fr: "Miel",
    },
    plural: {
      fr: "Miels",
    },
  },
  dbName: "honeys",
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
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "visible",
      label: "Visible",
      type: "checkbox",
      required: true,
    },
    {
      name: "isAvailable",
      label: "Disponible",
      type: "checkbox",
      required: true,
      defaultValue: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      maxLength: 100,
    },
    {
      name: "weight",
      label: "Poids",
      type: "text",
    },
    {
      name: "price",
      label: "Prix",
      type: "text",
    },
    {
      name: "flowers",
      label: "Fleurs",
      type: "relationship",
      relationTo: "flowers",
      hasMany: true,
    },
  ],
};

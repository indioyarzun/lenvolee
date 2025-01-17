import type { CollectionConfig } from "payload";

export const Flowers: CollectionConfig = {
  admin: {
    useAsTitle: "name",
  },
  slug: "flowers",
  labels: {
    singular: {
      fr: "Fleur",
    },
    plural: {
      fr: "Fleurs",
    },
  },
  dbName: "flowers",
  fields: [
    {
      name: "name",
      label: "Nom",
      type: "text",
      required: true,
    },
  ],
};

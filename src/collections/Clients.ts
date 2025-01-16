import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  admin: {
    listSearchableFields: ["name", "surname", "email", "phone"],
    useAsTitle: "name",
  },
  labels: {
    singular: {
      fr: "Client",
    },
    plural: {
      fr: "Clients",
    },
  },
  slug: "client",
  fields: [
    {
      name: "surname",
      label: {
        fr: "Prénom",
      },
      type: "text",
      required: true,
      defaultValue: "",
    },
    {
      name: "name",
      label: {
        fr: "Nom",
      },
      type: "text",
      required: true,
      defaultValue: "",
    },
    {
      name: "email",
      label: {
        fr: "Email",
      },
      type: "text",
    },
    {
      name: "phone",
      label: {
        fr: "Téléphone",
      },
      type: "text",
    },
    {
      name: "comment",
      label: {
        fr: "Comentaire",
      },
      type: "textarea",
    },
    {
      name: "commandes",
      label: {
        fr: "Commandes",
      },
      dbName: "commands",
      type: "array",
      fields: [
        {
          name: "date",
          label: {
            fr: "Date",
          },
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMM yyy",
            },
          },
          type: "date",
          required: true,
        },
        {
          name: "quantity",
          label: {
            fr: "Quantité",
          },
          type: "number",
          defaultValue: 0,
          required: true,
        },
      ],
    },
  ],
};

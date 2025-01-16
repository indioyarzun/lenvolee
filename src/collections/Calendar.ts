import type { GlobalConfig } from "payload";

export const Calendar: GlobalConfig = {
  slug: "calendar",
  label: {
    fr: "Calendrier",
  },
  dbName: "calendar",
  fields: [
    {
      name: "visible",
      label: {
        fr: "Visible",
      },
      type: "checkbox",
      required: true,
    },
    {
      name: "title",
      label: {
        fr: "Titre",
      },
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "startDate",
          label: {
            fr: "Date de début",
          },
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMM yyy",
            },
          },
          required: true,
        },
        {
          name: "endDate",
          label: {
            fr: "Date de fin",
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
          name: "productionPerWeek",
          label: {
            fr: "Production par semaine",
          },
          type: "number",
          required: true,
        },
      ],
    },
  ],
};

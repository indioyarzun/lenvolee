import { getPayload } from "payload";
import config from "@/payload.config";
import { Flower } from "@/payload-types";
import { getPicture } from "@/utils/vercelBlob";
import { generateCalendar } from "@/business/calendar";

export const getHome = async () => {
  const payload = await getPayload({ config });

  const home = await payload.findGlobal({
    slug: "home",
    depth: 1,
  });

  return {
    ...home,
    picture: getPicture(home.picture),
    content: home.content?.map((content) => ({
      ...content,
      picture: getPicture(content.picture),
    })),
  };
};

export const getHoneys = async () => {
  const payload = await getPayload({ config });

  const honeysPromise = payload.find({
    collection: "honeys",
    depth: 1,
    limit: 100,
    sort: ["-isAvailable", "-title"],
  });

  const honeysPagePromise = payload.findGlobal({
    slug: "honeyPage",
    depth: 1,
  });

  const honeysPage = await honeysPagePromise;
  const honeys = await honeysPromise;

  return {
    ...honeysPage,
    picture: getPicture(honeysPage.picture),
    honeys: honeys.docs
      .filter((honey) => honey.visible)
      .map((honey) => ({
        ...honey,
        flowers: honey.flowers?.reverse().map((flower) => flower as Flower),
        picture: getPicture(honey.picture),
      })),
  };
};

export const getCourses = async () => {
  const payload = await getPayload({ config });

  const courses = await payload.findGlobal({
    slug: "course",
    depth: 1,
  });

  return {
    ...courses,
    picture: getPicture(courses.picture),
    content: courses.content?.map((content) => ({
      ...content,
      picture: getPicture(content.picture),
    })),
  };
};

export const getFarming = async () => {
  const payload = await getPayload({ config });

  const clientsPromise = payload.find({
    collection: "client",
    depth: 1,
    limit: 1000,
  });

  const farmingPromise = payload.findGlobal({
    slug: "farming",
    depth: 1,
  });

  const calendarPromise = payload.findGlobal({
    slug: "calendar",
    depth: 1,
  });

  const farming = await farmingPromise;
  const calendar = await calendarPromise;
  const clients = await clientsPromise;

  return {
    ...farming,
    calendar: {
      calendar: calendar,
      calendarWithQuantities: generateCalendar(calendar, clients),
    },
    picture: getPicture(farming.picture),
    content: farming.content?.map((content) => {
      return {
        ...content,
        picture: getPicture(content.picture),
      };
    }),
  };
};

export const getContact = async () => {
  const payload = await getPayload({ config });

  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  return {
    ...contact,
    picture: getPicture(contact.picture),
  };
};

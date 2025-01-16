import { getPayload } from "payload";
import config from "@/payload.config";
import { Flower } from "@/payload-types";
import { getPicture } from "@/utils/vercelBlob";

export const getHome = async ({ draft }: { draft?: string }) => {
  const payload = await getPayload({ config });

  const home = await payload.findGlobal({
    slug: "home",
    depth: 1,
    draft: !!draft,
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

export const getHoneys = async ({ draft }: { draft?: string }) => {
  const payload = await getPayload({ config });

  const honeysPage = await payload.findGlobal({
    slug: "honeyPage",
    depth: 1,
    draft: !!draft,
  });

  const honeys = await payload.find({
    collection: "honeys",
    depth: 1,
    draft: !!draft,
    limit: 100,
  });

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

export const getCourses = async ({ draft }: { draft?: string }) => {
  const payload = await getPayload({ config });

  const courses = await payload.findGlobal({
    slug: "course",
    depth: 1,
    draft: !!draft,
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

export const getFarming = async ({ draft }: { draft?: string }) => {
  const payload = await getPayload({ config });

  const farming = await payload.findGlobal({
    slug: "farming",
    depth: 1,
    draft: !!draft,
  });

  return {
    ...farming,
    picture: getPicture(farming.picture),
    content: farming.content?.map((content) => {
      return {
        ...content,
        picture: getPicture(content.picture),
      };
    }),
  };
};

export const getContact = async ({ draft }: { draft?: string }) => {
  const payload = await getPayload({ config });

  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
    draft: !!draft,
  });

  return {
    ...contact,
    picture: getPicture(contact.picture),
  };
};

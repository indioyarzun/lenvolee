"use server";

import { routes } from "@/routes";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";

export const submitForm = async (formData: FormData) => {
  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: "erik.mejjjor@gmail.com",
    subject: `Prise de contact - ${formData.get("surname")} ${formData.get("name")}`,
    text: `email: ${formData.get("email")}
    
    ${formData.get("message")}`,
  });

  redirect(routes.contactSuccess);
};

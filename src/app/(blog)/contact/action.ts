"use server";

import { routes } from "@/routes";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { getContact } from "@/api";

export const submitForm = async (formData: FormData) => {
  const payload = await getPayload({ config });
  const contact = await getContact();

  await payload.sendEmail({
    to: contact.email,
    subject: `Prise de contact - ${formData.get("surname")} ${formData.get("name")}`,
    text: `email: ${formData.get("mail")}
    téléphone: ${formData.get("phone")}

    ${formData.get("message")}`,
  });

  redirect(routes.contactSuccess);
};

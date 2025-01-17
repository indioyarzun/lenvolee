import Form from "next/form";

import Title from "@/components/Title";
import PictureParagraph from "@/components/PictureParagraph";
import { submitForm } from "./action";
import { getContact } from "@/api";
import { getSeo } from "@/utils/seo";
import { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Input from "@/components/form/Input";
import Phone from "@/components/form/Phone";
import TextArea from "@/components/form/TextArea";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return await getSeo(contact);
}
export const dynamic = "force-dynamic";

export default async function Courses() {
  const contact = await getContact();

  return (
    <PictureParagraph src={contact.picture.url ?? ""} alt={contact.picture.alt}>
      <div className="flex flex-col">
        <div>
          <Title>{contact.title}</Title>
        </div>
        <div className="py-2">
          <RichText
            className="parent [&>p>a]:text-nowrap [&>p>a]:border-b [&>p>a]:border-accent"
            data={contact.toSend}
          />
        </div>
        <Form action={submitForm} className="flex flex-col">
          <div className="flex flex-col">
            <div className="box-content flex gap-4">
              <Input
                label="Prénom"
                id="surname"
                placeholder="Votre prénom"
                required
              />
              <Input label="Nom" id="name" placeholder="Votre nom" required />
            </div>
            <div className="box-content flex gap-4">
              <Input
                label="Email"
                type="email"
                id="mail"
                placeholder="Votre email"
                required
              />
              <Phone
                label="Téléphone"
                type="tel"
                pattern="^(\\+33|0)[1-9]( \\d{2}){4}$"
                id="phone"
                placeholder="06 ..."
              />
            </div>
            <TextArea
              label="Message"
              id="message"
              placeholder="Votre message"
            />
          </div>
          <button
            className="mt-4 flex items-center justify-center self-start rounded-lg bg-accent bg-accent/90 p-4 shadow-lg transition-transform duration-300 hover:bg-accent focus:outline-none focus:ring-4 focus:ring-accent active:scale-95"
            type="submit"
          >
            Envoyer !
          </button>
        </Form>
      </div>
    </PictureParagraph>
  );
}

import Hero from "@/components/Hero";
import Image from "next/image";
import Title from "@/components/Title";
import PictureParagraph from "@/components/PictureParagraph";
import { getFarming } from "@/api";
import { getSeo } from "@/utils/seo";
import { Metadata } from "next";
import Block from "@/components/Block";
import Calendar from "@/components/Calendar";

export async function generateMetadata(): Promise<Metadata> {
  const farming = await getFarming();
  return await getSeo(farming);
}

export default async function Farming() {
  const farming = await getFarming();

  return (
    <>
      <Hero className="overflow-hidden">
        <Image
          className="object-cover"
          src={farming.picture.url ?? ""}
          alt={farming.picture.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </Hero>
      <Title>{farming.title}</Title>

      {farming.content?.map((content, index) => {
        return (
          <PictureParagraph
            position={index % 2 ? "right" : "left"}
            key={content.id}
            src={content.picture?.url ?? ""}
            alt={content.picture?.alt}
          >
            <Block content={content} />
          </PictureParagraph>
        );
      })}
      <Calendar data={farming.calendar} />
    </>
  );
}

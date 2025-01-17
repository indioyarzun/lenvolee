import Hero from "@/components/Hero";
import PictureParagraph from "@/components/PictureParagraph";

import Title from "@/components/Title";
import { RefreshRouteOnSave } from "@/components/RefreshRouterOnSave";
import { getHome } from "@/api";
import Image from "next/image";
import Block from "@/components/Block";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHome();

  return (
    <>
      <RefreshRouteOnSave />
      <Hero className="overflow-hidden">
        <Image
          className="object-cover"
          src={home.picture.url ?? ""}
          alt={home.picture.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </Hero>
      <Title>{home.title}</Title>

      {home.content?.map((content, index) => {
        return (
          <PictureParagraph
            position={index % 2 ? "left" : "right"}
            key={content.id}
            src={content.picture?.url ?? ""}
            alt={content.picture?.alt}
          >
            <Block content={content} />
          </PictureParagraph>
        );
      })}
    </>
  );
}

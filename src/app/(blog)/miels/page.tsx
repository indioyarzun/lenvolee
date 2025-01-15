// import Link from 'next/link'

import Hero from "@/components/Hero";
import Image from "next/image";
import Title from "@/components/Title";
import PageClient from "./PageClient";
import { Flower } from "@/payload-types";
import { RefreshRouteOnSave } from "@/components/RefreshRouterOnSave";
import { getHoneys } from "@/api";
import { getSeo } from "@/utils/seo";
import { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";

export async function generateMetadata(): Promise<Metadata> {
  const honeys = await getHoneys({});
  return await getSeo(honeys);
}

export const revalidate = 60;

export default async function Honeys({
  searchParams,
}: {
  searchParams: Promise<{ draft: string }>;
}) {
  const { draft } = await searchParams;

  const honeys = await getHoneys({ draft });

  const flowersList = honeys.honeys?.reduce<string[]>((acc, honey) => {
    acc.push(
      ...(honey.flowers?.map((flower) => (flower as Flower).name) ?? []),
    );

    return acc;
  }, []);

  const flowers = new Array(...new Set(flowersList));
  flowers.unshift("Toutes");

  return (
    <>
      <RefreshRouteOnSave />

      <Hero className="overflow-hidden">
        <Image
          className="object-cover"
          src={honeys.picture.url ?? ""}
          alt={honeys.picture.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </Hero>
      <Title>{honeys.title}</Title>
      <div className="pt-8">
        <RichText data={honeys.description} />
      </div>

      <PageClient honeys={honeys} flowers={flowers} />
    </>
  );
}

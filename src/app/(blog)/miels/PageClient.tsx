"use client";

import Honey from "@/components/Honey";
import { FC, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { getHoneys } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/routes";
import { motion } from "framer-motion";

// export const dynamic = 'force-dynamic';
export const revalidate = 60;
// export const experimental_ppr = true

const FILTER_ALL = "toutes";

const HoneysClient: FC<{
  honeys: Awaited<ReturnType<typeof getHoneys>>;
  flowers: string[];
}> = ({ honeys, flowers }) => {
  const [currentFilter, setCurrentFilter] = useState(FILTER_ALL);
  const searchParam = useSearchParams();
  const router = useRouter();
  const [isLg, setIsLg] = useState(false);

  const id = Number.parseInt(searchParam.get("id") ?? "");
  const selectedHoney = honeys.honeys.find((honey) => honey.id === id);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLg(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      <div
        className={cn("transition-all", {
          ["fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"]: !!id,
        })}
        onClick={(e) => {
          e.stopPropagation();
          router.push(routes.honeys, { scroll: false });
        }}
      >
        <div className="hidden items-center justify-center lg:flex lg:h-full lg:w-full">
          {selectedHoney && (
            <motion.div
              layoutId={selectedHoney.id + ""}
              className="w-[320px] lg:w-[450px]"
            >
              <Honey
                id={selectedHoney.id}
                title={selectedHoney.title}
                picture={selectedHoney.picture.url ?? ""}
                pictureAlt={selectedHoney.picture.alt}
                weight={selectedHoney.weight ?? ""}
                price={selectedHoney.price ?? ""}
                isAvailable={selectedHoney.isAvailable ?? false}
                description={selectedHoney.description ?? ""}
                fullSize
                flowers={
                  selectedHoney.flowers?.map((flower) => flower.name) ?? []
                }
              />
            </motion.div>
          )}
        </div>
      </div>

      <div>
        <div className="mb-4 mt-8 lg:text-xl">Filtrer par fleurs :</div>
        <div className="mb-8 flex flex-wrap gap-2">
          {flowers.map((flower) => (
            <div
              className={cn(
                "cursor-pointer rounded-lg bg-accent/40 p-2 px-4 text-xs lg:text-sm",
                {
                  "bg-accent/70": flower === currentFilter,
                },
              )}
              key={flower}
              onClick={() => {
                if (currentFilter === flower) {
                  setCurrentFilter(FILTER_ALL);
                } else {
                  setCurrentFilter(flower);
                }
              }}
            >
              {flower}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 sm:mt-8 sm:gap-16">
        {honeys.honeys
          ?.filter(
            (honey) =>
              currentFilter === FILTER_ALL ||
              honey.flowers?.find((flower) => flower.name === currentFilter),
          )
          .map((honey) => (
            <motion.div
              layoutId={honey.id + ""}
              id={honey.id + ""}
              key={honey.id}
              className={cn("w-[320px]", {
                ["z-[60] lg:z-auto"]: selectedHoney?.id === honey.id,
              })}
            >
              <Honey
                id={honey.id}
                title={honey.title}
                picture={honey.picture.url ?? ""}
                pictureAlt={honey.picture.alt}
                weight={honey.weight ?? ""}
                price={honey.price ?? ""}
                isAvailable={honey.isAvailable ?? false}
                description={honey.description ?? ""}
                flowers={honey.flowers?.map((flower) => flower.name) ?? []}
                fullSize={selectedHoney?.id === honey.id && !isLg}
              />
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default HoneysClient;

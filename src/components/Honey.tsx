"use client";

import Image from "next/image";
import logoBio from "@/../public/logo_bio.jpg";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export default function Honey({
  title,
  id,
  picture,
  pictureAlt,
  weight,
  price,
  flowers,
  isAvailable,
  description,
  isSelected,
  onSelect,
}: {
  title: string;
  id: number;
  picture: string;
  pictureAlt: string;
  weight: string;
  price: string;
  flowers: string[];
  isAvailable: boolean;
  description: string;
  isSelected?: boolean;
  onSelect: () => void;
}) {
  return (
    <>
      <motion.div
        id={id + ""}
        layoutId={id + ""}
        className={cn(
          "relative flex h-[480px] w-[320px] cursor-pointer flex-col rounded-xl border-stone-200 bg-white shadow-md",
          {
            ["z-[60] h-[640px] w-[380px]"]: isSelected,
          },
        )}
        onClick={onSelect}
      >
        {!isAvailable && (
          <div className="flex justify-center">
            <div className="absolute top-[200px] z-20 rounded-xl bg-background p-4 text-center text-xl font-bold">
              Rupture de stock
            </div>
          </div>
        )}
        <div
          className={cn("flex h-full flex-col", {
            ["opacity-40"]: !isAvailable,
          })}
        >
          <div
            className={cn(
              "relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-t-xl transition-all",
            )}
          >
            <Image
              src={picture}
              alt={pictureAlt}
              fill
              sizes={"320px"}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-sm">
            <div className="flex justify-between text-black/50">
              <div>{weight}</div>
              <div>{price}</div>
            </div>
            <div className="flex flex-col py-2 pb-4">
              <h3 className="self-center text-xl font-bold opacity-90">
                {title}
              </h3>
              <div
                className={cn("", {
                  "overflow-hidden text-ellipsis whitespace-nowrap":
                    !isSelected,
                })}
              >
                {description}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <Image
                src={logoBio}
                alt="Agriculture biologique"
                width={40}
                style={{ height: "auto" }}
                className="self-end pb-2"
              />
              <div
                className={cn(
                  "flex flex-1 flex-row-reverse flex-wrap-reverse items-start gap-1 overflow-hidden pb-2 text-xs font-semibold text-white transition-all",
                  {
                    ["h-16"]: !isSelected,
                  },
                )}
              >
                {!isSelected && flowers.length > 4 && (
                  <span className="rounded-xl bg-secondary p-1 px-2 align-middle">
                    ...
                  </span>
                )}
                {flowers
                  .filter((_, index) => isSelected || index <= 3)
                  .map((flower, index) => (
                    <span
                      key={index}
                      className="rounded-xl bg-secondary p-1 px-2 align-middle"
                    >
                      {flower}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

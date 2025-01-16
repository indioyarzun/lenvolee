import { cn } from "@/utils/cn";
import Image from "next/image";
import { FC, ReactElement } from "react";

const TableParagraph: FC<{
  src: string;
  alt: string;
  position?: "left" | "right";
  children: ReactElement;
}> = ({ children, src, alt, position = "left" }) => {
  return (
    <div
      className={cn("my-8 flex flex-col gap-8 lg:my-16 lg:flex-row lg:gap-16", {
        ["min-h-[400px]"]: !!src,
      })}
    >
      {position === "right" && (
        <ChildrenWrapper fullWidth={!!src}>{children}</ChildrenWrapper>
      )}
      {!!src && (
        <div className="flex items-center justify-center lg:w-[50%]">
          <div className="relative flex h-[300px] w-full max-w-[600px] overflow-hidden rounded-xl lg:h-[400px]">
            <Image
              className="self-center object-cover"
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}
      <div className="flex self-center lg:hidden">{children}</div>
      {position === "left" && (
        <ChildrenWrapper fullWidth={!!src}>{children}</ChildrenWrapper>
      )}
    </div>
  );
};

const ChildrenWrapper: FC<{ fullWidth: boolean; children: ReactElement }> = ({
  fullWidth,
  children,
}) => {
  return (
    <div
      className={cn("hidden self-center lg:flex", {
        ["lg:w-[50%]"]: !!fullWidth,
      })}
    >
      {children}
    </div>
  );
};

export default TableParagraph;

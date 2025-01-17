import { PictureBlock, TableBlock } from "@/payload-types";
import { FC } from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";

const Block: FC<{
  content: TableBlock | PictureBlock;
}> = ({ content }) => {
  if (content.blockType === "PictureBlock") {
    return <RichText data={content.description} />;
  }
  if (content.blockType === "TableBlock") {
    return (
      <div key={content.id} className="flex flex-col">
        {content.lines?.map((line) => {
          return (
            <>
              <div key={line.id} className="flex">
                <div className="m-2">{line.left}</div>
                <div className="flex min-w-12 flex-1 justify-end py-4">
                  <div className="w-full border-b-2 border-dotted border-black"></div>
                </div>
                <div className="m-2 font-bold">{line.right}</div>
              </div>

              {line.description && (
                <div className="px-2 pb-2">{line.description}</div>
              )}
            </>
          );
        })}
      </div>
    );
  }

  return null;
};

export default Block;

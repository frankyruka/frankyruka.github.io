import Image from "next/image";

export default function ImageBlock({ block }) {
  if (block.type === "single") {
    return (
      <div className="relative w-full h-full mb-5">
        <Image
          src={block.images[0]}
          alt="media"
          width={1920}
          height={1080}
          className="object-cover"
        />
      </div>
    );
  }

  if (block.type === "grid") {
    return (
      <div
        className={`grid grid-cols-${block.cols || 3} ${
          block.rows ? `grid-rows-${block.rows}` : ""
        } gap-6 mb-5`}
      >
        {block.images.map((img, index) => (
          <div
            className={`col-span-${img.colSpan || 1} row-span-${
              img.rowSpan || 1
            }`} 
            key={index}
          >
            <Image
              src={img.src}
              alt={`media-${index}`}
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

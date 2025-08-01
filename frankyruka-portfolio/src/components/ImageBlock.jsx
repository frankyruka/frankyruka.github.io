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
    const gridColsClass = `grid-cols-${block.cols || 3}`;
    const gridRowsClass = block.rows ? `grid-rows-${block.rows}` : "";

    return (
      <div
        className={`grid ${gridColsClass} ${gridRowsClass} gap-6 mb-5`}
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

  // return (
  //   <div className="grid grid-cols-3 grid-rows-2 gap-6">
  //     <div className="col-span-2 row-span-2">
  //       <Image
  //         src={"/media/visdev/dome-textures.jpg"}
  //         alt="media"
  //         width={1920}
  //         height={1080}
  //         className="object-cover"
  //       />
  //     </div>
  //     <div className="col-span-1 row-span-1">
  //       <Image
  //         src={"/media/visdev/dome-textures.jpg"}
  //         alt="media"
  //         width={1920}
  //         height={1080}
  //         className="object-cover"
  //       />
  //     </div>
  //     <div className="col-span-1 row-span-1">
  //       <Image
  //         src={"/media/visdev/dome-textures.jpg"}
  //         alt="media"
  //         width={1920}
  //         height={1080}
  //         className="object-cover"
  //       />
  //     </div>
  //   </div>
  //);
}

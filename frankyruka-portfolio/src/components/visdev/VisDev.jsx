"use client";
import { VIS_DEV_BLOCKS } from "@/data/visdev";
import ImageBlock from "@/components/ImageBlock";
import FadeInScroll from "@/components/animations/FadeInScroll";
import { useState, useEffect } from "react";

export default function AllProjects() {

  const [images, setImages] = useState(null);

  useEffect(() => {
    const all = [];

    Object.values(VIS_DEV_BLOCKS).forEach((blocks) => {
      blocks.forEach((block) => {
        if (block.type === 'single') {
          all.push(block.images);
        } else if( block.type === 'grid'){
          all.push(...block.images.map((img) => img.src));
        }
      });
    });

    setImages(all);
  }, []);

  console.log(images)

  return (
    <div className="w-[75%] mx-auto">
      <FadeInScroll>
        <h1 className="font-magilio text-center text-black text-3xl md:text-[90px]">
          Visual Development
        </h1>

        {Object.entries(VIS_DEV_BLOCKS).map(([projectName, blocks], i) => (
          <div key={i} className="mb-40">
            {/* <h2 className="text-4xl font-bold mb-8">{projectName}</h2> */}
            {blocks.map((block, j) => (
              <ImageBlock key={j} block={block} images={images} />
            ))}
          </div>
        ))}
      </FadeInScroll>
      <div className="mb-52">a</div>
    </div>
  );
}

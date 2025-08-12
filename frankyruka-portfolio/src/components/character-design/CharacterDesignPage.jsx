"use client";
import { CHARACTER_DESIGN_BLOCKS } from "@/data/characterDesign";
import ImageBlock from "@/components/ImageBlock";
import FadeInScroll from "@/components/animations/FadeInScroll";

export default function AllProjects() {
  return (
    <div className="w-[75%] mx-auto mb-50">
      <FadeInScroll>
        <h1 className="font-magilio text-center text-black text-[90px]">
          Character Design
        </h1>

        {Object.entries(CHARACTER_DESIGN_BLOCKS).map(([projectName, projectData], i) => (
          <div key={i} className="mb-52 mt-15">
            <h2 className="text-3xl font-bold mb-8 text-black font-magilio text-center">{projectData.title}</h2>
            {projectData.blocks.map((block, j) => (
              <div key={j}>
                {block.title && <h1 className="text-2xl text-black text-center font-magilio mt-20 mb-10">{block.title}</h1>}
                <ImageBlock key={j} block={block} />
              </div>
            ))}
          </div>
        ))}
      </FadeInScroll>
    </div>
  );
}

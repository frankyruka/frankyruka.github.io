"use client";
import { CHARACTER_DESIGN_BLOCKS } from "@/data/characterDesign";
import ImageBlock from "@/components/ImageBlock";
import FadeInScroll from "@/components/animations/FadeInScroll";

export default function AllProjects() {
  return (
    <div className="w-[90%] mx-auto mb-50">
      <FadeInScroll>
        <h1 className="font-magilio text-center text-black text-[90px]">
          Character Design
        </h1>

        {Object.entries(CHARACTER_DESIGN_BLOCKS).map(([projectName, projectData], i) => (
          <div key={i} className="mb-20 mt-20">
            <h2 className="text-4xl font-bold mb-8 text-black font-magilio text-center">{projectData.title}</h2>
            {projectData.blocks.map((block, j) => (
              <ImageBlock key={j} block={block} />
            ))}
          </div>
        ))}
      </FadeInScroll>
    </div>
  );
}

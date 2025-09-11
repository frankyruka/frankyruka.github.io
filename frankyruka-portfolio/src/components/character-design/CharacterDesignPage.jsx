"use client";
import { CHARACTER_DESIGN_BLOCKS } from "@/data/characterDesign";
import ImageBlock from "@/components/ImageBlock";
import FadeInScroll from "@/components/animations/FadeInScroll";

export default function AllProjects() {
  return (
    <div className="w-[75%] mx-auto mb-50">
      <FadeInScroll>
        <h1 className="font-magilio text-center text-black text-3xl md:text-[90px]">
          Character Design
        </h1>

        {Object.entries(CHARACTER_DESIGN_BLOCKS).map(
          ([projectName, projectData], i) => (
            <div key={i} className="mb-52 mt-15">
              <h2 className="text-xl md:text-3xl font-bold mb-8 text-black font-magilio text-center">
                {projectData.title}
              </h2>
              {projectData.blocks.map((block, j) => (
                <div key={j}>
                  {block.title && (
                    <h1 className="text-lg md:text-2xl text-black text-center font-magilio mt-20 mb-10">
                      {block.title}
                    </h1>
                  )}
                  <ImageBlock key={j} block={block} />
                </div>
              ))}
            </div>
          )
        )}

        <section className="flex justify-center items-center -mt-40 w-full mx-auto my-12">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://player.vimeo.com/video/1112890998"
              width="1300"
              height="1000"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </FadeInScroll>
    </div>
  );
}

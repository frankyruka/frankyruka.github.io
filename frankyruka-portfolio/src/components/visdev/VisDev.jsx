import { VIS_DEV_BLOCKS } from "@/data/visdev";
import ImageBlock from "@/components/ImageBlock";
import FadeInScroll from "../animations/FadeInScroll";

export default function AllProjects() {
  return (
    <div className="w-[90%] mx-auto">
      <FadeInScroll>
        <h1 className="font-magilio text-center text-black text-[90px]">
          Visual Development
        </h1>

        {Object.entries(VIS_DEV_BLOCKS).map(([projectName, blocks], i) => (
          <div key={i} className="mb-20">
            {/* <h2 className="text-4xl font-bold mb-8">{projectName}</h2> */}
            {blocks.map((block, j) => (
              <ImageBlock key={j} block={block} />
            ))}
          </div>
        ))}
      </FadeInScroll>
    </div>
  );
}

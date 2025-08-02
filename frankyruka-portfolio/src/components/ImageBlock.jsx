'use client';
import Image from "next/image";
import gsap from "gsap";

export default function ImageBlock({ block }) {
  if (block.type === "single") {
    return (
      <div
        className="relative w-full h-full mb-5"
        onMouseEnter={(e) => {
          const mouse = document.getElementById('mouse');
          const overlay = e.currentTarget.querySelector('.overlay');
          const open = document.getElementById('open-icon');

          gsap.to(mouse, { scale: 6, duration: 0.3 });
          gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
          gsap.to(open, { scale: 1, duration: 0.3, opacity: 1 });
        }}

        onMouseLeave={(e) => {
          const mouse = document.getElementById('mouse');
          const overlay = e.currentTarget.querySelector('.overlay');
          const open = document.getElementById('open-icon');


          gsap.to(mouse, { scale: 1, duration: 0.3 });
          gsap.to(overlay, { opacity: 0, duration: 0.3 });
          gsap.to(open, { scale: 0, duration: 0.3, opacity: 0 });

        }}
      >

        <div
          className="overlay absolute inset-0 bg-white opacity-0 z-20"
        />
        <Image
          src={block.images[0]}
          alt="media"
          width={1920}
          height={1080}
          className="object-cover z-10"
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
            className={`col-span-${img.colSpan || 1} row-span-${img.rowSpan || 1
              }`}
            key={index}
          >
            <div
              onMouseEnter={(e) => {
                const mouse = document.getElementById('mouse');
                const overlay = e.currentTarget.querySelector('.overlay');
                const open = document.getElementById('open-icon');

                gsap.to(mouse, { scale: 6, duration: 0.3 });
                gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
                gsap.to(open, { scale: 1, duration: 0.3, opacity: 1 });

              }}
              onMouseLeave={(e) => {
                const mouse = document.getElementById('mouse');
                const overlay = e.currentTarget.querySelector('.overlay');
                const open = document.getElementById('open-icon');


                gsap.to(mouse, { scale: 1, duration: 0.3 });

                gsap.to(overlay, { opacity: 0, duration: 0.3 });
                gsap.to(open, { scale: 1, duration: 0.3, opacity: 1 });

              }}
            >
              <div
                className="overlay absolute inset-0 bg-white opacity-0 z-20" />
              <Image
                src={img.src}
                alt={`media-${index}`}
                width={1920}
                height={1080}
                className="object-cover z-10"
              />
            </div>

          </div>
        ))}
      </div>
    );
  }

  return null;

}

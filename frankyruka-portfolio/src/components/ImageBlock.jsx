"use client";
import Image from "next/image";
import gsap from "gsap";
import { useMemo, useRef } from "react";
import { openLightboxFLIPGallery } from "@/utils/openLighboxFlip";
import { preloadImage } from "@/utils/preloadImage";

export default function ImageBlock({ block, images }) {
  const containerRef = useRef(null);
  const COLS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  const ROWS = { 1: "grid-rows-1", 2: "grid-rows-2", 3: "grid-rows-3", 4: "grid-rows-4" };
  const COLSPAN = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4" };
  const ROWSPAN = { 1: "row-span-1", 2: "row-span-2", 3: "row-span-3", 4: "row-span-4" };


  const imageSrcs = useMemo(() => {
    if (!block) return [];
    if (block.type === "single") return block.images || [];
    if (block.type === "grid")
      return (block.images || []).map((i) => i.src).filter(Boolean);
    return [];
  }, [block]);

  // Ayuda: obtiene los <img> de este bloque en el mismo orden que imageSrcs
  const getOriginEls = () => {
    if (!containerRef.current) return null;
    // Busca todos los img dentro del bloque, en el orden de render
    const imgs = Array.from(containerRef.current.querySelectorAll("img"));
    return imgs;
  };

  if (block?.type === "single") {
    return (
      <div
        ref={containerRef}
        className={`relative w-[${block.width ? block.width : 'full'}] h-full mb-5`}
        onMouseEnter={(e) => {
          const mouse = document.getElementById("mouse");
          const overlay = e.currentTarget.querySelector(".overlay");
          const open = document.getElementById("open-icon");
          gsap.to(mouse, { scale: 6, duration: 0.3 });
          gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
          gsap.to(open, { scale: 1, duration: 0.3, opacity: 1 });
        }}
        onMouseLeave={(e) => {
          const mouse = document.getElementById("mouse");
          const open = document.getElementById("open-icon");
          const overlay = e.currentTarget.querySelector(".overlay");

          // corta cualquier tween que estuviera corriendo
          gsap.killTweensOf([open, overlay]);

          // vuelve el cursor a su tamaño
          if (mouse) gsap.to(mouse, { scale: 1, duration: 0.25 });

          // oculta el overlay del tile
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.25 });

          // apaga el icono de "open" de forma determinista
          if (open) gsap.to(open, { opacity: 0, scale: 0, duration: 0.2 });
        }}

        onClick={(e) => {
          const wrapper = e.currentTarget;
          const imgEl = wrapper.querySelector("img");
          openLightboxFLIPGallery({
            images: imageSrcs,
            startIndex: 0,
            originEl: imgEl || wrapper,
            originEls: getOriginEls(), // opcional pero recomendado para cerrar al tile actual
          });
        }}
      >
        <div className="overlay absolute inset-0 bg-white opacity-0 z-20" />
        <Image
          src={imageSrcs[0]}
          alt="media"
          width={1920}
          height={1080}
          className="object-cover z-10"
        />
      </div>
    );
  }

  if (block?.type === "grid") {
    const gridColsClass = COLS[block.cols] || "grid-cols-3";
    const gridRowsClass = block.rows ? (ROWS[block.rows] || "") : "";

    return (
      <div
        ref={containerRef}
        className={`grid ${gridColsClass} ${gridRowsClass} gap-6 mb-5 mx-auto w-[${block.width ? block.width : 'full'}]`}
      >
        {block.images.map((img, index) => (
          <div
            className={`${COLSPAN[img.colSpan || 1]} ${ROWSPAN[img.rowSpan || 1]}`}
            key={index}
          >
            <div
              className="relative"
              onMouseEnter={(e) => {
                const mouse = document.getElementById("mouse");
                const overlay = e.currentTarget.querySelector(".overlay");
                const open = document.getElementById("open-icon");
                gsap.to(mouse, { scale: 6, duration: 0.3 });
                gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
                gsap.to(open, { scale: 1, duration: 0.3, opacity: 1 });
              }}
              onMouseLeave={(e) => {
                const mouse = document.getElementById("mouse");
                const open = document.getElementById("open-icon");
                const overlay = e.currentTarget.querySelector(".overlay");

                // corta cualquier tween que estuviera corriendo
                gsap.killTweensOf([open, overlay]);

                // vuelve el cursor a su tamaño
                if (mouse) gsap.to(mouse, { scale: 1, duration: 0.25 });

                // oculta el overlay del tile
                if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.25 });

                // apaga el icono de "open" de forma determinista
                if (open) gsap.to(open, { opacity: 0, scale: 0, duration: 0.2 });
              }}
              onClick={(e) => {
                const wrapper = e.currentTarget;
                const imgEl = wrapper.querySelector("img");
                openLightboxFLIPGallery({
                  images: imageSrcs,
                  startIndex: index,
                  originEl: imgEl || wrapper,
                  originEls: getOriginEls(), // para cerrar al tile correcto tras navegar
                });
              }}
            >
              <div className="overlay absolute inset-0 bg-white opacity-0 z-20" />
              <Image
                src={img.src}
                onMouseEnter={() => preloadImage(imageSrcs[index])}
                onTouchStart={() => preloadImage(imageSrcs[index])}
                alt={`media-${index}`}
                width={1920}
                height={1080}
                className={`object-cover z-10 ${img.height ? img.height : ''}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

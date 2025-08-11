"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FadeInScroll({ children, className = "" }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1) Selecciona SOLO lo relevante dentro del contenedor (scope)
    const candidates = root.querySelectorAll(
      [
        ":scope h1",
        ":scope h2",
        ":scope h3",
        ":scope p",
        ":scope img",
        ":scope video",
        ":scope .card",
        ":scope .animate",
        ":scope .grid > div" // tiles directos de la grid
      ].join(",")
    );

    // 2) Excluye wrappers y overlays para no duplicar triggers
    const items = Array.from(candidates).filter(
      (el) =>
        !el.classList.contains("overlay") &&
        el.tagName !== "SPAN" && // wrapper de next/image
        el.tagName !== "SVG" &&
        el.tagName !== "PATH"
    );

    // 3) Estado inicial ligero
    gsap.set(items, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });

    // 4) Batch + once (cada trigger se destruye tras animar)
    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.06 },
          onComplete: () => batch.forEach((el) => (el.style.willChange = "")),
        }),
    });

    // 5) Refrescos por media y fuentes (evita starts desfasados)
    const media = root.querySelectorAll("img, video");
    const onLoad = () => ScrollTrigger.refresh();

    media.forEach((m) => {
      if (m.tagName === "IMG" && m.complete) return; // ya cargada
      m.addEventListener("load", onLoad);
      m.addEventListener("loadedmetadata", onLoad);
    });

    // Extra: un refresh tras primer layout y cuando carguen fuentes
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    // Cleanup: solo triggers de este contenedor
    return () => {
      media.forEach((m) => {
        m.removeEventListener("load", onLoad);
        m.removeEventListener("loadedmetadata", onLoad);
      });
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && root.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

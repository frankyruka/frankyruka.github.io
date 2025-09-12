"use client";
import Image from "next/image";
import GsapStaggerWrapper from "../animations/FadeInStagger";
import { useGSAP } from "@gsap/react";
import { useRef, useMemo } from "react";
import gsap from "gsap";

export default function About() {
  const scope = useRef(null);

  // handlers estables para poder quitarlos en cleanup
  const handlers = useMemo(() => {
    const onEnter = (el) =>
      gsap.to(el, { scale: 1.15, y: -8, duration: 0.4, ease: "expo.out" });
    const onLeave = (el) =>
      gsap.to(el, { scale: 1, y: 0, duration: 0.5, ease: "expo.inOut" });
    const onDown = (el) =>
      gsap.to(el, { scale: 0.95, y: -2, duration: 0.2, ease: "sine.out" });
    const onUp = (el) =>
      gsap.to(el, { scale: 1.12, y: -6, duration: 0.3, ease: "expo.out" });
    return { onEnter, onLeave, onDown, onUp };
  }, []);

  useGSAP(
    () => {
      const flags = gsap.utils.toArray(".cv-flag");

      const isFine = window.matchMedia("(pointer:fine)").matches;
      flags.forEach((el) => {
        const enter = () => handlers.onEnter(el);
        const leave = () => handlers.onLeave(el);
        const down = () => handlers.onDown(el);
        const up = () => handlers.onUp(el);

        // guarda refs para cleanup
        el._enter = enter;
        el._leave = leave;
        el._down = down;
        el._up = up;

        if (isFine) {
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          el.addEventListener("mousedown", down);
          el.addEventListener("mouseup", up);
        } else {
          el.addEventListener("touchstart", down, { passive: true });
          el.addEventListener("touchend", up);
        }
      });

      return () => {
        const flags = scope.current?.querySelectorAll?.(".cv-flag") ?? [];
        flags.forEach((el) => {
          if (el._enter) el.removeEventListener("mouseenter", el._enter);
          if (el._leave) el.removeEventListener("mouseleave", el._leave);
          if (el._down) {
            el.removeEventListener("mousedown", el._down);
            el.removeEventListener("touchstart", el._down);
          }
          if (el._up) {
            el.removeEventListener("mouseup", el._up);
            el.removeEventListener("touchend", el._up);
          }
          delete el._enter;
          delete el._leave;
          delete el._down;
          delete el._up;
        });
      };
    },
    { scope, dependencies: [handlers] }
  );

  return (
    <div ref={scope}>
      <GsapStaggerWrapper>
        {/* título (igual, con escala responsive) */}
        <h1 className="font-magilio text-black text-3xl md:text-[100px] text-center leading-tight px-4 md:px-0">
          About me
        </h1>

        {/* redes: wrap en móvil y gap más pequeño */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 mb-6 px-4 md:px-0">
          <a
            href="https://www.instagram.com/frankyruka_draws"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logos/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
              className="cv-flag"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/francisco-javier-ruiz-caparros-918986303/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logos/linkedin.svg"
              alt="Linkedin"
              width={40}
              height={40}
              className="cv-flag"
            />
          </a>
          <a
            href="https://www.artstation.com/frankyruka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logos/artstation.svg"
              alt="Art Station"
              width={40}
              height={40}
              className="cv-flag"
            />
          </a>
        </div>

        {/* bloque principal: mantiene tu layout en desktop, apila en móvil */}
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-8 md:gap-40">
            {/* texto */}
            <p className="text-black font-thin font-calluna text-base sm:text-lg leading-relaxed w-full md:w-1/2">
              In 2025 I graduated with a Bachelor degree in Animation from U-Tad
              University, with a previous Master's degree from Animum Animation
              School in Málaga in 2021. Through my education, I received rigorous
              training in each stage of the animation production pipeline,
              developed my drawing and animation techniques, and gained experience
              with a wide range of industry-standard software. I'm passionate
              about character design and visual development, and I also truly
              enjoy animation. I'm eager to grow as an artist and be part of
              inspiring projects within the animation industry. Thanks for passing
              by!
            </p>

            {/* imagen + descargas CV */}
            <div className="flex flex-col items-center gap-4 md:gap-6 mt-6 md:mt-0">
              {/* foto: escalas por breakpoint */}
              <img
                src="/images/about/about.jpeg"
                alt="about"
                className="rounded-full w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover"
              />

              {/* etiqueta download: escalable */}
              <Image
                src="/media/icons/download-cv.png"
                width={350}
                height={350}
                alt="download CV"
                className="w-48 sm:w-64 md:w-[350px] h-auto"
              />

              {/* botones CV: ajustan tamaño y separación */}
              <div className="flex gap-4 sm:gap-6">
                <a
                  href="/cv/english.pdf"
                  download
                  className="cv-flag inline-block will-change-transform"
                  aria-label="Download CV in English"
                >
                  <Image
                    src="/media/icons/eng.png"
                    width={85}
                    height={85}
                    alt="english CV"
                    className="w-14 sm:w-16 md:w-[85px] h-auto"
                  />
                </a>

                <a
                  href="/cv/spanish.pdf"
                  download
                  className="cv-flag inline-block will-change-transform"
                  aria-label="Descargar CV en Español"
                >
                  <Image
                    src="/media/icons/sp.png"
                    width={70}
                    height={70}
                    alt="spanish CV"
                    className="w-12 sm:w-14 md:w-[70px] h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATION & INTERNSHIPS: 1 col en móvil, 2 col en md+ */}
        <section className="mt-16 md:mt-28">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-magilio text-3xl md:text-6xl text-black">
                Education & Internships
              </h2>
              <div className="mx-auto mt-3 md:mt-4 h-1 w-16 md:w-24 rounded-full bg-black/80" />
            </div>

            <div className="rounded-3xl border border-black/5 bg-gradient-to-b from-white via-[#faf9f6] to-white p-4 md:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* EDUCATION */}
                <div>
                  <h3 className="font-magilio text-xl md:text-3xl text-black mb-4 md:mb-6 tracking-wide">
                    Education
                  </h3>

                  <article className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-2.5 md:p-3">
                        <Image
                          src="/logos/utad.png"
                          alt="U-tad"
                          width={56}
                          height={56}
                          className="object-contain w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-base md:text-xl font-semibold text-black">
                            Bachelor&apos;s Degree in 2D Animation, U-tad, Madrid
                          </h4>
                          <span className="ml-auto hidden md:inline-flex shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            2021–2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm md:text-[15px] leading-relaxed text-black/80">
                          Wide range of 2D/3D tools: Photoshop, Maya, Premiere,
                          Harmony, Blender. Training in pipeline and production.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article className="group relative mb-6 md:mb-10 mt-4 md:mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-2.5 md:p-3">
                        <Image
                          src="/logos/animum.png"
                          alt="Animum"
                          width={56}
                          height={56}
                          className="object-contain w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-base md:text-xl font-semibold text-black">
                            Master’s in Digital Drawing and 2D Animation, Animum
                          </h4>
                          <span className="ml-auto hidden md:inline-flex shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            2020–2021
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm md:text-[15px] leading-relaxed text-black/80">
                          Drawing/illustration, Photoshop, Harmony, traditional 2D.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                {/* INTERNSHIPS */}
                <div>
                  <h3 className="font-magilio text-xl md:text-3xl text-black mb-4 md:mb-6 tracking-wide">
                    Internships
                  </h3>

                  <article className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-2.5 md:p-3">
                        <Image
                          src="/logos/ilion.png"
                          alt="Ilion Animation Studios"
                          width={56}
                          height={56}
                          className="object-contain w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-base md:text-xl font-semibold text-black">
                            Ilion Animation Studios. 2D Animation
                          </h4>
                          <span className="ml-auto hidden md:inline-flex shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            May 2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm md:text-[15px] leading-relaxed text-black/70">
                          Internship focused on 2D Animation.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article className="group relative mt-4 md:mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-2.5 md:p-3">
                        <Image
                          src="/logos/coloria.svg"
                          alt="Coloria ONG"
                          width={56}
                          height={56}
                          className="object-contain w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-base md:text-xl font-semibold text-black">
                            Coloria ONG. 2D Animation and Illustration
                          </h4>
                          <span className="ml-auto hidden md:inline-flex shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            Feb 2025 – Apr 2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm md:text-[15px] leading-relaxed text-black/70">
                          Projects combining 2D animation and illustration.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GsapStaggerWrapper>
    </div>
  );
}
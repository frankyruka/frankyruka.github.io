"use client";
import Image from "next/image";
import GsapStaggerWrapper from "../animations/FadeInStagger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function About() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const flags = gsap.utils.toArray(".cv-flag");

      const onEnter = (el) => {
        gsap.to(el, {
          scale: 1.15,
          y: -8,
          duration: 0.4,
          ease: "expo.out",
        });
      };

      const onLeave = (el) => {
        gsap.to(el, {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.inOut",
        });
      };

      const onDown = (el) => {
        gsap.to(el, {
          scale: 0.95,
          y: -2,
          duration: 0.2,
          ease: "sine.out",
        });
      };

      const onUp = (el) => {
        gsap.to(el, {
          scale: 1.12,
          y: -6,
          duration: 0.3,
          ease: "expo.out",
        });
      };

      flags.forEach((el) => {
        el.addEventListener("mouseenter", () => onEnter(el));
        el.addEventListener("mouseleave", () => onLeave(el));
        el.addEventListener("mousedown", () => onDown(el));
        el.addEventListener("mouseup", () => onUp(el));
        el.addEventListener("touchstart", () => onDown(el), { passive: true });
        el.addEventListener("touchend", () => onUp(el));
      });

      return () => {
        flags.forEach((el) => {
          el.removeEventListener("mouseenter", () => onEnter(el));
          el.removeEventListener("mouseleave", () => onLeave(el));
          el.removeEventListener("mousedown", () => onDown(el));
          el.removeEventListener("mouseup", () => onUp(el));
          el.removeEventListener("touchstart", () => onDown(el));
          el.removeEventListener("touchend", () => onUp(el));
        });
      };
    },
    { scope }
  );

  return (
    <div ref={scope}>
      <GsapStaggerWrapper>
        <h1 className="font-magilio text-black text-3xl md:text-[100px] text-center">
          About me
        </h1>

        <div className="flex justify-center gap-6 mt-6 mb-6">
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

        {/* bloque principal */}
        <div className="flex justify-center items-center gap-40 ">
          <p className="text-black font-thin text-lg w-1/2 leading-relaxed font-calluna">
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

          <div className="flex flex-col items-center gap-6">
            {/* foto más grande */}
            <img
              src="/images/about/about.jpeg"
              alt="about"
              className="rounded-full w-64 h-64 object-cover"
            />

            {/* download cv más grande */}
            <Image
              src="/media/icons/download-cv.png"
              width={350}
              height={350}
              alt="download CV"
            />

            <div className="flex gap-6">
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
                />
              </a>
            </div>
          </div>
        </div>

        {/* EDUCATION & INTERNSHIPS (versión con vidilla) */}
        <section className="mt-28">
          <div className="mx-auto max-w-6xl px-6">
            {/* título global */}
            <div className="text-center mb-12">
              <h2 className="font-magilio text-4xl md:text-6xl text-black">
                Education & Internships
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-black/80" />
            </div>

            {/* contenedor con fondo sutil */}
            <div className="rounded-3xl border border-black/5 bg-gradient-to-b from-white via-[#faf9f6] to-white p-6 md:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* EDUCATION */}
                <div>
                  <h3 className="font-magilio text-2xl md:text-3xl text-black mb-6 tracking-wide">
                    Education
                  </h3>

                  {/* CARD U-tad */}
                  <article className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-3">
                        <Image
                          src="/logos/utad.png"
                          alt="U-tad"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-lg md:text-xl font-semibold text-black">
                            Bachelor's Degree in 2D Animation, U-tad, Madrid
                          </h4>
                          <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            2021–2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm leading-relaxed text-black/80">
                          Wide range of 2D/3D tools: Photoshop, Maya, Premiere,
                          Toon Boom Harmony, Blender. Training in the animation
                          pipeline and production processes.
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* CARD Animum */}
                  <article className="group relative mb-10 mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 md:p-6 ">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-3">
                        <Image
                          src="/logos/animum.png"
                          alt="Animum"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-lg md:text-xl font-semibold text-black">
                            Master’s in Digital Drawing and 2D Animation, Animum
                            School of Digital Art, Málaga
                          </h4>
                          <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            2020–2021
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm leading-relaxed text-black/80">
                          Extensive knowledge in drawing and illustration, plus
                          intro to Photoshop and Toon Boom Harmony, and
                          traditional 2D animation.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                {/* INTERNSHIPS */}
                <div>
                  <h3 className="font-magilio text-2xl md:text-3xl text-black mb-6 tracking-wide">
                    Internships
                  </h3>

                  {/* CARD Ilion */}
                  <article className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 md:p-6 ">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-3">
                        <Image
                          src="/logos/ilion.png"
                          alt="Ilion Animation Studios"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-lg md:text-xl font-semibold text-black">
                            Ilion Animation Studios. 2D Animation
                          </h4>
                          <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            May 2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm leading-relaxed text-black/70">
                          Internship focused on 2D Animation.
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* CARD Coloria */}
                  <article className="group relative mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 md:p-6 ">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-white p-3">
                        <Image
                          src="/logos/coloria.svg"
                          alt="Coloria ONG"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <h4 className="text-lg md:text-xl font-semibold text-black">
                            Coloria ONG. 2D Animation and Illustration
                          </h4>
                          <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/90 px-3 py-1 text-xs font-medium text-white">
                            Feb 2025 – Apr 2025
                          </span>
                        </div>
                        <p className="font-calluna mt-2 text-sm leading-relaxed text-black/70">
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

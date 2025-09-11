'use client';
import Image from "next/image";
import GsapStaggerWrapper from "./animations/FadeInStagger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();

    // tl.from('#preloader', { y: 200, duration: 1 })
    //   .from('#home', { x: 200, duration: 1 })
  }, []);

  return (
    <GsapStaggerWrapper>
      {/* 
      <div
        className="fixed inset-0 bg-red-500 z-[9999] h-screen"
        id="preloader"
      >

      </div> */}
      <div className="flex justify-center"
        id="home">
        <div className="relative w-full h-[50vh] mt-20">
          <Image
            src={"/media/visdev/dessert-project/concept-02.jpg"}
            fill
            className="object-cover opacity-80  z-0"
            alt="background"
          />

          <div className="absolute inset-0 flex flex-col justify-center z-30 mx-auto">
            <h1 className="text-center text-black font-magilio text-5xl md:text-[100px] tracking-wider">
              FRANKYRUKA
            </h1>
            <p className="text-lg md:text-[20px] text-black text-center font-calluna">
              CHARACTER DESIGN
            </p>
            <p className="text-lg md:text-[20px] text-black text-center font-calluna">
              VISUAL DEVELOPMENT
            </p>
            <p className="text-lg md:text-[20px] text-black text-center font-calluna">
              ANIMATION
            </p>
          </div>
        </div>
      </div>
    </GsapStaggerWrapper>
  );
}

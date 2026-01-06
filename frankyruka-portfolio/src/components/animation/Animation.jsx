"use client";
import FadeInStagger from "@/components/animations/FadeInStagger";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Animation() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);

  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      // mostrar play
      gsap.to("#pause-icon", { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to("#play-icon", {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1,
      });
    } else {
      videoRef.current.play();
      // mostrar pause
      gsap.to("#play-icon", { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to("#pause-icon", {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1,
      });
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const mouse = document.getElementById("mouse");
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useGSAP(() => {}, [isPlaying]);

  return (
    <FadeInStagger>
      <div>
        <h1 className="font-magilio text-center text-black text-3xl md:text-[100px]">
          Demo Reel
        </h1>
        <div className="relative flex justify-center items center w-full md:-mt-6">
          <div
            className="w-[80%] mb-10"
            onMouseEnter={() => {
              gsap.killTweensOf(["#pause-icon", "#play-icon"]); //para matar cualquier animacion que este corriendo o pendiente sobre un elemento
              gsap.to(mouse, { scale: 8, duration: 0.3 });

              if (isPlaying) {
                gsap.to("#pause-icon", { opacity: 1, scale: 1, duration: 0.3 });
              } else {
                gsap.to("#play-icon", { opacity: 1, scale: 1, duration: 0.3 });
              }
            }}
            onMouseLeave={() => {
              gsap.to(mouse, { scale: 1, duration: 0.3 });

              gsap.to("#pause-icon", { opacity: 0, scale: 0, duration: 1 });

              gsap.to("#play-icon", { opacity: 0, scale: 0, duration: 1 });
            }}
          >
            <video
              src="/media/animation/demo-reel.mp4"
              autoPlay
              playsInline
              ref={videoRef}
              onClick={togglePlay}
              className="rounded-xl"
            />
            {/* zona de interacción grande */}
<div
  className="relative w-full h-10 mt-4"
  onMouseEnter={(e) => {
    e.stopPropagation(); // 🔴 CLAVE
    gsap.to(mouse, { scale: 1, duration: 0.2 });
  }}
  onMouseLeave={(e) => {
    e.stopPropagation(); // 🔴 CLAVE
    gsap.to(mouse, { scale: 8, duration: 0.2 });
  }}
  onClick={(e) => {
    e.stopPropagation(); // 🔴 CLAVE
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    videoRef.current.currentTime =
      percentage * videoRef.current.duration;
  }}
>
  {/* barra visual (fina) */}
  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-300 rounded-full pointer-events-none">
    <div
      className="h-full bg-black rounded-full transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>
          </div>
        </div>

        {/* <button> 

        </button> */}
      </div>
    </FadeInStagger>
  );
}

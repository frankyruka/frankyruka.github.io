'use client';
import FadeInStagger from "@/components/animations/FadeInStagger";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Animation() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);


  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      // mostrar play
      gsap.to("#pause-icon", { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to("#play-icon", { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 });
    } else {
      videoRef.current.play();
      // mostrar pause
      gsap.to("#play-icon", { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to("#pause-icon", { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 });
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const mouse = document.getElementById('mouse');
  }, []);

  useGSAP(() => {

  }, [isPlaying]);

  return (
    <FadeInStagger>
      <div>
        <h1 className="font-magilio text-center text-black text-3xl md:text-[100px]">
          Demo Reel
        </h1>
        <div
          className="relative flex justify-center items center w-full md:-mt-6"
        >
          <div className="w-[80%] mb-10"
            onMouseEnter={() => {
              gsap.killTweensOf(["#pause-icon", "#play-icon"]); //para matar cualquier animacion que este corriendo o pendiente sobre un elemento
              gsap.to(mouse, { scale: 8, duration: 0.3 });

              if (isPlaying) {
                gsap.to("#pause-icon", { opacity: 1, scale: 1, duration: 0.3 })
              } else {
                gsap.to("#play-icon", { opacity: 1, scale: 1, duration: 0.3 })
              }
            }
            }
            onMouseLeave={() => {
              gsap.to(mouse, { scale: 1, duration: 0.3 });


              gsap.to("#pause-icon", { opacity: 0, scale: 0, duration: 1 })

              gsap.to("#play-icon", { opacity: 0, scale: 0, duration: 1 })

            }}
            onClick={togglePlay}
          >
            <video
              src="/media/animation/demo-reel.mp4"
              autoPlay
              loop
              playsInline
              ref={videoRef}
              className="rounded-xl"
            />
            {/* <div
              className="absolute inset-0 bg-white opacity-0 hover:opacity-0 transition duration-400"

            /> */}
          </div>

        </div>

        {/* <button> 

        </button> */}
      </div>
    </FadeInStagger>
  );
}

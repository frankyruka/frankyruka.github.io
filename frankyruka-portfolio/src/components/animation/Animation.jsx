'use client';
import FadeInStagger from "@/components/animations/FadeInStagger";
import { useRef, useState } from "react";

export default function Animation() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () =>{
    if (!videoRef.current) return;

    if(isPlaying){
      videoRef.current.pause();
    }else{
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <FadeInStagger>
      <div>
        <h1 className="font-magilio text-center text-black text-[100px]">
          Animation
        </h1>
        <div className="relative flex justify-center items center w-full -mt-6">
          <video
            src="/media/animation/demo-reel.mp4"
            autoPlay
            loop
            playsInline
            ref={videoRef}
            className="w-[80%] rounded-xl"
          />
          <div 
            className="absolute inset-0 bg-white opacity-0 hover:opacity-40 transition duration-400"
            onClick={togglePlay}
          />
        </div>

        {/* <button> 

        </button> */}
      </div>
    </FadeInStagger>
  );
}

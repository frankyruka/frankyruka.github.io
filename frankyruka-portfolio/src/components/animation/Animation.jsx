'use client';
import FadeInStagger from "@/components/animations/FadeInStagger";

export default function Animation() {
  return (
    <FadeInStagger>
      <div>
        <h1 className="font-magilio text-center text-black text-3xl md:text-[100px]">
          Demo Reel
        </h1>
        <div className="relative flex justify-center items-center w-full mt-4 md:-mt-6">
          <div className="w-[80%] mb-10">
            <iframe
              src="https://player.vimeo.com/video/1161723028"
              className="w-full aspect-video rounded-xl"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </FadeInStagger>
  );
}

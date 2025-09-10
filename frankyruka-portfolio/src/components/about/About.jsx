import Image from "next/image";
import GsapStaggerWrapper from "../animations/FadeInStagger";

export default function About() {
  return (
    <div className="">
      <GsapStaggerWrapper>
        <h1 className="font-magilio text-black text-3xl md:text-[100px] text-center">
          About me
        </h1>

        <div className="flex justify-end gap-6 px-20">
          <Image
            src="/logos/instagram.svg"
            className="w-8 h-8"
            alt="Instagram"
            width={10}
            height={10}
          />
          <Image
            src="/logos/linkedin.svg"
            className="w-8 h-8"
            alt="Linkedin"
            width={10}
            height={10}
          />
          <Image
            src="/logos/artstation.svg"
            className="w-8 h-8"
            alt="Art Station"
            width={10}
            height={10}
          />
        </div>

        <div className="flex justify-between p-40">
          <div>
            <h2 className="text-black font-bold text-xl">Hi!</h2>
            <p className="text-black font-thin text-md">
              I'm a graduated student blablabla....
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/images/about/about.jpeg"
              alt="images"
              className="rounded-full w-sm h-sm"
            />

            <Image
              src="/media/icons/download-cv.png"
              width={300}
              height={300}
              alt="download CV"
              className="mt-6"
            />

            <div className="flex gap-4 mt-4">
              <Image
                src="/media/icons/eng.png"
                width={50}
                height={50}
                alt="english CV"
              />
              <Image
                src="/media/icons/sp.png"
                width={50}
                height={50}
                alt="spanish CV"
              />
            </div>
          </div>
        </div>
      </GsapStaggerWrapper>
    </div>
  );
}

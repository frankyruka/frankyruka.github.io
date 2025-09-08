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

        <div className="flex justify-between p-16">
          <div>
            <h2 className="text-black font-bold text-xl">Hi!</h2>
            <p className="text-black font-thin text-md">
              I'm a graduated student blablabla....
            </p>
          </div>

          <div className='flex flex-col'>
            <img
              src="/images/about/about.jpeg"
              alt="images"
              className="rounded-full w-sm h-sm"
            />

            <div className='mt-10 flex flex-col gap-2'>
              <button className="text-white rounded-lg bg-black transition-colors transition-duration-500 hover:bg-white hover:text-black border border-black">CV ENGLISH</button>
              <button className="text-white rounded-lg bg-black transition-colors transition-duration-500 hover:bg-white hover:text-black border border-black">CV SPANISH</button>
            </div>
          </div>
        </div>
      </GsapStaggerWrapper>
    </div>
  );
}

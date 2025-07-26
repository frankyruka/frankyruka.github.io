import Image from "next/image";

export default function About() {
  return (
    <div className="">
      <h1 className="font-magilio text-black text-[100px] text-center">About me</h1>

      <div className="flex justify-end gap-6 px-20">
        <Image
          src="/logos/instagram.svg"
          className="w-8 h-8 transition duration-500 hover:scale-110"
          alt="Instagram"
          width={10}
          height={10}
        />
        <Image
          src="/logos/linkedin.svg"
          className="w-8 h-8 transition duration-500 hover:scale-110"
          alt="Linkedin"
          width={10}
          height={10}
        />
        <Image
          src="/logos/artstation.svg"
          className="w-8 h-8 transition duration-500 hover:scale-110"
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
        <img
          src="/images/about/about.jpeg"
          alt="images"
          className="rounded-full w-xl h-xl"
        />
      </div>
    </div>
  );
}

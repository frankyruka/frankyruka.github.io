"use client";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function NavBar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Character Design", href: "/character-design" },
    { name: "Vis Dev", href: "/visdev" },
    { name: "Animation", href: "/animation" },
    // { name: "Ilustration", href: "/ilustration" },
    // { name: "Sketchbook", href: "/sketchbook" },
    { name: "About", href: "/about" },
  ];

  useGSAP(() => {
    gsap.from(".link", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: {
        amount: 0.3,
        // from: 'center'
      },
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-0 mb-10">
      <div className="flex justify-between w-full">
        <div className="ml-20">
          <Image
            src="/media/icons/icono-perfil-web-02.png"
            width={200}
            height={200}
            alt="alt"
            className='link'
          />
        </div>

        <div className="link mr-20 mt-10">
          <Link
            className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
            href={"/contact"}
          >
            HIRE ME!
          </Link>
        </div>
      </div>

      <div className="flex -mt-10">
        {navItems.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className="link whitespace-nowrap text-neutral-400 uppercase px-10 font-calluna"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavBar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Character Design", href: "/character-design" },
    { name: "Vis Dev", href: "/visdev" },
    { name: "Ilustration", href: "/ilustration" },
    { name: "Animation", href: "/animation" },
    { name: "Sketchbook", href: "/sketchbook" },
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
    <div className="flex flex-col justify-center items-center p-5 mt-20 mb-10">
      <div className="w-full flex justify-end -mt-10 mr-20">
        <button className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white">HIRE ME!</button>
      </div>

      <div className="flex">
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

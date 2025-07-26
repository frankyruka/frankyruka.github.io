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
    gsap.from(
      ".link",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: {
          amount: 0.3,
          // from: 'center'
        },
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-20 mb-10">
      {/* <div className="flex">
        <h1 className="text-center text-black font-harmond text-[100px]">FRANKYRUKA</h1>
      </div> */}

      <div className="flex">
        {navItems.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className="link text-neutral-400 uppercase px-10 font-calluna"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

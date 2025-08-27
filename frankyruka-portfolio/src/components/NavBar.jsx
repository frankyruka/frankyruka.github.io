"use client";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavBar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Character Design", href: "/character-design" },
    { name: "Vis Dev", href: "/visdev" },
    // { name: "Ilustration", href: "/ilustration" },
    { name: "Animation", href: "/animation" },
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
    <div className="flex flex-col justify-center items-center p-5 mt-20 mb-10">
      <div className="w-full flex justify-end -mt-10 mr-20">
        <Link
          className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
          href={"/contact"}
        >
          HIRE ME!
        </Link>
        {/* <a
    href="mailto:frankyruka@gmail.com?subject=Job%20Opportunity&body=Hello%20Fran"
    className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
  >
    HIRE ME!
  </a>

  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=frankyruka@gmail.com&su=Job%20Opportunity&body=Hello%20Fran"
    target="_blank" rel="noopener noreferrer"
    className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
  >
    Gmail
  </a>

  <a
    href="https://outlook.office.com/mail/deeplink/compose?to=frankyruka@gmail.com&subject=Job%20Opportunity&body=Hello%20Fran"
    target="_blank" rel="noopener noreferrer"
    className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
  >
    Outlook
  </a>

  <button
    onClick={() => navigator.clipboard?.writeText("frankyruka@gmail.com")}
    className="text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-3 py-2 transition-colors duration-500 hover:bg-black hover:text-white"
  >
    Copiar email
  </button> */}
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

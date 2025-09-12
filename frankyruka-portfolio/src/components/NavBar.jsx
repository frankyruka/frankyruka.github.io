"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const backdropRef = useRef(null);
  const tlRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Character Design", href: "/character-design" },
    { name: "Vis Dev", href: "/visdev" },
    { name: "Animation", href: "/animation" },
    // { name: "Ilustration", href: "/ilustration" },
    // { name: "Sketchbook", href: "/sketchbook" },
    { name: "About", href: "/about" },
  ];

  // ANIMACIÓN ORIGINAL DE TUS LINKS (desktop): respeta tu clase .link
  useGSAP(() => {
    gsap.from(".link", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: { amount: 0.3 },
      ease: "power2.inOut",
    });
  }, []);

  // TIMELINE MÓVIL: misma animación al abrir/cerrar
  useGSAP(() => {
    if (!mobileMenuRef.current || !backdropRef.current) return;

    gsap.set(mobileMenuRef.current, { xPercent: 100, autoAlpha: 0 });
    gsap.set(backdropRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onStart: () => {
        document.documentElement.style.overflow = "hidden";
      },
      onReverseComplete: () => {
        document.documentElement.style.overflow = "";
      },
    });

    tl.to(backdropRef.current, { autoAlpha: 1, duration: 0.2 }, 0)
      .to(mobileMenuRef.current, { xPercent: 0, autoAlpha: 1, duration: 0.28 }, 0)
      .from(
        mobileMenuRef.current.querySelectorAll("a, .cta"),
        { y: 14, opacity: 0, duration: 0.32, stagger: 0.06 },
        0.05
      );

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  // cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ====== DESKTOP: idéntico al tuyo ====== */}
      <div className="hidden md:flex flex-col justify-center items-center p-5 mt-0 mb-10">
        <div className="flex justify-between w-full">
          <div className="ml-20">
            <Image
              src="/media/icons/icono-perfil-web-02.png"
              width={200}
              height={200}
              alt="alt"
              className="link"
              priority
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
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="link whitespace-nowrap text-neutral-400 uppercase px-10 font-calluna"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ====== MÓVIL: barra superior + menú overlay blanco ====== */}
      {/* top bar móvil */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <Image
          src="/media/icons/icono-perfil-web-02.png"
          width={160}
          height={160}
          alt="alt"
          className="h-10 w-auto"
          priority
        />

        {/* botón hamburguesa (toggle) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-black/20 px-3 py-2"
        >
          <div className="relative h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-black transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-6 bg-black transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-6 bg-black transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* capa móvil animada */}
      <div className={`md:hidden fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
        {/* fondo blanco clicable (animado por GSAP) */}
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-white"
          onClick={() => setOpen(false)}
        />

        {/* panel pantalla completa blanco (animado por GSAP) */}
        <div
          ref={mobileMenuRef}
          className="absolute inset-0 h-full w-full bg-white p-6 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <Image
              src="/media/icons/icono-perfil-web-02.png"
              width={200}
              height={200}
              alt="Logo"
              className="h-20 w-auto"
              priority
            />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-md border border-black/20 text-black px-3 py-2"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg uppercase font-calluna text-neutral-700 hover:text-black tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="cta inline-block w-full text-center text-black border-2 border-black text-[14px] font-calluna rounded-full bg-white px-4 py-2 transition-colors duration-300 hover:bg-black hover:text-white"
            >
              HIRE ME!
            </Link>
          </div>

          <div className="mt-auto text-xs text-neutral-500">
            © {new Date().getFullYear()} — Portfolio
          </div>
        </div>
      </div>
    </>
  );
}
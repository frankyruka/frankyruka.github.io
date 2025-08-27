"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import FadeInScroll from "@/components/animations/FadeInScroll";
import { useState, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const email = "frankyruka@gmail.com";
  const [copied, setCopied] = useState(false);
  const copyBtnRef = useRef(null);
  const copiedRef = useRef(null);
  const gmailRef = useRef(null);
  const outlookRef = useRef(null);

  const hoverEnter = (el) => {
    if (!el) return;
    gsap.to(el, {
      y: -6,
      scale: 1.06,
      rotation: gsap.utils.random(-4, 4),
      duration: 0.1,
      ease: "power3.out",
    });
  };

  const hoverLeave = (el) => {
    if (!el) return;
    gsap.to(el, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(true);
    }

    // pop + ripple
    if (copyBtnRef.current) {
      const btn = copyBtnRef.current;
      gsap
        .timeline()
        .to(btn, { scale: 1.15, rotation: 5, duration: 0.15, ease: "power2.out" })
        .to(btn, { scale: 1, rotation: 0, duration: 0.45, ease: "elastic.out(1, 0.5)" }, ">-");

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.inset = "0";
      ripple.style.margin = "auto";
      ripple.style.width = "12px";
      ripple.style.height = "12px";
      ripple.style.borderRadius = "9999px";
      ripple.style.background = "rgba(0,0,0,0.08)";
      ripple.style.pointerEvents = "none";
      btn.appendChild(ripple);

      gsap.set(ripple, { scale: 0, opacity: 1 });
      gsap.to(ripple, {
        scale: 8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    }
  };

  useGSAP(
    () => {
      if (!copied) return;
      const t = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(t);
    },
    { dependencies: [copied] }
  );

  return (
    <FadeInScroll>
      <h1 className="font-magilio text-center text-black text-[90px]">
        Contact Me!
      </h1>

      <div className="mt-8 flex items-center justify-center gap-6">
        {/* Gmail (web) */}
        <a
          ref={gmailRef}
          onMouseEnter={() => hoverEnter(gmailRef.current)}
          onMouseLeave={() => hoverLeave(gmailRef.current)}
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Gmail para escribir"
          title="Gmail"
          className="group inline-flex cursor-pointer items-center justify-center p-2 transition-transform duration-200"
        >
          <Image src="/logos/gmail.svg" width={64} height={64} alt="Gmail" />
        </a>

        {/* Outlook (web) */}
        <a
          ref={outlookRef}
          onMouseEnter={() => hoverEnter(outlookRef.current)}
          onMouseLeave={() => hoverLeave(outlookRef.current)}
          href={`https://outlook.office.com/mail/deeplink/compose?to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Outlook para escribir"
          title="Outlook"
          className="group inline-flex cursor-pointer items-center justify-center p-2 transition-transform duration-200"
        >
          <Image src="/logos/outlook.svg" width={64} height={64} alt="Outlook" />
        </a>

        {/* Copiar email */}
        <button
          ref={copyBtnRef}
          onMouseEnter={() => hoverEnter(copyBtnRef.current)}
          onMouseLeave={() => hoverLeave(copyBtnRef.current)}
          onClick={handleCopy}
          type="button"
          aria-label="Copiar correo al portapapeles"
          title="Copiar correo"
          className="relative inline-flex cursor-pointer items-center justify-center p-2 transition-transform duration-200"
        >
          {!copied ? (
            <Image src="/logos/copy.svg" width={64} height={64} alt="Copiar correo" />
          ) : (
            <span className="text-sm font-calluna text-black">¡Copiado!</span>
          )}
        </button>
      </div>
    </FadeInScroll>
  );
}
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GsapStaggerWrapper({ children, className = "" }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll("*");

    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
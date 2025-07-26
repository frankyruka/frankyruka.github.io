"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CharacterDesignPage() {
  useGSAP(() => {
    gsap.from('.title', {
      y: 40,
      opacity: 0
    })
  }, []);

  return (
    <div>
      <h1 className="title font-magilio text-center text-black text-[100px] tracking-wide">
        Character Design
      </h1>
    </div>
  );
}

'use client';
import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import useMousePosition from '../utils/mousePosition';
import Home from "@/components/Home";

// AnimatePresence -> para cuando quieras hacer algo para cuando salga
//MotionConfig, es para poner a varios componentes la misma animación

export default function HomePage() {


    return (
        <div className="relative w-screen in-h-screen bg-white -z-10">
            {/* <section className="z-0 min-h-screen bg-white-500"></section> */}
            <Home />
        </div>
    );
}
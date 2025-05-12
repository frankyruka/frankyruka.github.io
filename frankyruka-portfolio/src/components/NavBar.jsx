'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Character Design', href: '/character-design' },
        { name: 'Concept Art', href: '/concept-art' },
        { name: 'Animation', href: '/animation' },
        { name: 'Sketchbook', href: '/sketchbook' },
        { name: 'About', href: '/about' },
    ]

    const logo = ['F', 'R', 'A', 'N', 'K', 'Y', 'R', 'U', 'K', 'A'];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className={'grid mt-6 z-50 '}>
            <motion.h1
                className={'text-black flex text-center justify-center items-center font-stupid text-[50px] sm:text-[100px] mb-2 '}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {logo.map((item, i) => {
                    return (
                        <motion.div
                            key={i}
                            variants={letterVariants}
                            whileHover={{ scale: 1.03, zIndex: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {item}
                        </motion.div>
                    )
                })}
            </motion.h1>

            <div
                className={'flex items-center justify-center gap-5 sm:gap-8 font-jost'}
            >
                {navItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        whileHover={{ scale: 1.1, zIndex: 1 }}
                    >
                        <motion.div
                            key={index}
                            variants={letterVariants}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link href={item.href} className={'text-black text-[10px] sm:text-[18px]'}>
                                {item.name}
                            </Link>
                        </motion.div>

                        {/* <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeInOut',
                                    }}
                                    className={'absolute bottom-0 left-0 origin-left bg-black max-h-1 w-full'}
                                    aria-hidden="true"
                                >
                                    &nbsp;
                                </motion.div>
                            )}
                        </AnimatePresence> */}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
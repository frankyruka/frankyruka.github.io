'use client';
import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import useMousePosition from '../utils/mousePosition';

// AnimatePresence -> para cuando quieras hacer algo para cuando salga
//MotionConfig, es para poner a varios componentes la misma animación

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const { x, y } = useMousePosition();
    const size = 40;
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-white">
            <motion.div
                className="fixed w-5 h-5 bg-black rounded-full pointer-events-none z-50"
                style={{
                    top: y,
                    left: x,
                    transform: "translate(-50%, -50%)",
                }}
                // animate={{
                //     x:x,
                //     y:y
                // }}
                // transition={{
                //     type: "spring",
                //     stiffness: 500,
                //     damping: 30
                // }}
            />
        </div>
    );


    // return (
    //     <div className="">
    {/*<motion.button*/ }
    {/*    whileTap={{*/ }
    {/*        scale: 0.95,*/ }
    {/*        rotate: '-2.5deg'*/ }
    {/*    }}*/ }
    {/*    whileHover={{*/ }
    {/*        scale:1.10*/ }
    {/*    }}*/ }
    {/*    transition={{*/ }
    {/*        duration: 0.2,*/ }
    {/*        ease: 'easeInOut',*/ }
    {/*    }}*/ }
    {/*    layout*/ }
    {/*    className="bg-black flex justify-center mx-auto border rounded-lg text-center h-10 w-20 items-center mb-10"*/ }
    {/*    onClick={() => setIsVisible(!isVisible)}>Click me!*/ }
    {/*</motion.button>*/ }
    {/*<AnimatePresence mode={'popLayout'}>*/ }
    {/*    {isVisible &&*/ }
    {/*        <motion.div*/ }
    {/*            initial={{*/ }
    {/*                rotate: '0deg',*/ }
    {/*                scale: 0*/ }
    {/*            }}*/ }
    {/*            animate={{*/ }
    {/*                rotate: '180deg',*/ }
    {/*                scale: 1*/ }
    {/*            }}*/ }
    {/*            exit={{*/ }
    {/*                rotate: '0deg',*/ }
    {/*                scale: 0*/ }
    {/*            }}*/ }
    {/*            transition={{*/ }
    {/*                duration: 0.7,*/ }
    {/*                ease: 'easeIn'*/ }
    {/*            }}*/ }
    {/*            className={'w-[150px] h-[150px] bg-black  mx-auto'}*/ }
    {/*        >*/ }

    {/*        </motion.div>*/ }
    {/*    }*/ }
    {/*</AnimatePresence>*/ }
    {/* </div>
    ) */}
}
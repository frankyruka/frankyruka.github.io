'use client';
import { motion } from 'framer-motion';
import useMousePosition from '@/utils/mousePosition';
import { Pause, Play } from 'lucide-react';

export default function CursorFollower() {
    const { followerPosition } = useMousePosition();


    return (
        <>
            <motion.div
                id='mouse'
                className="fixed w-5 h-5 bg-black rounded-full pointer-events-none z-50 flex justify-center items-center"
                style={{
                    top: followerPosition.y,
                    left: followerPosition.x,
                    transform: "translate(-50%, -50%)"
                }}
            >
                <span
                    id='mouse-text'
                    className='text-white flex justify-center items-center'
                >
                    <Pause id='pause-icon' className='w-2 h-2 opacity-0 absolute'/>
                    <Play id='play-icon' className='w-2 h-2 opacity-0'/>
                </span>
            </motion.div >
        </>

    );
}

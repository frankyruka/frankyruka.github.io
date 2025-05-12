'use client';
import { motion } from 'framer-motion';
import useMousePosition from '@/utils/mousePosition';

export default function CursorFollower() {
    const { followerPosition } = useMousePosition();

    return (
        <motion.div
            className="fixed w-5 h-5 bg-black rounded-full pointer-events-none z-50"
            style={{
                top: followerPosition.y,
                left: followerPosition.x,
                transform: "translate(-50%, -50%)"
            }}
        />
    );
}

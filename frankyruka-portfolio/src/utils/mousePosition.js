'use client'
import { useEffect, useState, useRef } from 'react';

export default function useMousePosition(speed = 0.2) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
    const mouseRef = useRef(mousePosition); // usamos ref para evitar re-renders

    useEffect(() => {
        const updateMousePosition = (e) => {
            const newPos = { x: e.clientX, y: e.clientY };
            setMousePosition(newPos);
            mouseRef.current = newPos; // actualizamos la ref
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            setFollowerPosition(prev => ({
                x: prev.x + (mouseRef.current.x - prev.x) * speed,
                y: prev.y + (mouseRef.current.y - prev.y) * speed
            }));
            animationFrameId = requestAnimationFrame(animate);
        };

        animate(); // empieza la animación
        return () => cancelAnimationFrame(animationFrameId); // limpieza
    }, [speed]);  // solo depende de speed, no del objeto

    return { mousePosition, followerPosition };
}

import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMouseParallax(strength = 0.05) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`;
    }
  }, [mousePosition]);

  return { ref, mousePosition };
}

export function useMouseRotation(strength = 0.02) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setRotation({
        rotateX: -y * strength * 180,
        rotateY: x * strength * 180
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return rotation;
}
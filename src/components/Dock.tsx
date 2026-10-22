import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Dock-style magnification: items swell as the pointer nears and lean toward it. */
export function DockItem({ mouseX, children }: { mouseX: MotionValue<number>; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const scale = useSpring(useTransform(dist, [-140, 0, 140], [1, 1.22, 1], { clamp: true }), { stiffness: 320, damping: 22, mass: 0.4 });
  const y = useSpring(useTransform(dist, [-140, 0, 140], [0, -3, 0], { clamp: true }), { stiffness: 320, damping: 22, mass: 0.4 });
  const pull = useSpring(useTransform(dist, [-60, 0, 60], [-4, 0, 4], { clamp: true }), { stiffness: 260, damping: 20 });
  return (
    <motion.span ref={ref} className="dock__item" style={{ scale, y, x: pull }}>
      {children}
    </motion.span>
  );
}

export function useDock() {
  const mouseX = useMotionValue(Infinity);
  const bind = {
    onMouseMove: (e: React.MouseEvent) => mouseX.set(e.clientX),
    onMouseLeave: () => mouseX.set(Infinity),
  };
  return { mouseX, bind };
}

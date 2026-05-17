import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        zIndex: 60,
        background: 'linear-gradient(90deg, #FF6B9D, #4D96FF, #6BCB77, #FF9F1C, #FF6B9D)',
        borderBottom: '2px solid #000',
      }}
    />
  );
}

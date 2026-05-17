import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-50 w-14 h-14 border-2 border-black bg-neo-pink shadow-neo font-mono font-bold text-xl flex items-center justify-center cursor-pointer"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          whileHover={{ scale: 1.12, rotate: -8, x: 2, y: 2, boxShadow: 'none' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

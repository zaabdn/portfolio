import { motion } from 'motion/react';

const dots = [
  { bg: 'bg-neo-pink', delay: 0 },
  { bg: 'bg-[#4D96FF]', delay: 0.15 },
  { bg: 'bg-neo-green', delay: 0.3 },
];

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center gap-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* Bouncing ZA letters */}
      <div className="flex gap-2">
        {['Z', 'A'].map((letter, i) => (
          <motion.span
            key={letter}
            className="font-mono font-bold text-8xl md:text-9xl text-white border-4 border-white px-4 shadow-neo-lg inline-block"
            animate={{ y: [0, -24, 0], rotate: [0, i === 0 ? -6 : 6, 0] }}
            transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="font-mono text-white/50 text-sm tracking-widest uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        Loading portfolio...
      </motion.p>

      {/* Bouncing colored squares */}
      <div className="flex gap-3">
        {dots.map((d, i) => (
          <motion.div
            key={i}
            className={`w-4 h-4 border-2 border-white ${d.bg}`}
            animate={{ y: [0, -14, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.55, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  );
}

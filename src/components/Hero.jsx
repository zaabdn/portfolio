import { motion } from 'motion/react';
import BlurText from './BlurText';
import RotatingText from './RotatingText';
import ShinyText from './ShinyText';

const floatingItems = [
  { content: '💻', x: '5%', y: '18%', delay: 0, duration: 3.5, rotate: -12 },
  { content: '🚀', x: '88%', y: '12%', delay: 0.6, duration: 4, rotate: 8 },
  { content: '⚡', x: '80%', y: '65%', delay: 1.2, duration: 3.2, rotate: -6 },
  { content: '🎨', x: '8%', y: '72%', delay: 0.4, duration: 4.5, rotate: 14 },
  { content: '📱', x: '48%', y: '88%', delay: 0.9, duration: 3.8, rotate: -10 },
  { content: '✨', x: '92%', y: '40%', delay: 1.5, duration: 2.8, rotate: 0 },
  { content: '🔥', x: '3%', y: '45%', delay: 0.7, duration: 4.2, rotate: 5 },
  { content: '🛠️', x: '62%', y: '5%', delay: 1.1, duration: 3.6, rotate: -8 },
];

const shapes = [
  { bg: 'bg-neo-pink', size: 48, x: '18%', y: '8%', delay: 0, shape: 'rounded' },
  { bg: 'bg-neo-blue', size: 32, x: '74%', y: '30%', delay: 0.5, shape: 'circle' },
  { bg: 'bg-neo-green', size: 40, x: '25%', y: '80%', delay: 1, shape: 'rounded' },
  { bg: 'bg-neo-orange', size: 24, x: '68%', y: '82%', delay: 0.3, shape: 'circle' },
  { bg: 'bg-neo-mint', size: 56, x: '85%', y: '55%', delay: 0.8, shape: 'rounded' },
  { bg: 'bg-neo-pink', size: 20, x: '38%', y: '6%', delay: 1.3, shape: 'circle' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-14"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating geometric shapes */}
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute ${s.bg} border-2 border-black shadow-neo`}
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            borderRadius: s.shape === 'circle' ? '50%' : '4px',
          }}
          animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3 + i * 0.4, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating emoji stickers */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl select-none"
          style={{ left: item.x, top: item.y, rotate: item.rotate }}
          animate={{ y: [0, -16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.content}
        </motion.div>
      ))}

      {/* Sticker tags */}
      <motion.div
        className="absolute border-2 border-black bg-neo-pink shadow-neo font-mono font-bold text-xs px-3 py-1.5"
        style={{ left: '6%', top: '32%', rotate: '-8deg' }}
        animate={{ rotate: [-8, -4, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        React Native ✦
      </motion.div>
      <motion.div
        className="absolute border-2 border-black bg-neo-green shadow-neo font-mono font-bold text-xs px-3 py-1.5"
        style={{ right: '6%', top: '28%', rotate: '6deg' }}
        animate={{ rotate: [6, 10, 6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        6+ Years ⚡
      </motion.div>
      <motion.div
        className="absolute border-2 border-black bg-neo-blue shadow-neo font-mono font-bold text-xs px-3 py-1.5 text-white"
        style={{ left: '12%', bottom: '22%', rotate: '5deg' }}
        animate={{ rotate: [5, 9, 5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        Jakarta 📍
      </motion.div>
      <motion.div
        className="absolute border-2 border-black bg-neo-orange shadow-neo font-mono font-bold text-xs px-3 py-1.5"
        style={{ right: '8%', bottom: '20%', rotate: '-5deg' }}
        animate={{ rotate: [-5, -1, -5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Let&apos;s Build! 🔨
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono font-bold text-5xl md:text-7xl lg:text-8xl text-black leading-none whitespace-nowrap mb-4"
        >
          <span className="hero-name-gradient font-mono font-bold">Zainal Abidin</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-3 font-mono font-bold text-xl md:text-2xl text-black mb-6"
        >
          <span className="text-black/40">I&apos;m a</span>
          <span className="inline-block border-b-4 border-black overflow-hidden">
            <RotatingText
              texts={['Software Engineer', 'Stock Market Enthusiast', 'Traveler', 'Volunteer']}
              mainClassName="text-black"
              rotationInterval={2200}
              staggerDuration={0.04}
              staggerFrom="first"
              splitBy="characters"
            />
          </span>
        </motion.div>

        <BlurText
          text="A software engineer who loves building things, analyzing markets, and exploring the world."
          delay={60}
          animateBy="words"
          direction="bottom"
          className="font-sans text-base md:text-lg text-black/60 justify-center max-w-xl mx-auto mb-10"
          stepDuration={0.3}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#projects" className="neo-btn bg-black text-white font-mono font-bold">
            See My Work →
          </a>
          <a href="#contact" className="neo-btn bg-neo-mint text-black font-mono font-bold">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        </div>
      </div>
    </section>
  );
}

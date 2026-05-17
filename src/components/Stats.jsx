import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience', color: 'bg-neo-pink', emoji: '🚀' },
  { value: 7,  suffix: '',  label: 'Projects Built',  color: 'bg-[#4D96FF]', emoji: '🏗️' },
  { value: 4,  suffix: '',  label: 'Companies',        color: 'bg-neo-green', emoji: '🏢' },
  { value: 10, suffix: '+', label: 'Tech Skills',      color: 'bg-neo-orange', emoji: '⚡' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-8 bg-white border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={`neo-card ${s.color} p-3 text-center overflow-hidden`}
              initial={{ scale: 0, rotate: i % 2 === 0 ? -8 : 8 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 400, damping: 14, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="text-xl mb-1">{s.emoji}</div>
              <div className="font-mono font-bold text-2xl md:text-3xl text-black leading-none mb-0.5">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono text-xs text-black/60 uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

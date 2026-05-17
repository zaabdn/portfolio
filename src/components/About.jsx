import { motion } from 'motion/react';
import BlurText from './BlurText';

const infoCards = [
  { label: 'Location', value: 'Jakarta, Indonesia', bg: 'bg-neo-green' },
  { label: 'Experience', value: '6+ Years', bg: 'bg-neo-pink' },
  { label: 'Specialization', value: 'Frontend Development', bg: 'bg-[#4D96FF]' },
  { label: 'Email', value: 'zainal609@gmail.com', bg: 'bg-neo-orange' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-neo-mint border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: -14, y: -10 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Text card slides from left with slight tilt */}
          <motion.div
            className="neo-card p-8 bg-white"
            initial={{ x: -80, opacity: 0, rotate: -3 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          >
            <BlurText
              text="Experienced programmer with 6+ years in web and mobile development."
              delay={80}
              animateBy="words"
              direction="bottom"
              className="font-sans font-bold text-xl md:text-2xl text-black mb-4 justify-start"
              stepDuration={0.3}
            />
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Specializing in frontend technologies like React Native, ReactJS, NextJS,
              NodeJS, .NET and TypeScript. Skilled in building visually appealing,
              user-friendly applications with modern frameworks.
            </p>
            <p className="font-sans text-gray-700 leading-relaxed">
              Passionate about crafting innovative web and mobile solutions. Currently
              working as a Software Engineer at PT. BIPO Service Indonesia.
            </p>
          </motion.div>

          {/* Info cards slide from right, staggered */}
          <div className="flex flex-col gap-4">
            {infoCards.map((item, i) => (
              <motion.div
                key={item.label}
                className={`neo-card ${item.bg} p-4 flex items-center justify-between`}
                initial={{ x: 80, opacity: 0, rotate: 4 }}
                whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 350, damping: 16, delay: 0.15 + i * 0.1 }}
                whileHover={{ scale: 1.03, rotate: -1 }}
              >
                <span className="font-mono font-bold text-sm text-black/60 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="font-mono font-bold text-base text-black">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

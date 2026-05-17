import { motion } from 'motion/react';

const contacts = [
  {
    label: 'Email',
    value: 'zainal609@gmail.com',
    href: 'mailto:zainal609@gmail.com',
    bg: 'bg-neo-mint',
    emoji: '✉️',
  },
  {
    label: 'GitHub',
    value: 'github.com/zaabdn',
    href: 'https://github.com/zaabdn',
    bg: 'bg-white',
    emoji: '🐙',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/zainal-abidin-08',
    href: 'https://www.linkedin.com/in/zainal-abidin-08',
    bg: 'bg-[#4D96FF]',
    emoji: '💼',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title (white version) */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: -12 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title text-white border-white" style={{ marginBottom: 0 }}>
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {contacts.map((c, i) => (
            /* Cards spin in like flipping a coin */
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={`neo-card ${c.bg} p-5 flex flex-col gap-2 no-underline`}
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.15 }}
              whileHover={{ scale: 1.04, rotate: -2, x: 2, y: 2, boxShadow: 'none' }}
            >
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 12, -12, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 + i }}
              >
                {c.emoji}
              </motion.span>
              <span className="font-mono font-bold text-xs text-black/50 uppercase tracking-widest">
                {c.label}
              </span>
              <span className="font-mono font-bold text-sm text-black break-all">{c.value}</span>
            </motion.a>
          ))}
        </div>

        {/* CTA box bounces up from below */}
        <motion.div
          className="neo-card bg-neo-mint p-8 text-center"
          initial={{ y: 80, opacity: 0, rotate: -2 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.3 }}
        >
          <p className="font-mono font-bold text-2xl md:text-3xl text-black mb-2">
            Let&apos;s build something cool together.
          </p>
          <p className="font-sans text-gray-700 mb-6">
            Open to new opportunities, freelance projects, and collaborations.
          </p>
          <motion.a
            href="mailto:zainal609@gmail.com"
            className="neo-btn bg-black text-white font-mono font-bold text-lg inline-block"
            whileHover={{ scale: 1.06, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            Say Hello 👋
          </motion.a>
        </motion.div>

        <p className="text-center font-mono text-white/30 text-sm mt-12">
          © 2026 Zainal Abidin · Built with React + Vite + Neobrutalism
        </p>
      </div>
    </section>
  );
}

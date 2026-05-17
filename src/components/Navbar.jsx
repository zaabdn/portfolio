import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { label: 'About',      href: '#about',      color: 'bg-neo-mint' },
  { label: 'Skills',     href: '#skills',     color: 'bg-[#4D96FF]' },
  { label: 'Experience', href: '#experience', color: 'bg-neo-green' },
  { label: 'Education',  href: '#education',  color: 'bg-[#FFE8F5]' },
  { label: 'Projects',   href: '#projects',   color: 'bg-neo-pink' },
  { label: 'Contact',    href: '#contact',    color: 'bg-neo-orange' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (href) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">

          {/* Logo */}
          <a href="#hero" className="font-mono font-bold text-xl tracking-tight flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-neo-pink border-2 border-black rounded-full animate-bounce_slow" />
            <span className="rainbow-text">ZA</span>
            <span className="inline-block w-3 h-3 bg-[#4D96FF] border-2 border-black rounded-full animate-bounce_slow" style={{ animationDelay: '0.3s' }} />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono font-bold text-sm px-3 py-1.5 border-2 border-transparent hover:${link.color} hover:border-black hover:shadow-neo-sm transition-all duration-150`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="mailto:zainal609@gmail.com" className="neo-btn bg-black text-white text-sm hidden md:inline-block font-mono">
              Hire Me ✦
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden w-10 h-10 border-2 border-black flex flex-col items-center justify-center gap-1.5 bg-white shadow-neo-sm"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-5 h-0.5 bg-black origin-center"
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-black"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-black origin-center"
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

            {/* Drawer */}
            <motion.div
              className="absolute top-14 left-0 right-0 bg-white border-b-2 border-black"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNav(link.href)}
                      className="w-full text-left font-mono font-bold text-lg px-6 py-4 border-b-2 border-black hover:bg-neo-mint transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
                <li className="p-4">
                  <a
                    href="mailto:zainal609@gmail.com"
                    className="neo-btn bg-black text-white font-mono font-bold w-full text-center block"
                    onClick={() => setOpen(false)}
                  >
                    Hire Me ✦
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

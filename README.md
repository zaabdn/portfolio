# 🎨 Zainal Abidin — Personal Portfolio

A personal portfolio website built with a **Neobrutalism** design style — bold borders, offset shadows, vibrant colors, and playful animations. Designed to be fun, unique, and memorable.

---

## 🖥️ Live Preview

Run locally with:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

- **Loading Screen** — Animated splash screen on first load
- **Scroll Progress Bar** — Colorful gradient bar tracking scroll position
- **Hero Section** — White background with floating emoji stickers, geometric shapes, rotating job titles, and rainbow animated name
- **Marquee Strip** — Infinite scrolling ticker between sections
- **Stats Counter** — Animated number counters (years, projects, companies, skills)
- **About Section** — Personal summary with slide-in animations
- **Skills Section** — Grouped tech badges with pop-in and hover wobble animations
- **Experience Section** — Work history cards with alternating slide animations
- **Education Section** — Academic background with bounce-in cards
- **Projects Section** — Portfolio grid with "thrown on table" fall animation
- **Contact Section** — Links with flip-in animation and CTA
- **Back to Top Button** — Floating button that appears on scroll
- **Mobile Hamburger Menu** — Animated drawer for mobile navigation
- **Scroll Animations** — Rubber stamp titles, spring physics, stagger effects throughout

---

## 🛠️ Tech Stack

### Core
| Tech | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev/) | 19 | UI framework |
| [Vite](https://vite.dev/) | 8 | Build tool & dev server |

### Styling
| Tech | Purpose |
|------|---------|
| [Tailwind CSS](https://tailwindcss.com/) v3 | Utility-first CSS, neobrutalism design tokens |
| Custom CSS | Rainbow gradient animations, marquee scroll, hero name effect |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Body & heading font |
| [Space Mono](https://fonts.google.com/specimen/Space+Mono) | Monospace font for labels & code |

### Animation
| Tech | Purpose |
|------|---------|
| [Motion (Framer Motion)](https://motion.dev/) | Scroll animations, spring physics, hover effects, AnimatePresence |
| [OGL](https://github.com/oframe/ogl) | WebGL Aurora background (Hero section) |

### Components (from open-source)
| Source | Component | Usage |
|--------|-----------|-------|
| [reactbits.dev](https://www.reactbits.dev) | `Aurora` | Animated WebGL background in Hero |
| [reactbits.dev](https://www.reactbits.dev) | `BlurText` | Blur-in text animation |
| [reactbits.dev](https://www.reactbits.dev) | `RotatingText` | Cycling job titles in Hero |
| [reactbits.dev](https://www.reactbits.dev) | `ShinyText` | Shine sweep text effect |
| [neobrutalism.dev](https://www.neobrutalism.dev) | Design system | Color palette, shadow, border conventions |

---

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Aurora.jsx              # WebGL aurora animation (reactbits)
│   │   ├── Aurora.css
│   │   ├── BlurText.jsx            # Blur-in text animation (reactbits)
│   │   ├── RotatingText.jsx        # Cycling text animation (reactbits)
│   │   ├── RotatingText.css
│   │   ├── ShinyText.jsx           # Shine sweep text (reactbits)
│   │   ├── ShinyText.css
│   │   ├── Navbar.jsx              # Fixed top nav + mobile hamburger drawer
│   │   ├── LoadingScreen.jsx       # Animated splash screen
│   │   ├── ScrollProgressBar.jsx   # Scroll-tracking gradient bar
│   │   ├── Hero.jsx                # Hero section with floating elements
│   │   ├── MarqueeStrip.jsx        # Infinite scrolling ticker
│   │   ├── MarqueeStrip.css
│   │   ├── Stats.jsx               # Animated counter cards
│   │   ├── About.jsx               # About me section
│   │   ├── Skills.jsx              # Tech skill groups
│   │   ├── Experience.jsx          # Work history timeline
│   │   ├── Education.jsx           # Academic background
│   │   ├── Projects.jsx            # Project portfolio grid
│   │   ├── Contact.jsx             # Contact links & CTA
│   │   └── BackToTop.jsx           # Floating scroll-to-top button
│   ├── App.jsx                     # Root layout & loading state
│   ├── main.jsx
│   └── index.css                   # Tailwind directives + custom animations
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project folder
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Design System

This project follows the **Neobrutalism** design language:

| Token | Value | Usage |
|-------|-------|-------|
| Border | `2px solid #000` | All cards, buttons, badges |
| Shadow | `4px 4px 0px #000` | Cards & buttons (offset, no blur) |
| Shadow hover | `none` + `translate(2px, 2px)` | Pressed/hover state |
| Font (body) | Space Grotesk | Readable sans-serif |
| Font (mono) | Space Mono | Labels, titles, code |
| Background | `#FFFBEF` | Page base (warm cream) |

### Color Palette

| Name | Hex | Used for |
|------|-----|---------|
| Pink | `#FF6B9D` | Accents, mobile skills, projects |
| Blue | `#4D96FF` | Skills, BIPO, links |
| Green | `#6BCB77` | Skills, experience |
| Orange | `#FF9F1C` | Stats, tools, Visionet |
| Mint | `#B2F5EA` | About section, contact CTA |
| Red | `#FF3B3B` | IDStar, GURUINTI |
| Purple | `#9B59FF` | Mejik, Soulchi, Onlyfunction |
| Teal | `#00BCD4` | Apps4Swam |
| Yellow | `#FFE135` | IDStar project, Web Career MTF |

---

## 📄 License

Personal portfolio — feel free to use as inspiration.

---

Built with ❤️ by **Zainal Abidin** · [zainal609@gmail.com](mailto:zainal609@gmail.com)

import './MarqueeStrip.css';

const items = [
  '★ FRONTEND DEV',
  '💻 REACT NATIVE',
  '⚡ NEXTJS',
  '🎨 TYPESCRIPT',
  '📱 MOBILE DEV',
  '🚀 JAKARTA',
  '✨ 6+ YEARS',
  '🔥 OPEN TO COLLAB',
  '🛠️ FULLSTACK',
  '💡 UI/UX LOVER',
];

export default function MarqueeStrip({ reverse = false, bg = 'bg-black', textColor = 'text-white' }) {
  const content = [...items, ...items];

  return (
    <div className={`${bg} border-y-2 border-black py-3 overflow-hidden`}>
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {content.map((item, i) => (
          <span
            key={i}
            className={`font-mono font-bold text-sm ${textColor} whitespace-nowrap px-6`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

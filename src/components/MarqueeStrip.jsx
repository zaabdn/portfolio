import './MarqueeStrip.css';

const items = [
  '💻 SOFTWARE ENGINEER',
  '📍 JAKARTA',
  '⚡ 6+ YEARS',
  '🤝 OPEN TO COLLAB',
  '📈 STOCK MARKET',
  '🔍 ANALYST',
  '💰 INVESTING',
  '🌱 VOLUNTEERING',
  '✈️ TRAVELING',
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

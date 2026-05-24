import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@zaabdn';

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function ArticleCard({ item, index }) {
  const description = stripHtml(item.description).slice(0, 120) + '...';
  const cardColors = [
    'bg-[#4D96FF]', 'bg-neo-green', 'bg-neo-pink',
    'bg-neo-orange', 'bg-[#9B59FF]', 'bg-[#00BCD4]',
  ];
  const headerColor = cardColors[index % cardColors.length];
  const textColor = ['bg-neo-green', 'bg-neo-orange'].includes(headerColor) ? 'text-black' : 'text-white';

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="neo-card flex flex-col overflow-hidden no-underline"
      initial={{ y: -100, opacity: 0, rotate: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: (index % 3) * 0.12 }}
      whileHover={{ scale: 1.03, rotate: 1, transition: { duration: 0.15 } }}
    >
      {/* Thumbnail */}
      {item.thumbnail ? (
        <div className="w-full h-40 overflow-hidden border-b-2 border-black">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`${headerColor} border-b-2 border-black h-40 flex items-center justify-center`}>
          <span className="text-5xl">✍️</span>
        </div>
      )}

      {/* Content */}
      <div className="bg-white p-4 flex-1 flex flex-col gap-3">
        {/* Tags */}
        {item.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.categories.slice(0, 3).map(cat => (
              <span key={cat} className="neo-badge bg-neo-bg text-black text-xs">{cat}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-mono font-bold text-sm text-black leading-snug line-clamp-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-black/10">
          <span className="font-mono text-xs text-black/40">{formatDate(item.pubDate)}</span>
          <span className="font-mono font-bold text-xs text-black">Read →</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Medium() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(FEED_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setArticles(data.items.slice(0, 6));
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="articles" className="py-24 bg-[#E8F8F0] border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title */}
        <div className="flex flex-wrap items-end gap-4 mb-10">
          <motion.div
            initial={{ scale: 2.8, opacity: 0, rotate: -10 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 500, damping: 14 }}
            style={{ display: 'inline-block' }}
          >
            <h2 className="section-title" style={{ marginBottom: 0 }}>Articles</h2>
          </motion.div>
          <motion.a
            href="https://medium.com/@zaabdn"
            target="_blank"
            rel="noreferrer"
            className="neo-btn bg-black text-white font-mono font-bold text-sm mb-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            View on Medium ↗
          </motion.a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex gap-3 justify-center py-20">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-4 h-4 border-2 border-black bg-neo-green"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="neo-card bg-neo-pink p-8 text-center">
            <p className="font-mono font-bold text-lg mb-2">Could not load articles 😕</p>
            <a
              href="https://medium.com/@zaabdn"
              target="_blank"
              rel="noreferrer"
              className="neo-btn bg-black text-white font-mono font-bold"
            >
              Visit Medium directly ↗
            </a>
          </div>
        )}

        {/* Articles grid */}
        {!loading && !error && articles.length === 0 && (
          <div className="neo-card bg-white p-8 text-center">
            <p className="font-mono font-bold text-lg">No articles yet — coming soon! ✍️</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item, i) => (
              <ArticleCard key={item.guid} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

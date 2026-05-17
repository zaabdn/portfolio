import { motion } from 'motion/react';

const education = [
  {
    degree: 'Bachelor Degree',
    field: 'Information System',
    school: 'University of Brawijaya',
    period: '2018 — 2021',
    gpa: 'GPA 3.4',
    color: 'bg-[#9B59FF]',
    textColor: 'text-white',
    icon: '🎓',
    badge: 'S1',
  },
  {
    degree: 'Diploma III',
    field: 'Information System',
    school: 'University of Brawijaya',
    period: '2015 — 2018',
    gpa: 'GPA 3.8',
    color: 'bg-[#4D96FF]',
    textColor: 'text-white',
    icon: '📚',
    badge: 'D3',
  },
  {
    degree: 'Bootcamp Fullstack JavaScript',
    field: 'ReactJS · NodeJS · ExpressJS',
    school: 'PT. Dumbways Teknologi Indonesia',
    period: 'Aug 2020 — Sep 2020',
    gpa: null,
    color: 'bg-neo-green',
    textColor: 'text-black',
    icon: '💻',
    badge: '🔥',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#FFE8F5] border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: 10 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>Education</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="neo-card overflow-hidden flex flex-col"
              initial={{ y: 80, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 16, delay: i * 0.13 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
            >
              {/* Header */}
              <div className={`${edu.color} border-b-2 border-black px-5 py-4 flex items-start justify-between`}>
                <div>
                  <span className={`font-mono font-bold text-xs uppercase tracking-widest ${edu.textColor} opacity-70`}>
                    {edu.badge}
                  </span>
                  <h3 className={`font-mono font-bold text-lg leading-tight ${edu.textColor} mt-0.5`}>
                    {edu.degree}
                  </h3>
                </div>
                <span className="text-3xl">{edu.icon}</span>
              </div>

              {/* Body */}
              <div className="bg-white p-5 flex-1 flex flex-col gap-3">
                <div>
                  <p className="font-mono font-bold text-sm text-black">{edu.field}</p>
                  <p className="font-sans text-sm text-gray-600 mt-0.5">{edu.school}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-black/10">
                  <span className="font-mono text-xs text-black/50">{edu.period}</span>
                  {edu.gpa && (
                    <span className="neo-badge bg-neo-bg text-black text-xs">{edu.gpa}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

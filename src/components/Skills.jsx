import { motion } from 'motion/react';

const skillGroups = [
  {
    title: 'Mobile',
    color: 'bg-neo-pink',
    skills: ['React Native', 'Redux', 'React Query', 'Flutter'],
  },
  {
    title: 'Frontend',
    color: 'bg-[#4D96FF]',
    skills: ['ReactJS', 'NextJS', 'TypeScript', 'JavaScript', 'Vite'],
  },
  {
    title: 'Backend',
    color: 'bg-neo-green',
    skills: ['Node.js', '.NET', 'GraphQL', 'REST API'],
  },
  {
    title: 'Tools',
    color: 'bg-neo-orange',
    skills: ['GIT', 'JIRA', 'Figma', 'Docker', 'TradingView'],
  },
];

const dropRotations = [-5, 4, -3, 6];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-neo-bg border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: 12 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>Skills</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => (
            /* Card drops from above with slight tilt */
            <motion.div
              key={group.title}
              className="neo-card overflow-hidden"
              initial={{ y: -120, opacity: 0, rotate: dropRotations[gi] }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 280, damping: 14, delay: gi * 0.12 }}
            >
              <div className={`${group.color} border-b-2 border-black px-4 py-3`}>
                <span className="font-mono font-bold text-sm uppercase tracking-widest">
                  {group.title}
                </span>
              </div>
              <div className="p-4 flex flex-wrap gap-2 bg-white">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="neo-badge bg-white text-black cursor-default"
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 600,
                      damping: 12,
                      delay: gi * 0.12 + si * 0.06,
                    }}
                    whileHover={{ scale: 1.12, rotate: [-2, 2, -2, 0], transition: { duration: 0.3 } }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

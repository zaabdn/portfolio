import { motion } from 'motion/react';

const skillGroups = [
  {
    title: 'Tech Stack',
    color: 'bg-[#4D96FF]',
    textColor: 'text-white',
    skills: [
      'React Native', 'Flutter', 'ReactJS', 'NextJS',
      'TypeScript', 'JavaScript', 'Vite', 'Redux', 'React Query',
      'Node.js', 'ExpressJS', '.NET', 'GraphQL',
      'REST API', 'MySQL', 'SQL Server', 'MongoDB',
    ],
  },
  {
    title: 'Tools',
    color: 'bg-neo-orange',
    textColor: 'text-black',
    skills: ['GIT', 'JIRA', 'Figma', 'Docker', 'Firebase', 'TradingView'],
  },
  {
    title: 'Soft Skills',
    color: 'bg-neo-pink',
    textColor: 'text-white',
    skills: ['Project Management', 'Teamwork', 'Problem Solving', 'Communication'],
  },
];

const dropRotations = [-4, 5, -3];

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

        <div className="flex flex-col gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 280, damping: 14, delay: gi * 0.12 }}
            >
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-black/50 mb-3 border-b-2 border-black pb-2">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="neo-badge bg-neo-bg text-black cursor-default"
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 600,
                      damping: 12,
                      delay: gi * 0.12 + si * 0.04,
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

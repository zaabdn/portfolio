import { motion } from 'motion/react';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'PT. BIPO Service Indonesia',
    location: 'Jakarta',
    period: 'Aug 2022 — Present',
    color: 'bg-[#4D96FF]',
    textColor: 'text-white',
    stack: ['React Native', 'Redux', 'React Query', 'TypeScript'],
    points: [
      'Developed mobile HRMS apps: claim, attendance, appraisal, leave & personnel modules',
      'Improved HRMS with user-friendly mobile solutions for global management',
      'Built scalable mobile apps enhancing HR processes and efficiency',
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '2021 · 2022 · 2024 · 2025',
    color: 'bg-[#FFE135]',
    textColor: 'text-black',
    stack: ['React Native', 'Flutter', 'NextJS', 'NodeJS', 'ExpressJS', 'Firebase'],
    points: [
      'Built a mobile banking application with digital payment and transaction features',
      'Built a waste bank application connecting users with waste banks for eco-friendly transactions',
      'Built an application integrating social science, virtues values, and AI technology for character development',
      'Built a school management application to streamline academic and administrative processes',
    ],
  },
  {
    role: 'Mobile Developer',
    company: 'PT. IDStar Cipta Teknologi',
    location: 'Jakarta',
    period: 'Aug 2021 — Aug 2022',
    color: 'bg-[#FF3B3B]',
    textColor: 'text-white',
    stack: ['NextJS', 'NodeJS', 'MySQL', 'Docker', 'AngularJS'],
    points: [
      'Built a web application for job vacancies, enhancing recruitment efficiency',
      'Developed an HR mobile application for MTF to streamline employee management',
      'Collaborated with cross-functional teams including Recruitment & HC Service',
    ],
  },
  {
    role: 'Fullstack Developer',
    company: 'PT. Mejik Utama Sugiharta',
    location: 'South Tangerang',
    period: 'Aug 2020 — Jul 2021',
    color: 'bg-[#9B59FF]',
    textColor: 'text-white',
    stack: ['React Native', 'Redux', 'GraphQL'],
    points: [
      'Built classroom management apps with online exams, materials sharing & video calls',
      'Developed scalable web applications for education platforms',
    ],
  },
  {
    role: 'Internship Programmer',
    company: 'PT. Visionet Data International',
    location: 'Malang',
    period: 'Aug 2017 — Mar 2018',
    color: 'bg-[#FF9F1C]',
    textColor: 'text-black',
    stack: ['Outsystems'],
    points: [
      'Assisted the team in several projects with focus on frontend mobile development',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Stamp-in title */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: -14 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>Experience</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="neo-card overflow-hidden"
              /* Alternate slide from left/right with exaggerated tilt */
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.1 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
            >
              <div className={`${exp.color} border-b-2 border-black px-6 py-4 flex flex-wrap items-center justify-between gap-2`}>
                <div>
                  <h3 className={`font-mono font-bold text-xl ${exp.textColor}`}>{exp.role}</h3>
                  <p className={`font-sans text-sm font-semibold ${exp.textColor} opacity-80`}>
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="font-mono font-bold text-sm border-2 border-black bg-white px-3 py-1 shadow-neo-sm text-black">
                  {exp.period}
                </span>
              </div>

              <div className="bg-white p-6">
                <ul className="mb-4 space-y-1">
                  {exp.points.map((pt, j) => (
                    <motion.li
                      key={j}
                      className="font-sans text-sm text-gray-700 flex gap-2"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.08 + 0.2 }}
                    >
                      <span className="text-black font-bold mt-0.5">▸</span>
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech, ti) => (
                    <motion.span
                      key={tech}
                      className="neo-badge bg-neo-bg text-black text-xs"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 500, damping: 14, delay: i * 0.1 + ti * 0.05 + 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

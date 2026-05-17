import { motion } from 'motion/react';

const projects = [
  {
    name: 'BIPO HRMS v2 & v2.5',
    company: 'PT. BIPO Service Indonesia',
    period: 'Aug 2022 — Present',
    description: 'Leading HRMS mobile app in Asia Pacific with claim, attendance, appraisal, and personnel modules for global HR management.',
    stack: ['React Native', 'Redux', 'TypeScript', 'React Query', '.NET'],
    color: 'bg-[#4D96FF]',
    textColor: 'text-white',
  },
  {
    name: 'Smartschool',
    company: 'Freelance',
    period: 'Mar 2025 — May 2025',
    description: 'A web and mobile-based school management application for streamlining academic, administrative, and communication processes.',
    stack: ['React Native', 'NextJS', 'Tailwind'],
    color: 'bg-neo-green',
    textColor: 'text-black',
  },
  {
    name: 'Soulchi',
    company: 'Freelance',
    period: 'Nov 2024 — Feb 2025',
    description: 'An application integrating social science and virtues values for character development, helping users build moral habits through guided learning.',
    stack: ['Flutter', 'Firebase'],
    color: 'bg-[#9B59FF]',
    textColor: 'text-white',
  },
  {
    name: 'Apps4Swam',
    company: 'Freelance',
    period: 'Mar — May 2022',
    description: 'Waste management app helping users manage household waste and connecting them with waste banks for transactions.',
    stack: ['React Native', 'Redux', 'REST API'],
    color: 'bg-[#00BCD4]',
    textColor: 'text-white',
  },
  {
    name: 'Web Career MTF',
    company: 'PT. IDStar Cipta Teknologi',
    period: 'Sep 2021 — May 2022',
    description: 'PT Mandiri Tunas Finance career website for posting manpower requirements to job seekers and internal parties.',
    stack: ['NextJS', 'NodeJS', 'MySQL', 'Docker'],
    color: 'bg-[#FFE135]',
    textColor: 'text-black',
  },
  {
    name: 'App Mobile Banking',
    company: 'Freelance',
    period: 'Sep — Dec 2021',
    description: 'Mobile banking application with Topup and SBN Online modules for seamless digital banking experience.',
    stack: ['React Native', 'Redux', 'REST API'],
    color: 'bg-[#4D96FF]',
    textColor: 'text-white',
  },
  {
    name: 'Onlyfunction',
    company: 'PT. Mejik Utama Sugiharta',
    period: 'Jan — May 2021',
    description: 'Serverless continuous delivery platform for functions on Kubernetes. No setup needed for Docker, Git, or databases.',
    stack: ['NextJS', 'REST API'],
    color: 'bg-[#9B59FF]',
    textColor: 'text-white',
  },
  {
    name: 'KelasQ',
    company: 'PT. Mejik Utama Sugiharta',
    period: 'Sep — Dec 2020',
    description: 'Online class platform connecting teachers and students with class management, online exams, and assignments.',
    stack: ['React Native', 'GraphQL'],
    color: 'bg-[#FF9F1C]',
    textColor: 'text-black',
  },
  {
    name: 'GURUINTI',
    company: 'PT. Mejik Utama Sugiharta',
    period: 'Nov 2020 — Jan 2021',
    description: 'School management platform handling upstream to downstream operations for educational institutions.',
    stack: ['React Native', 'GraphQL'],
    color: 'bg-[#FF3B3B]',
    textColor: 'text-white',
  },
];

const landRotations = [-4, 3, -5, 4, -2, 5, -3, 4, -3];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-neo-bg border-b-2 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ scale: 2.8, opacity: 0, rotate: 10 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          style={{ display: 'inline-block', marginBottom: '2.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="neo-card flex flex-col overflow-hidden"
              initial={{ y: -140, opacity: 0, rotate: landRotations[i] ?? -3 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 16,
                delay: (i % 3) * 0.14 + Math.floor(i / 3) * 0.18,
              }}
              whileHover={{ scale: 1.03, rotate: 1, transition: { duration: 0.15 } }}
            >
              <div className={`${project.color} border-b-2 border-black px-4 py-3`}>
                <h3 className={`font-mono font-bold text-base leading-tight ${project.textColor}`}>
                  {project.name}
                </h3>
                <p className={`font-mono text-xs mt-0.5 ${project.textColor} opacity-70`}>
                  {project.company}
                </p>
              </div>

              <div className="bg-white p-4 flex-1 flex flex-col justify-between gap-3">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">{project.description}</p>
                <div>
                  <p className="font-mono text-xs text-black/40 mb-2">{project.period}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech, ti) => (
                      <motion.span
                        key={tech}
                        className="neo-badge bg-neo-bg text-black text-xs"
                        initial={{ scale: 0, rotate: -15 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 14,
                          delay: (i % 3) * 0.14 + Math.floor(i / 3) * 0.18 + ti * 0.05 + 0.2,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

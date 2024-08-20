interface dataProjectsProps {
  id: number;
  title: string;
  description: string;
  stack: string;
}

export const dataProjects: dataProjectsProps[] = [
  {
    id: 1,
    title: "BIPO HRMS V2",
    description: "",
    stack: "React Native, Redux, .NET",
  },
  {
    id: 2,
    title: "Apps4SWAM",
    description: "Application for System Waste Management",
    stack: "React Native, Redux, NodeJS, ExpressJS",
  },
  {
    id: 3,
    title: "Web Career",
    description: "",
    stack: "NextJS, NodeJS, Fastify",
  },
  {
    id: 4,
    title: "Mobile Banking",
    description: "",
    stack: "React Native, Redux, API",
  },
  {
    id: 5,
    title: "OnlyFunction",
    description: "",
    stack: "NextJS, API",
  },
  {
    id: 6,
    title: "KelasQ",
    description: "",
    stack: "React Native, Redux, GraphQL",
  },
];

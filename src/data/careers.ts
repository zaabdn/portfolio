interface dataCareerProps {
  id: number;
  title: string;
  company: string;
  dateStart: string;
  dateEnd: string | null;
  isActive?: boolean;
}

export const dataCareer: dataCareerProps[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "PT. BIPO Service Indonesia",
    dateStart: "2022-08",
    dateEnd: null,
    isActive: true,
  },
  {
    id: 2,
    title: "Mobile Developer",
    company: "PT. IDStar Cipta Teknologi",
    dateStart: "2021-08",
    dateEnd: "2022-08",
  },
  {
    id: 3,
    title: "Fullstack Developer",
    company: "PT. Mejik Utama Sugiharta",
    dateStart: "2020-08",
    dateEnd: "2021-07",
  },
  {
    id: 4,
    title: "Internship Programmer",
    company: "PT Visionet Data International",
    dateStart: "2017-08",
    dateEnd: "2018-03",
  },
];

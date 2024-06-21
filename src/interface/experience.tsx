interface ExperienceRecord {
  id: string;
  createdTime: string;
  fields: {
    title: string;
    company: string;
    // Add more fields if needed
  };
}

export default ExperienceRecord;

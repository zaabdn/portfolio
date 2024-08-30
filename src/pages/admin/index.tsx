import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import { Header, Sidebar } from "@/components";

const AdminDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full">
      <Header isAdmin={true} />
      <Sidebar />
      <div className="ml-72 mt-24">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-1/5"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

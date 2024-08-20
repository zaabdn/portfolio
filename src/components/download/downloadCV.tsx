import { useState } from "react";
import { Button } from "../ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { CloudDownload, Eye } from "lucide-react";

const DownloadCV = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDownload = () => {
    window.open(
      "https://drive.usercontent.google.com/u/0/uc?id=1X-6S18iX2NnUWRGeKq2qhfbgNh3Zq-2_&export=download",
      "_blank"
    );
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const DialogView = () => {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Curriculum Vitae</DialogTitle>
          </DialogHeader>
          <iframe
            src="https://drive.google.com/file/d/1X-6S18iX2NnUWRGeKq2qhfbgNh3Zq-2_/preview"
            width="720"
            height="640"
            allow="autoplay"
          />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section className="w-full p-16 bg-[#fff5ff] dark:bg-sky-950">
      <Button
        onClick={handleOpen}
        className="w-40 h-12 bg-[#4b9491] dark:bg-[#fff5ff] dark:text-[#2f4858]"
      >
        <Eye className="mr-2 h-5 w-5" /> View My CV
      </Button>
      <Button
        onClick={handleDownload}
        className="w-44 h-12 ml-2 bg-[#2f4858] dark:bg-[#ffe8f7] dark:text-[#2f4858]"
      >
        <CloudDownload className="mr-2 h-5 w-5" />
        Download My CV
      </Button>

      {open && <DialogView />}
    </section>
  );
};

export default DownloadCV;

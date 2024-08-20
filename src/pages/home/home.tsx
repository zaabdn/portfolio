import {
  Banner,
  Career,
  Footer,
  Header,
  DownloadCV,
  Projects,
} from "@/components/index";

export const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Career />
      <DownloadCV />
      <Projects />
      <Footer />
    </div>
  );
};

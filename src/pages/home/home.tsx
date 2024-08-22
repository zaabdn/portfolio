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
      <DownloadCV />
      <Career />
      <Projects />
      <Footer />
    </div>
  );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/home";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

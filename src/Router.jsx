import { Route, Routes } from "react-router-dom";
import { Home, About, NotFound } from "./pages";
import { LayoutDefault } from "./layouts";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { Router };

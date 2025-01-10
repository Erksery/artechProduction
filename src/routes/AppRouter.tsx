import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Folder } from "../pages/Folder/Folder";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/folder/:id" element={<Folder />} />
    </Routes>
  );
};

import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Folder } from "../pages/Folder/Folder";
import { Sign } from "../pages/Registration/Sign";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/folder/:id" element={<Folder />} />
    </Routes>
  );
};

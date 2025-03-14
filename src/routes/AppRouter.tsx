import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Folder } from "../pages/Folder/Folder";
import { Registration } from "../pages/Registration/Registration";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/folder/:id" element={<Folder />} />
    </Routes>
  );
};

import { Routes, Route } from "react-router-dom";
import Stage1 from "../pages/Stage1";
import Stage2 from "../pages/Stage2";
import Stage3 from "../pages/Stage3";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/stage1" element={<Stage1 />} />
      <Route path="/stage2" element={<Stage2 />} />
      <Route path="/stage3" element={<Stage3 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

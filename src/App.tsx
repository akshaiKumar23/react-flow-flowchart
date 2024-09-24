import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Facebook from "./pages/Facebook";
import Instagram from "./pages/Instagram";

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/instagram" element={<Instagram />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

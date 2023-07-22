import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import PageNotFound from "./pages/PageNotFound";
import "./app.css";
import Session from "./pages/Main";
import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/Aboutpage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

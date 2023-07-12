import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import PageNotFound from "./pages/PageNotFound";
import "./app.css";
import Session from "./pages/Main";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import NewSessionPage from "./pages/new_session";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-session" element={<NewSessionPage />} />
        <Route path="/session/:id" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

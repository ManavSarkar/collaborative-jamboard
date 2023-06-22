import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import PageNotFound from "./pages/PageNotFound";
import "./app.css";
import Main from "./components/Main";
import Header from "./components/Header";
import Profile from "./pages/Profile";


function App() {

  


  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<Loginpage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Registerpage />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes> */}
      {/* <Header /> */}
      <Main />
      {/* <Whiteboard /> */}
    </BrowserRouter>
  );
}

export default App;

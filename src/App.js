import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.js";
import HomePage from "./pages/HomePage.js";
import ArtistPage from "./pages/ArtistPage.js";


function App() {
  return (
    <Router>
      {/* 여기에 네비게이션바 */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/explore" element={<HomePage />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>
    </Router>
  );
}

export default App;

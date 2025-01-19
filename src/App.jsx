import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Ideas from "./pages/Ideas";
import Work from "./pages/Work";
import Services from "./pages/Services";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/suitmedia-nathan" element={<Navigate to="/suitmedia-nathan/ideas" />} />
          <Route path="/suitmedia-nathan/work" element={<Work />} />
          <Route path="/suitmedia-nathan/about" element={<About />} />
          <Route path="/suitmedia-nathan/services" element={<Services />} />
          <Route path="/suitmedia-nathan/ideas" element={<Ideas />} />
          <Route path="/suitmedia-nathan/careers" element={<Careers />} />
          <Route path="/suitmedia-nathan/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

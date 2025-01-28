import { useState } from "react";
import { duration, ThemeProvider } from "@mui/material";
import { Element, animateScroll } from "react-scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar.jsx";
import Hero from "./Pages/Hero.jsx";
import Projects from "./Pages/Projects.jsx";
import Education from "./Pages/Education.jsx";
import Contact from "./Pages/Contact.jsx";
import ProjectView from "./Pages/ProjectView.jsx";
import NavBarGeneral from "./Components/NavBarGeneral.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";

function App() {
  const [count, setCount] = useState(0);
  animateScroll.scrollToTop({
    duration: 500,
    smooth: true,
  });

  return (
    <>
      <Router>
        <Routes>
          {/* Ruta principal (Single Page) */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Element name="Hero">
                  <Hero />
                </Element>
                <Element name="Education">
                  <Education />
                </Element>
                <Element name="Projects">
                  <Projects />
                </Element>
                <Element name="Contacts">
                  <Contact />
                </Element>
              </>
            }
          />

          {/* Ruta para la vista detallada de un proyecto */}
          <Route
            path="/projectview/:id"
            element={
              <>
                <NavBarGeneral />
                <ProjectView />
              </>
            }
          />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

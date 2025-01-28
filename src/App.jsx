import { useState } from "react";
import { duration, ThemeProvider } from "@mui/material";
import { Element, animateScroll } from "react-scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import ProjectView from "./Pages/ProjectView.jsx";
import NavBarGeneral from "./Components/NavBarGeneral.jsx";
import ErrorPage from "./Module/Home/ErrorPage.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Ruta principal (Single Page) */}
          <Route path="/" element={<Home />} />

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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

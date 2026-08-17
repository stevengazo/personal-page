import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clarity from "@microsoft/clarity";

import MainLayout from "./Module/MainLayout.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import PageLoader from "./Components/PageLoader.jsx";
import Home from "./Pages/Home.jsx";
import { credentials } from "../site.config.mjs";

// La portada viaja en el bundle inicial; el resto se carga al navegar.
const Projects = lazy(() => import("./Pages/ProjectsPage.jsx"));
const ProjectView = lazy(() => import("./Pages/ProjectView.jsx"));
const EducationPage = lazy(() => import("./Pages/EducationPage.jsx"));
const ContactPage = lazy(() => import("./Pages/ContactPage.jsx"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage.jsx"));

const CLARITY_PROJECT_ID = credentials.clarityProjectId;

function App() {
  useEffect(() => {
    // Solo en produccion: en desarrollo ensucia las sesiones grabadas.
    if (!CLARITY_PROJECT_ID || !import.meta.env.PROD) return;
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projectview/:id" element={<ProjectView />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

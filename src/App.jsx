import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clarity from "@microsoft/clarity";
import Home from "./Pages/Home.jsx";
import ProjectView from "./Pages/ProjectView.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Projects from "./Pages/ProjectsPage.jsx";
import MainLayout from "./Module/MainLayout.jsx";
import EducationPage from "./Pages/EducationPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";

function App() {
  const ProjectId = 'vzid9t6gtm'

  Clarity.init(ProjectId)
  return (
    <Router>
      <Routes>
        {/* 🔥 Layout global */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectview/:id" element={<ProjectView />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contacts" element={ <ContactPage /> } />
        </Route>

        {/* ❌ fuera del layout */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

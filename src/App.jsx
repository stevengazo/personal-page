import { useState } from "react";
import { duration, ThemeProvider } from "@mui/material";
import { Element, animateScroll } from "react-scroll";

import NavBar from "./Components/NavBar.jsx";
import Hero from "./Pages/Hero.jsx";
import Projects from "./Pages/Projects.jsx";
import Education from "./Pages/Education.jsx";
import Contact from "./Pages/Contact.jsx";

function App() {
  const [count, setCount] = useState(0);

  animateScroll.scrollToTop({
    duration: 500,
    smooth: true,
  });

  return (
    <>
      <div>
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
        <Element name="Projects">
          <Contact />
        </Element>
      </div>
    </>
  );
}

export default App;

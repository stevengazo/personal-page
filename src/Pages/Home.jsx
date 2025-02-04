import { useState } from "react";
import { Element, animateScroll } from "react-scroll";

import NavBar from "../Components/NavBar.jsx";
import Hero from "../Module/Home/Hero.jsx";
import Projects from "../Module/Home/Projects.jsx";
import Education from "../Module/Home/Education.jsx";
import Contact from "../Module/Home/Contact.jsx";

const Home = () => {
  const [count, setCount] = useState(0);
  animateScroll.scrollToTop({
    duration: 500,
    smooth: true,
  });

  return (
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
  );
};

export default Home;

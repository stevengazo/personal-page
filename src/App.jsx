import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Element } from "react-scroll";

import NavBar from "./Components/NavBar.jsx";
import Hero from "./Components/Hero.jsx";
import Projects from "./Components/Projects.jsx";
import Education from "./Components/Education.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
          <Hero />
      </div>
    </>
  );
}

export default App;

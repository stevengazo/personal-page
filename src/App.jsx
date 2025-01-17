import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home.jsx";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { PacmanLoader } from "react-spinners";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
   <Home/>

 
    </>
  );
}

export default App;

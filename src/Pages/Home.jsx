import { useEffect } from "react";
import { Element, animateScroll } from "react-scroll";
import { motion } from "framer-motion";

import Hero from "../Module/Home/Hero.jsx";

const sections = [
  { id: "hero", component: Hero },
];

// 🔥 Variantes
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 400,
      smooth: "easeInOutQuad",
    });
  }, []);

  return (
    <main className="snap-y snap-mandatory scroll-smooth">
      {sections.map(({ id, component: Component }) => (
        <Element key={id} name={id}>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="snap-start min-h-screen flex items-center justify-center "
          >
            <Component />
          </motion.section>
        </Element>
      ))}
    </main>
  );
};

export default Home;
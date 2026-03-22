import { motion } from "framer-motion";
import Education from "../Module/Education";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const EducationPage = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div variants={pageVariants} className="w-full max-w-5xl">
        <Education />
      </motion.div>
    </motion.section>
  );
};

export default EducationPage;
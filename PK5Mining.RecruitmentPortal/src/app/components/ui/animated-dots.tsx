import { motion } from "motion/react";

const AnimatedDots = () => {
  return (
    <motion.span
      className="inline-block"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      ...
    </motion.span>
  );
};

export default AnimatedDots;
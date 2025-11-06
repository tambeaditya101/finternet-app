import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className = "", glowing = false, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`
        glass rounded-2xl p-6 
        ${glowing ? "shadow-lg shadow-finternet-primary/20" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;

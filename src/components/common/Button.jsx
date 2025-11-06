import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  icon = null,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-finternet-primary to-finternet-secondary text-white hover:shadow-lg hover:shadow-finternet-primary/50",
    secondary:
      "glass border-2 border-finternet-primary/30 text-white hover:border-finternet-primary",
    outline: "border-2 border-white/20 text-white hover:bg-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;

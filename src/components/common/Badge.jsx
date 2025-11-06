import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Badge = ({ credential, verified = false, onClick, locked = false }) => {
  return (
    <motion.div
      whileHover={{ scale: locked ? 1 : 1.02 }}
      onClick={!locked ? onClick : undefined}
      className={`
    relative p-4 rounded-xl cursor-pointer transition-all duration-300 h-full flex flex-col
    ${
      verified
        ? "glass border-2 border-green-500 shadow-lg shadow-green-500/30"
        : locked
        ? "glass border-2 border-gray-600 opacity-50 cursor-not-allowed"
        : "glass border-2 border-white/20 hover:border-finternet-primary"
    }
  `}
      style={verified ? { borderColor: credential.color } : {}}
    >
      <div className="flex items-center gap-3">
        <div
          className={`text-3xl ${verified ? "animate-bounce" : ""}`}
          style={{ color: verified ? credential.color : "#94a3b8" }}
        >
          {verified ? <Check size={32} /> : credential.icon}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-white">{credential.name}</h3>
          <p className="text-sm text-gray-400">{credential.issuer}</p>
        </div>

        {verified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
          >
            <Check size={16} className="text-white" />
          </motion.div>
        )}

        {locked && <div className="text-gray-500">🔒</div>}
      </div>

      {verified && (
        <div className="mt-2 text-xs text-gray-400">
          Verified by {credential.issuer}
        </div>
      )}
    </motion.div>
  );
};

export default Badge;

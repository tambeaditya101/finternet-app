import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";

const Toast = ({ message, requiredCredentials, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 right-8 max-w-md z-50"
    >
      <div className="glass rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Lock size={20} className="text-yellow-400" />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-yellow-400 mb-1">
              Action Locked
            </h4>
            <p className="text-sm text-gray-300 mb-2">{message}</p>

            {requiredCredentials && requiredCredentials.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">
                  Required credentials:
                </p>
                <div className="flex flex-wrap gap-1">
                  {requiredCredentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;

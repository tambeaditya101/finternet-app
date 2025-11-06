import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, Download, Share2, ExternalLink } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const ActionSuccess = ({ action, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <Card className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center mb-2"
          >
            {action.result.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 mb-8"
          >
            Your agent has successfully completed this action
          </motion.p>

          {/* Result Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-6 mb-6 space-y-4"
          >
            {Object.entries(action.result).map(([key, value]) => {
              if (
                key === "title" ||
                key === "downloadLink" ||
                key === "nextSteps"
              )
                return null;

              return (
                <div
                  key={key}
                  className="flex justify-between items-center pb-3 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <span className="text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Next Steps */}
          {action.result.nextSteps && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-400 text-xl mt-0.5">ℹ️</div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">
                    Next Steps
                  </h4>
                  <p className="text-sm text-gray-300">
                    {action.result.nextSteps}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-3"
          >
            <Button
              variant="outline"
              className="flex-1"
              icon={<Share2 size={18} />}
            >
              Share
            </Button>
            {action.result.downloadLink && (
              <Button
                variant="outline"
                className="flex-1"
                icon={<Download size={18} />}
              >
                Download
              </Button>
            )}
            <Button variant="primary" onClick={onClose} className="flex-1">
              Done
            </Button>
          </motion.div>

          {/* Transaction/Reference ID */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500">
              Reference ID:{" "}
              {action.result.applicationId ||
                action.result.proofId ||
                action.result.accessToken}
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Confetti Effect Component
const ConfettiEffect = () => {
  const confettiCount = 50;
  const confetti = Array.from({ length: confettiCount });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b"][
              Math.floor(Math.random() * 4)
            ],
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default ActionSuccess;

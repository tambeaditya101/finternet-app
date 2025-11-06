import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader, CheckCircle, Sparkles } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import ActionSuccess from "./ActionSuccess";

const AgentDialogue = ({ action, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addMessage("agent", `I'll help you with: ${action.title}`);
    }, 500);
  }, []);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text, id: Date.now() }]);
  };

  const handleStartAction = async () => {
    setIsProcessing(true);
    addMessage("agent", "Let me get started...");

    // Process each step
    for (let i = 0; i < action.agentSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(i);
      addMessage("agent", action.agentSteps[i]);
    }

    // Complete
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsComplete(true);
  };

  if (isComplete) {
    return <ActionSuccess action={action} onClose={onClose} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <Card className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-finternet-primary to-finternet-secondary flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Finternet Agent</h3>
                <p className="text-sm text-gray-400">AI-Powered Assistant</p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Action Info Card */}
          <div
            className={`mb-6 p-4 rounded-xl ${action.color} ${action.borderColor} border-2`}
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{action.icon}</div>
              <div>
                <h4 className="font-semibold">{action.title}</h4>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </div>
          </div>

          {/* Messages - Fixed height with scroll */}
          <div className="mb-6 space-y-4 max-h-64 overflow-y-auto pr-2">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-finternet-primary text-white"
                        : "glass"
                    }`}
                  >
                    {message.text}
                    {index === messages.length - 1 &&
                      isProcessing &&
                      message.sender === "agent" && <TypingIndicator />}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Steps - Only show when processing */}
          {isProcessing && (
            <div className="mb-6 space-y-2 max-h-48 overflow-y-auto">
              {action.agentSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  {currentStep > index ? (
                    <CheckCircle
                      size={18}
                      className="text-green-400 flex-shrink-0"
                    />
                  ) : currentStep === index ? (
                    <Loader
                      size={18}
                      className="text-finternet-primary animate-spin flex-shrink-0"
                    />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-600 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      currentStep >= index ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Button - Always visible when not processing */}
          {!isProcessing && (
            <div className="pt-4 border-t border-white/10">
              <Button
                variant="primary"
                onClick={handleStartAction}
                className="w-full"
                icon={<Sparkles size={20} />}
              >
                Start Action
              </Button>
            </div>
          )}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="text-center text-sm text-gray-400 pt-4 border-t border-white/10">
              <Loader size={16} className="inline animate-spin mr-2" />
              Agent is working on your behalf...
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex gap-1 ml-2"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{
            y: [0, -5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.span>
  );
};

export default AgentDialogue;

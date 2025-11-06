import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Loader } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const CredentialVerificationModal = ({ credential, onClose, onVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationStep(0);

    // Simulate verification steps
    for (let i = 0; i < credential.verificationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVerificationStep(i + 1);
    }

    // Complete verification
    setTimeout(() => {
      onVerified(credential.id);
    }, 500);
  };

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
        className="max-w-md w-full"
      >
        <Card className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Verify Credential</h3>
            {!isVerifying && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Credential Info */}
          <div className="flex items-center gap-4 mb-6 p-4 glass rounded-xl">
            <div className="text-4xl" style={{ color: credential.color }}>
              {credential.icon}
            </div>
            <div>
              <h4 className="font-semibold">{credential.name}</h4>
              <p className="text-sm text-gray-400">{credential.issuer}</p>
            </div>
          </div>

          {/* Verification Steps */}
          {isVerifying ? (
            <div className="space-y-3 mb-6">
              {credential.verificationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 1 }}
                  className="flex items-center gap-3"
                >
                  {verificationStep > index ? (
                    <CheckCircle
                      size={20}
                      className="text-green-400 flex-shrink-0"
                    />
                  ) : verificationStep === index ? (
                    <Loader
                      size={20}
                      className="text-finternet-primary animate-spin flex-shrink-0"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                  )}
                  <span
                    className={
                      verificationStep >= index ? "text-white" : "text-gray-500"
                    }
                  >
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-400 text-sm">{credential.description}</p>
            </div>
          )}

          {/* Action Button */}
          {!isVerifying && (
            <Button variant="primary" onClick={handleVerify} className="w-full">
              Start Verification
            </Button>
          )}

          {isVerifying &&
            verificationStep === credential.verificationSteps.length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <CheckCircle
                  size={48}
                  className="text-green-400 mx-auto mb-2"
                />
                <p className="text-green-400 font-semibold">
                  Credential Verified!
                </p>
              </motion.div>
            )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CredentialVerificationModal;

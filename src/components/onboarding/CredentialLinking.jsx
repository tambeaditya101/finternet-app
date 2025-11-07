import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader, LogOut } from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import { CREDENTIALS } from "../../data/mockData";
import Button from "../common/Button";
import Badge from "../common/Badge";
import Card from "../common/Card";
import IdentityCard from "./IdentityCard";
import { fadeInUp, staggerContainer } from "../../utils/animations";

const CredentialLinking = () => {
  const { credentials, linkCredential, setCurrentStep, reset } =
    useFinternetStore();
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const handleLinkCredential = (credential) => {
    setSelectedCredential(credential);
  };

  const handleVerify = async () => {
    if (!selectedCredential) return;

    setIsVerifying(true);
    setVerificationStep(0);

    // Simulate verification steps
    for (let i = 0; i < selectedCredential.verificationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVerificationStep(i + 1);
    }

    // Link the credential
    linkCredential(selectedCredential.id);

    // Close modal
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStep(0);
      setSelectedCredential(null);
    }, 1000);
  };

  const handleContinue = () => {
    setCurrentStep("dashboard");
  };

  const handleStartOver = () => {
    if (
      window.confirm(
        "Start over with a new identity? This will clear all your data."
      )
    ) {
      reset();
    }
  };

  const isCredentialLinked = (credentialId) => {
    return credentials.some((c) => c.id === credentialId);
  };

  const allCredentialsLinked = CREDENTIALS.every((c) =>
    isCredentialLinked(c.id)
  );

  return (
    <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
      {/* Start Over Button - Top Right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleStartOver}
          className="px-4 py-2 text-sm rounded-lg glass border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
          title="Start over with new user"
        >
          <LogOut size={16} />
          Start Over
        </button>
      </div>

      {/* Identity Card */}
      <IdentityCard />

      {/* Main Content */}
      <Card glowing className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Link Your Credentials</h2>
          <p className="text-gray-400">
            Verify your credentials to unlock powerful Finternet actions
          </p>
        </div>

        {/* Credentials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {CREDENTIALS.map((credential) => (
            <motion.div key={credential.id} variants={fadeInUp}>
              <Badge
                credential={credential}
                verified={isCredentialLinked(credential.id)}
                onClick={() =>
                  !isCredentialLinked(credential.id) &&
                  handleLinkCredential(credential)
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Credentials Linked</span>
            <span className="text-sm font-semibold text-finternet-primary">
              {credentials.length} / {CREDENTIALS.length}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-finternet-primary to-finternet-accent"
              initial={{ width: 0 }}
              animate={{
                width: `${(credentials.length / CREDENTIALS.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {credentials.length > 0 && (
            <Button
              variant="primary"
              onClick={handleContinue}
              className="flex-1"
            >
              {allCredentialsLinked
                ? "Continue to Dashboard"
                : "Continue with Linked Credentials"}
            </Button>
          )}
          {!allCredentialsLinked && credentials.length > 0 && (
            <Button
              variant="outline"
              onClick={handleContinue}
              className="flex-1"
            >
              Skip for Now
            </Button>
          )}
        </div>

        {credentials.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-4">
            Click on a credential badge to start verification
          </div>
        )}
      </Card>

      {/* Verification Modal */}
      <AnimatePresence>
        {selectedCredential && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isVerifying && setSelectedCredential(null)}
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
                      onClick={() => setSelectedCredential(null)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* Credential Info */}
                <div className="flex items-center gap-4 mb-6 p-4 glass rounded-xl">
                  <div
                    className="text-4xl"
                    style={{ color: selectedCredential.color }}
                  >
                    {selectedCredential.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedCredential.name}</h4>
                    <p className="text-sm text-gray-400">
                      {selectedCredential.issuer}
                    </p>
                  </div>
                </div>

                {/* Verification Steps */}
                {isVerifying ? (
                  <div className="space-y-3 mb-6">
                    {selectedCredential.verificationSteps.map((step, index) => (
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
                            verificationStep >= index
                              ? "text-white"
                              : "text-gray-500"
                          }
                        >
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm">
                      {selectedCredential.description}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                {!isVerifying && (
                  <Button
                    variant="primary"
                    onClick={handleVerify}
                    className="w-full"
                  >
                    Start Verification
                  </Button>
                )}

                {isVerifying &&
                  verificationStep ===
                    selectedCredential.verificationSteps.length && (
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CredentialLinking;

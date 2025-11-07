import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, LogOut } from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import { AGENTIC_ACTIONS, CREDENTIALS } from "../../data/mockData";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import AgentDialogue from "./AgentDialogue";
import CredentialVerificationModal from "./CredentialVerificationModal";
import { fadeInUp, staggerContainer } from "../../utils/animations";

const AgenticPanel = () => {
  const { user, credentials, linkCredential, reset } = useFinternetStore();
  const [selectedAction, setSelectedAction] = useState(null);
  const [verifyingCredential, setVerifyingCredential] = useState(null);

  const isCredentialLinked = (credentialId) => {
    return credentials.some((c) => c.id === credentialId);
  };

  const canPerformAction = (action) => {
    return action.requiredCredentials.every((credId) =>
      isCredentialLinked(credId)
    );
  };

  const getRequiredCredentialNames = (requiredIds) => {
    return requiredIds.map((id) => {
      const cred = CREDENTIALS.find((c) => c.id === id);
      return cred ? cred.name : id;
    });
  };

  const handleActionClick = (action) => {
    const canPerform = canPerformAction(action);

    if (canPerform) {
      setSelectedAction(action);
    }
  };

  const handleCredentialClick = (credentialId) => {
    if (!isCredentialLinked(credentialId)) {
      const credential = CREDENTIALS.find((c) => c.id === credentialId);
      setVerifyingCredential(credential);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Start over with a new identity? This will clear all your data."
      )
    ) {
      reset();
    }
  };

  const getUnlinkedCredentials = () => {
    return CREDENTIALS.filter((cred) => !isCredentialLinked(cred.id));
  };

  const unlinkedCredentials = getUnlinkedCredentials();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div {...fadeInUp} className="mb-8">
        <Card glowing className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name}
              </h1>
              <p className="text-gray-400">{user.finternetAddress}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Credentials Count */}
              <div className="flex items-center gap-2">
                <Sparkles className="text-finternet-accent" size={24} />
                <div>
                  <div className="text-sm text-gray-400">Credentials</div>
                  <div className="text-2xl font-bold text-finternet-primary">
                    {credentials.length}/{CREDENTIALS.length}
                  </div>
                </div>
              </div>

              {/* Simple Reset Button */}
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm rounded-lg glass border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                title="Start over with new user"
              >
                <LogOut size={16} />
                New User
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Linked Credentials Summary */}
      {credentials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            Your Verified Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {credentials.map((linkedCred) => {
              const credDetail = CREDENTIALS.find(
                (c) => c.id === linkedCred.id
              );
              return credDetail ? (
                <div key={linkedCred.id} className="h-full">
                  <Badge credential={credDetail} verified={true} />
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      )}

      {/* Unlinked Credentials */}
      {unlinkedCredentials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Available Credentials</h2>
            <p className="text-sm text-gray-400">
              Click to verify and unlock more actions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unlinkedCredentials.map((credential) => (
              <div key={credential.id} className="h-full">
                <Badge
                  credential={credential}
                  verified={false}
                  onClick={() => handleCredentialClick(credential.id)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Agentic Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-semibold">Agentic Actions</h2>
          <div className="px-3 py-1 rounded-full bg-finternet-primary/20 border border-finternet-primary/30 text-finternet-primary text-xs font-semibold">
            AI-Powered
          </div>
        </div>
        <p className="text-gray-400 mb-6">
          Let our intelligent agents perform actions on your behalf using your
          verified credentials
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTIC_ACTIONS.map((action) => {
            const canPerform = canPerformAction(action);
            const requiredNames = getRequiredCredentialNames(
              action.requiredCredentials
            );

            return (
              <div key={action.id}>
                <div
                  className={`glass rounded-2xl p-6 cursor-pointer transition-all relative h-full min-h-[320px] flex flex-col ${
                    canPerform
                      ? "hover:border-finternet-primary/50 hover:shadow-lg hover:shadow-finternet-primary/20 border-2 border-transparent"
                      : "opacity-60 cursor-not-allowed border-2 border-transparent"
                  }`}
                  onClick={() => handleActionClick(action)}
                >
                  {/* Lock Icon for Locked Actions */}
                  {!canPerform && (
                    <div className="absolute top-4 right-4">
                      <Lock size={20} className="text-gray-500" />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${action.color} ${action.borderColor} border-2 flex items-center justify-center text-4xl mb-4`}
                  >
                    {action.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {action.description}
                  </p>

                  {/* Required Credentials - Push to bottom */}
                  <div className="mt-auto">
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-500 mb-2">
                        Required Credentials:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {requiredNames.map((name, idx) => {
                          const isLinked = isCredentialLinked(
                            action.requiredCredentials[idx]
                          );
                          return (
                            <div
                              key={idx}
                              className={`px-2 py-1 rounded text-xs ${
                                isLinked
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {isLinked ? "✓" : "✗"} {name}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estimated Time */}
                    <div className="mt-4 text-xs text-gray-500">
                      <span className="text-finternet-accent">⚡</span>{" "}
                      {action.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Agent Dialogue Modal */}
      <AnimatePresence>
        {selectedAction && (
          <AgentDialogue
            action={selectedAction}
            onClose={() => setSelectedAction(null)}
          />
        )}
      </AnimatePresence>

      {/* Credential Verification Modal */}
      <AnimatePresence>
        {verifyingCredential && (
          <CredentialVerificationModal
            credential={verifyingCredential}
            onClose={() => setVerifyingCredential(null)}
            onVerified={(credentialId) => {
              linkCredential(credentialId);
              setVerifyingCredential(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgenticPanel;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, LogOut, Building2 } from "lucide-react"; // Added Building2
import useFinternetStore from "../../store/finternetStore";
import { AGENTIC_ACTIONS, CREDENTIALS } from "../../data/mockData";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Toast from "../common/Toast";
import AgentDialogue from "./AgentDialogue";
import CredentialVerificationModal from "./CredentialVerificationModal";
import { fadeInUp } from "../../utils/animations";

const AgenticPanel = () => {
  const { user, credentials, linkCredential, reset, setCurrentStep } =
    useFinternetStore();
  const [selectedAction, setSelectedAction] = useState(null);
  const [verifyingCredential, setVerifyingCredential] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState(null);

  // Credential utilities
  const isCredentialLinked = (credentialId) =>
    credentials.some((c) => c.id === credentialId);

  const canPerformAction = (action) =>
    action.requiredCredentials.every((credId) => isCredentialLinked(credId));

  const getCredentialName = (credId) =>
    CREDENTIALS.find((c) => c.id === credId)?.name || credId;

  const getRequiredCredentialNames = (requiredIds) =>
    requiredIds.map(getCredentialName);

  const getMissingCredentialNames = (action) =>
    action.requiredCredentials
      .filter((credId) => !isCredentialLinked(credId))
      .map(getCredentialName);

  const getUnlinkedCredentials = () =>
    CREDENTIALS.filter((cred) => !isCredentialLinked(cred.id));

  // Event handlers
  const handleActionClick = (action) => {
    if (canPerformAction(action)) {
      setSelectedAction(action);
    } else {
      setToastData({
        message:
          "You need to verify additional credentials to access this action.",
        requiredCredentials: getMissingCredentialNames(action),
      });
      setShowToast(true);
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

  const handleVerifyComplete = (credentialId) => {
    linkCredential(credentialId);
    setVerifyingCredential(null);
  };

  const unlinkedCredentials = getUnlinkedCredentials();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader
        user={user}
        credentialCount={credentials.length}
        totalCredentials={CREDENTIALS.length}
        onReset={handleReset}
        setCurrentStep={setCurrentStep}
      />

      {/* Verified Credentials */}
      {credentials.length > 0 && (
        <CredentialSection
          title="Your Verified Credentials"
          credentials={credentials
            .map((c) => CREDENTIALS.find((cred) => cred.id === c.id))
            .filter(Boolean)}
          verified={true}
          delay={0.2}
        />
      )}

      {/* Available Credentials */}
      {unlinkedCredentials.length > 0 && (
        <CredentialSection
          title="Available Credentials"
          subtitle="Click to verify and unlock more actions"
          credentials={unlinkedCredentials}
          verified={false}
          onClick={handleCredentialClick}
          delay={0.25}
        />
      )}

      {/* Agentic Actions */}
      <AgenticActionsSection
        actions={AGENTIC_ACTIONS}
        canPerformAction={canPerformAction}
        getRequiredCredentialNames={getRequiredCredentialNames}
        isCredentialLinked={isCredentialLinked}
        onActionClick={handleActionClick}
      />

      {/* Modals */}
      <AnimatePresence>
        {selectedAction && (
          <AgentDialogue
            action={selectedAction}
            onClose={() => setSelectedAction(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {verifyingCredential && (
          <CredentialVerificationModal
            credential={verifyingCredential}
            onClose={() => setVerifyingCredential(null)}
            onVerified={handleVerifyComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && toastData && (
          <Toast
            message={toastData.message}
            requiredCredentials={toastData.requiredCredentials}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-components for better organization

const DashboardHeader = ({
  user,
  credentialCount,
  totalCredentials,
  onReset,
  setCurrentStep,
}) => {
  const { propertyPortfolio } = useFinternetStore(); // Add this to show badge

  return (
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
            {/* Portfolio Button - NEW */}
            <button
              onClick={() => setCurrentStep("portfolio")}
              className="px-4 py-2 text-sm rounded-lg glass border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 relative"
              title="View your portfolio"
            >
              <Building2 size={16} />
              Portfolio
              {/* Badge showing property count */}
              {propertyPortfolio.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {propertyPortfolio.length}
                </span>
              )}
            </button>

            {/* Property Marketplace Button */}
            <button
              onClick={() => setCurrentStep("property-marketplace")}
              className="px-4 py-2 text-sm rounded-lg glass border border-white/10 hover:border-finternet-primary/30 hover:bg-finternet-primary/10 text-gray-400 hover:text-finternet-primary transition-colors flex items-center gap-2"
              title="Browse properties"
            >
              <Building2 size={16} />
              Marketplace
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm rounded-lg glass border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
              title="Start over with new user"
            >
              <LogOut size={16} />
              New User
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="text-finternet-accent" size={24} />
              <div>
                <div className="text-sm text-gray-400">Credentials</div>
                <div className="text-2xl font-bold text-finternet-primary">
                  {credentialCount}/{totalCredentials}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const CredentialSection = ({
  title,
  subtitle,
  credentials,
  verified,
  onClick,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="mb-8"
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {credentials.map((credential) => (
        <div key={credential.id} className="h-full">
          <Badge
            credential={credential}
            verified={verified}
            onClick={onClick ? () => onClick(credential.id) : undefined}
          />
        </div>
      ))}
    </div>
  </motion.div>
);

const AgenticActionsSection = ({
  actions,
  canPerformAction,
  getRequiredCredentialNames,
  isCredentialLinked,
  onActionClick,
}) => (
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
      {actions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
          canPerform={canPerformAction(action)}
          requiredNames={getRequiredCredentialNames(action.requiredCredentials)}
          isCredentialLinked={isCredentialLinked}
          onClick={() => onActionClick(action)}
        />
      ))}
    </div>
  </motion.div>
);

const ActionCard = ({
  action,
  canPerform,
  requiredNames,
  isCredentialLinked,
  onClick,
}) => (
  <div
    className={`glass rounded-2xl p-6 transition-all relative h-full min-h-[320px] flex flex-col cursor-pointer ${
      canPerform
        ? "hover:border-finternet-primary/50 hover:shadow-lg hover:shadow-finternet-primary/20 border-2 border-transparent"
        : "opacity-60 border-2 border-transparent hover:opacity-70"
    }`}
    onClick={onClick}
  >
    {!canPerform && (
      <div className="absolute top-4 right-4">
        <Lock size={20} className="text-gray-500" />
      </div>
    )}

    <div
      className={`w-16 h-16 rounded-2xl ${action.color} ${action.borderColor} border-2 flex items-center justify-center text-4xl mb-4`}
    >
      {action.icon}
    </div>

    <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
    <p className="text-gray-400 text-sm mb-4 flex-grow">{action.description}</p>

    <div className="mt-auto">
      <div className="pt-4 border-t border-white/10">
        <div className="text-xs text-gray-500 mb-2">Required Credentials:</div>
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

      <div className="mt-4 text-xs text-gray-500">
        <span className="text-finternet-accent">⚡</span> {action.estimatedTime}
      </div>
    </div>
  </div>
);

export default AgenticPanel;

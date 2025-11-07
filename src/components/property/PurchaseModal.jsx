import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Wallet,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import Card from "../common/Card";
import Button from "../common/Button";
import PurchaseSuccess from "./PurchaseSuccess";

const PurchaseModal = ({ property, onClose, onSuccess }) => {
  const { walletBalance, purchaseProperty, getPropertyOwnership } =
    useFinternetStore();
  const [tokenAmount, setTokenAmount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const totalCost = tokenAmount * property.tokenPrice;
  const hasEnoughBalance = walletBalance >= totalCost;
  const ownershipPercentage = (
    (tokenAmount / property.totalTokens) *
    100
  ).toFixed(4);
  const estimatedMonthlyReturn =
    (tokenAmount / property.totalTokens) *
    parseFloat(property.rentalIncome.replace(/[$,]/g, ""));

  const ownership = getPropertyOwnership(property.id);
  const currentOwnership = ownership ? ownership.tokensOwned : 0;
  const newTotalOwnership = currentOwnership + tokenAmount;
  const newOwnershipPercentage = (
    (newTotalOwnership / property.totalTokens) *
    100
  ).toFixed(4);

  const handleTokenAmountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const maxTokens = Math.min(
      property.availableTokens,
      Math.floor(walletBalance / property.tokenPrice)
    );
    setTokenAmount(Math.max(1, Math.min(value, maxTokens)));
  };

  const handleSliderChange = (e) => {
    setTokenAmount(parseInt(e.target.value));
  };

  const handleMaxTokens = () => {
    const maxTokens = Math.min(
      property.availableTokens,
      Math.floor(walletBalance / property.tokenPrice)
    );
    setTokenAmount(maxTokens);
  };

  const handlePurchase = async () => {
    if (!hasEnoughBalance) return;

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = purchaseProperty(
      property.id,
      property.name,
      tokenAmount,
      property.tokenPrice
    );

    if (result.success) {
      setTransactionId(result.transactionId);
      setPurchaseComplete(true);
    }

    setIsProcessing(false);
  };

  if (purchaseComplete) {
    return (
      <PurchaseSuccess
        property={property}
        tokenAmount={tokenAmount}
        totalCost={totalCost}
        transactionId={transactionId}
        ownershipPercentage={newOwnershipPercentage}
        onClose={onClose}
      />
    );
  }

  const maxTokens = Math.min(
    property.availableTokens,
    Math.floor(walletBalance / property.tokenPrice)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <Card className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Purchase Tokens</h2>
              <p className="text-gray-400">{property.name}</p>
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

          {/* Current Ownership (if any) */}
          {ownership && (
            <div className="glass rounded-xl p-4 mb-6 border border-green-500/30">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle size={16} />
                You currently own tokens in this property
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Holdings:</span>
                <span className="font-semibold">
                  {currentOwnership.toLocaleString()} tokens (
                  {((currentOwnership / property.totalTokens) * 100).toFixed(4)}
                  %)
                </span>
              </div>
            </div>
          )}

          {/* Token Amount Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Number of Tokens</label>
              <button
                onClick={handleMaxTokens}
                className="text-xs text-finternet-primary hover:text-finternet-accent transition-colors"
              >
                Max: {maxTokens.toLocaleString()}
              </button>
            </div>

            <input
              type="number"
              value={tokenAmount}
              onChange={handleTokenAmountChange}
              min="1"
              max={maxTokens}
              className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-finternet-primary outline-none text-2xl font-bold text-center"
            />

            {/* Slider */}
            <div className="mt-4">
              <input
                type="range"
                min="1"
                max={maxTokens}
                value={tokenAmount}
                onChange={handleSliderChange}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-finternet-primary
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-4 
                  [&::-moz-range-thumb]:h-4 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-finternet-primary
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="glass rounded-xl p-6 mb-6 space-y-4">
            <h3 className="font-semibold mb-4">Purchase Summary</h3>

            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-gray-400">Token Price</span>
              <span className="font-semibold">${property.tokenPrice}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-gray-400">Number of Tokens</span>
              <span className="font-semibold">
                {tokenAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-gray-400">Ownership</span>
              <span className="font-semibold text-finternet-accent">
                {ownershipPercentage}%
              </span>
            </div>

            {ownership && (
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">New Total Ownership</span>
                <span className="font-semibold text-green-400">
                  {newOwnershipPercentage}%
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-gray-400 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-400" />
                Est. Monthly Return
              </span>
              <span className="font-semibold text-green-400">
                ${estimatedMonthlyReturn.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-lg pt-2">
              <span className="font-semibold">Total Cost</span>
              <span className="font-bold text-2xl text-finternet-primary">
                ${totalCost.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Wallet Balance */}
          <div
            className={`glass rounded-xl p-4 mb-6 border ${
              hasEnoughBalance ? "border-green-500/30" : "border-red-500/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet
                  size={20}
                  className={
                    hasEnoughBalance ? "text-green-400" : "text-red-400"
                  }
                />
                <span className="text-sm text-gray-400">Wallet Balance</span>
              </div>
              <span
                className={`font-bold text-lg ${
                  hasEnoughBalance ? "text-green-400" : "text-red-400"
                }`}
              >
                ${walletBalance.toLocaleString()}
              </span>
            </div>
            {!hasEnoughBalance && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                <AlertCircle size={16} />
                Insufficient balance. You need $
                {(totalCost - walletBalance).toLocaleString()} more.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isProcessing ? (
              <>
                <Button
                  variant="primary"
                  onClick={handlePurchase}
                  disabled={!hasEnoughBalance || tokenAmount === 0}
                  className="flex-1"
                >
                  Confirm Purchase
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-3 py-3">
                <div className="w-5 h-5 border-2 border-finternet-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400">Processing transaction...</span>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PurchaseModal;

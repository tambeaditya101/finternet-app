import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  TrendingUp,
  Home,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import Card from "../common/Card";
import Button from "../common/Button";
import PurchaseModal from "./PurchaseModal";

const PropertyDetails = ({ property, onClose }) => {
  const { walletBalance, getPropertyOwnership } = useFinternetStore();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const ownership = getPropertyOwnership(property.id);
  const ownershipPercentage = ownership
    ? ((ownership.tokensOwned / property.totalTokens) * 100).toFixed(4)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full my-8"
      >
        <Card className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs text-finternet-accent mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-finternet-accent"></div>
                {property.type}
              </div>
              <h2 className="text-3xl font-bold mb-2">{property.name}</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                {property.location}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Property Image */}
          <div className="relative h-64 bg-gradient-to-br from-finternet-primary/20 to-finternet-secondary/20 rounded-2xl flex items-center justify-center mb-6">
            <div className="text-9xl">{property.image}</div>

            {ownership && (
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold">
                ✓ You own {ownershipPercentage}%
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{property.description}</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <DollarSign size={16} />
                Total Value
              </div>
              <div className="text-xl font-bold text-finternet-primary">
                ${(property.totalValue / 1000000).toFixed(2)}M
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <TrendingUp size={16} />
                Expected Return
              </div>
              <div className="text-xl font-bold text-green-400">
                {property.expectedReturn}
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Home size={16} />
                Occupancy
              </div>
              <div className="text-xl font-bold">{property.occupancy}</div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Calendar size={16} />
                Monthly Income
              </div>
              <div className="text-xl font-bold text-finternet-accent">
                {property.rentalIncome}
              </div>
            </div>
          </div>

          {/* Token Information */}
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Token Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Token Price</div>
                <div className="text-2xl font-bold text-finternet-primary">
                  ${property.tokenPrice}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">
                  Available Tokens
                </div>
                <div className="text-2xl font-bold">
                  {property.availableTokens.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Total Tokens</div>
                <div className="text-2xl font-bold text-gray-300">
                  {property.totalTokens.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Tokens Sold</span>
                <span>
                  {(
                    ((property.totalTokens - property.availableTokens) /
                      property.totalTokens) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-finternet-primary to-finternet-accent"
                  style={{
                    width: `${
                      ((property.totalTokens - property.availableTokens) /
                        property.totalTokens) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Property Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {property.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 glass rounded-lg px-3 py-2 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-finternet-accent"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => setShowPurchaseModal(true)}
              className="flex-1"
              disabled={property.availableTokens === 0}
            >
              {property.availableTokens === 0 ? "Sold Out" : "Purchase Tokens"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>

          {/* Wallet Balance Info */}
          <div className="mt-4 text-center text-sm text-gray-400">
            Your wallet balance:{" "}
            <span className="text-finternet-primary font-semibold">
              ${walletBalance.toLocaleString()}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <PurchaseModal
            property={property}
            onClose={() => setShowPurchaseModal(false)}
            onSuccess={() => {
              setShowPurchaseModal(false);
              // Optionally refresh or show success
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyDetails;

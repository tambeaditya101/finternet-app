import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Wallet, TrendingUp, ArrowLeft, Home } from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import { PROPERTIES } from "../../data/propertyData";
import Card from "../common/Card";
import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import { fadeInUp } from "../../utils/animations";

const PropertyMarketplace = () => {
  const {
    user,
    walletBalance,
    setCurrentStep,
    propertyPortfolio,
    getPropertyOwnership,
  } = useFinternetStore();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleBackToDashboard = () => {
    setCurrentStep("dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <Card glowing className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">Back to Dashboard</span>
              </button>
              <h1 className="text-3xl font-bold mb-2">Property Marketplace</h1>
              <p className="text-gray-400">
                Invest in tokenized real estate from around the world
              </p>
            </div>

            <div className="flex items-center gap-6">
              {/* Wallet Balance */}
              <div className="glass rounded-xl px-6 py-4 border border-finternet-primary/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-finternet-primary/20">
                    <Wallet size={24} className="text-finternet-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Wallet Balance</div>
                    <div className="text-2xl font-bold text-finternet-primary">
                      ${walletBalance.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Marketplace Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Building2 size={24} className="text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Properties</div>
              <div className="text-2xl font-bold">{PROPERTIES.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/20">
              <TrendingUp size={24} className="text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Avg. Return</div>
              <div className="text-2xl font-bold text-green-400">8.2% APY</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Wallet size={24} className="text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Market Value</div>
              <div className="text-2xl font-bold">
                $
                {(
                  PROPERTIES.reduce((sum, p) => sum + p.totalValue, 0) / 1000000
                ).toFixed(1)}
                M
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* My Properties Quick View - NEW SECTION */}
      {propertyPortfolio.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Home size={20} />
              My Properties ({propertyPortfolio.length})
            </h2>
            <button
              onClick={() => setCurrentStep("portfolio")}
              className="text-sm text-finternet-primary hover:text-finternet-accent transition-colors"
            >
              View Full Portfolio →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {propertyPortfolio.slice(0, 3).map((holding) => {
              const property = PROPERTIES.find(
                (p) => p.id === holding.propertyId
              );
              if (!property) return null;

              const ownershipPercentage = (
                (holding.tokensOwned / property.totalTokens) *
                100
              ).toFixed(2);

              return (
                <Card
                  key={holding.propertyId}
                  className="p-4 border-2 border-green-500/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{property.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{property.name}</h4>
                      <p className="text-xs text-gray-400">
                        {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Your Share:</span>
                    <span className="text-green-400 font-semibold">
                      {ownershipPercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-400">Invested:</span>
                    <span className="font-semibold">
                      ${holding.totalInvested.toLocaleString()}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Property Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Available Properties</h2>
          <div className="text-sm text-gray-400">
            {PROPERTIES.length} properties available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <PropertyCard
                property={property}
                onViewDetails={() => setSelectedProperty(property)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Property Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyMarketplace;

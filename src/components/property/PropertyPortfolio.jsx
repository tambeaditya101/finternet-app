import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Wallet,
  Building2,
  Calendar,
} from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import { PROPERTIES } from "../../data/propertyData";
import Card from "../common/Card";
import Button from "../common/Button";
import { fadeInUp } from "../../utils/animations";

const PropertyPortfolio = () => {
  const {
    user,
    propertyPortfolio,
    transactions,
    walletBalance,
    setCurrentStep,
    getPortfolioStats,
  } = useFinternetStore();

  const stats = getPortfolioStats();

  const getPropertyDetails = (propertyId) => {
    return PROPERTIES.find((p) => p.id === propertyId);
  };

  const handleBackToMarketplace = () => {
    setCurrentStep("property-marketplace");
  };

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
              <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
              <p className="text-gray-400">
                Track your tokenized property investments
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToMarketplace}
                icon={<Building2 size={18} />}
              >
                Browse More
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Portfolio Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-finternet-primary/20">
              <Wallet size={24} className="text-finternet-primary" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Invested</div>
              <div className="text-2xl font-bold text-finternet-primary">
                ${stats.totalInvested.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/20">
              <Building2 size={24} className="text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Properties Owned</div>
              <div className="text-2xl font-bold">{stats.portfolioCount}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <TrendingUp size={24} className="text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Tokens</div>
              <div className="text-2xl font-bold">
                {stats.totalTokensOwned.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Wallet size={24} className="text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Available Balance</div>
              <div className="text-2xl font-bold text-blue-400">
                ${walletBalance.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Properties */}
      {propertyPortfolio.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
            <p className="text-gray-400 mb-6">
              Start building your real estate portfolio by purchasing tokenized
              properties
            </p>
            <Button
              variant="primary"
              onClick={handleBackToMarketplace}
              icon={<Building2 size={18} />}
            >
              Browse Properties
            </Button>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Owned Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Your Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyPortfolio.map((holding, index) => {
                const property = getPropertyDetails(holding.propertyId);
                if (!property) return null;

                const ownershipPercentage = (
                  (holding.tokensOwned / property.totalTokens) *
                  100
                ).toFixed(4);
                const estimatedMonthlyReturn =
                  (holding.tokensOwned / property.totalTokens) *
                  parseFloat(property.rentalIncome.replace(/[$,]/g, ""));

                return (
                  <motion.div
                    key={holding.propertyId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative h-40 bg-gradient-to-br from-finternet-primary/20 to-finternet-secondary/20 flex items-center justify-center">
                        <div className="text-6xl">{property.image}</div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-1">
                          {property.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {property.location}
                        </p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Tokens Owned</span>
                            <span className="font-semibold">
                              {holding.tokensOwned.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Ownership</span>
                            <span className="font-semibold text-finternet-accent">
                              {ownershipPercentage}%
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              Total Invested
                            </span>
                            <span className="font-semibold text-finternet-primary">
                              ${holding.totalInvested.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm pt-3 border-t border-white/10">
                            <span className="text-gray-400 flex items-center gap-1">
                              <TrendingUp
                                size={14}
                                className="text-green-400"
                              />
                              Est. Monthly
                            </span>
                            <span className="font-semibold text-green-400">
                              ${estimatedMonthlyReturn.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                Recent Transactions
              </h2>
              <Card className="p-6">
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-green-500/20">
                          <Building2 size={20} className="text-green-400" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {transaction.propertyName}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg text-finternet-primary">
                          ${transaction.totalCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          {transaction.tokensAmount.toLocaleString()} tokens
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPortfolio;

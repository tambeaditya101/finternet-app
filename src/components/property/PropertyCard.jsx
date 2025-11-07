import React from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, DollarSign } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const PropertyCard = ({ property, onViewDetails }) => {
  const availabilityPercentage =
    (property.availableTokens / property.totalTokens) * 100;
  const soldPercentage = 100 - availabilityPercentage;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Property Image */}
      <div className="relative h-48 bg-gradient-to-br from-finternet-primary/20 to-finternet-secondary/20 flex items-center justify-center">
        <div className="text-7xl">{property.image}</div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass border border-white/20 text-xs font-semibold">
          {availabilityPercentage.toFixed(0)}% Available
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Type Badge */}
        <div className="inline-flex items-center gap-2 text-xs text-finternet-accent mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-finternet-accent"></div>
          {property.type}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{property.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <MapPin size={14} />
          {property.location}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="glass rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Total Value</div>
            <div className="font-semibold text-finternet-primary">
              ${(property.totalValue / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Token Price</div>
            <div className="font-semibold text-finternet-accent">
              ${property.tokenPrice}
            </div>
          </div>
        </div>

        {/* Expected Return */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-gray-400">Expected Return</span>
          </div>
          <span className="font-semibold text-green-400">
            {property.expectedReturn}
          </span>
        </div>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Tokens Sold</span>
            <span>
              {property.totalTokens - property.availableTokens} /{" "}
              {property.totalTokens}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${soldPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-finternet-primary to-finternet-accent"
            />
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="primary"
          onClick={onViewDetails}
          className="w-full mt-auto"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default PropertyCard;

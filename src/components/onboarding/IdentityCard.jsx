import React from "react";
import { motion } from "framer-motion";
import { User, Copy, Check } from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import Card from "../common/Card";
import { cardFlip } from "../../utils/animations";

const IdentityCard = () => {
  const user = useFinternetStore((state) => state.user);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.finternetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div {...cardFlip} className="max-w-md mx-auto mb-8">
      <div className="relative">
        {/* Holographic glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-finternet-primary via-finternet-secondary to-finternet-accent opacity-20 blur-xl rounded-3xl"></div>

        <Card className="relative overflow-hidden border-2 border-finternet-primary/30">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-finternet-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-finternet-secondary rounded-full blur-3xl"></div>
          </div>

          {/* Card content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Finternet Identity
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-finternet-primary to-finternet-secondary flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>

            {/* Name */}
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {user.name}
            </h2>

            {/* Finternet Address */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-1">
                Finternet Address
              </div>
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                <span className="text-finternet-primary font-mono text-sm flex-1">
                  {user.finternetAddress}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* ID Number */}
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-1">Identity ID</div>
              <div className="font-mono text-sm text-gray-300">{user.id}</div>
            </div>

            {/* QR Code placeholder */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <div className="text-2xl">📱</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Status</div>
                <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
        </Card>
      </div>
    </motion.div>
  );
};

export default IdentityCard;

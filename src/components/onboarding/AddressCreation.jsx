import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import useFinternetStore from "../../store/finternetStore";
import Button from "../common/Button";
import Card from "../common/Card";
import { fadeInUp } from "../../utils/animations";

const AddressCreation = () => {
  const [name, setName] = useState("");
  const createIdentity = useFinternetStore((state) => state.createIdentity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      createIdentity(name.trim());
    }
  };

  return (
    <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
      <Card glowing className="p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-finternet-primary to-finternet-secondary flex items-center justify-center">
            <User size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Create Your Finternet Identity
          </h2>
          <p className="text-gray-400">
            Welcome to the future of finance. Let's start by creating your
            unique Finternet address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl glass border-2 border-white/10 focus:border-finternet-primary outline-none transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          {name && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="glass p-4 rounded-xl border-2 border-finternet-primary/30"
            >
              <p className="text-sm text-gray-400 mb-1">
                Your Finternet Address:
              </p>
              <p className="text-xl font-semibold text-finternet-primary">
                {name.toLowerCase().replace(/\s+/g, "")}@finternet
              </p>
            </motion.div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={!name.trim()}
            className="w-full text-lg"
            icon={<ArrowRight size={20} />}
          >
            Create Identity
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-start gap-3 text-sm text-gray-400">
            <div className="text-finternet-accent text-xl">🔐</div>
            <p>
              Your Finternet identity is secured by decentralized protocols.
              Your data remains private and under your control.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AddressCreation;

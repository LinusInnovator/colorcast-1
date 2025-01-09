import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Cloud size={48} className="text-blue-500" />
      </motion.div>
      <p className="text-lg text-gray-600 animate-pulse">Loading weather data...</p>
    </div>
  );
};
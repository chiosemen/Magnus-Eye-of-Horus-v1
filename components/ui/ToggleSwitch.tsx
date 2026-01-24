import React from 'react';
import { cn } from '../../lib/utils.ts';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onToggle, disabled }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#131B2E]/50 rounded-xl border border-white/5">
      <div className="flex flex-col">
        <span className={cn("text-sm font-bold tracking-tight text-white/90", disabled && "opacity-50")}>{label}</span>
      </div>
      <button
        type="button"
        disabled={disabled}
        className="relative h-6 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 transition-colors"
        onClick={() => onToggle(!enabled)}
      >
        <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ backgroundColor: enabled ? "#D4AF37" : "#1F2937" }}
            transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{ x: enabled ? 24 : 2 }}
          transition={{ duration: 0.2 }}
          className="relative block h-5 w-5 rounded-full bg-background shadow-lg"
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
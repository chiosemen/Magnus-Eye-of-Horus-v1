
import React from 'react';
import { cn } from '../../lib/utils.ts';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onToggle, disabled }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <span className={cn("text-sm font-medium text-foreground", disabled && "opacity-50")}>{label}</span>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
          enabled ? 'bg-accent' : 'bg-input'
        )}
        onClick={() => onToggle(!enabled)}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

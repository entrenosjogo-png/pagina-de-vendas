import React from 'react';

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({ children, onClick, fullWidth = false }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        ${fullWidth ? 'w-full' : 'w-auto'}
        bg-gradient-to-b from-sacred-goldLight to-sacred-gold
        text-sacred-wine font-serif font-black tracking-wider uppercase
        py-5 px-8 rounded-sm shadow-[0_0_25px_rgba(201,161,70,0.4)]
        hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(201,161,70,0.6)]
        transition-all duration-300 border-2 border-sacred-cream/20
        text-lg md:text-xl flex flex-col items-center justify-center gap-2
      `}
    >
      {children}
    </button>
  );
};

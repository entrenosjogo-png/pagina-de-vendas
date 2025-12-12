import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  tornTop?: boolean;
  tornBottom?: boolean;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  tornTop = false, 
  tornBottom = false,
  id
}) => {
  const baseClasses = "relative px-4 py-16 md:py-24 overflow-hidden";
  const tornTopClass = tornTop ? "torn-paper-top pt-24" : "";
  const tornBottomClass = tornBottom ? "torn-paper-bottom pb-24" : "";

  return (
    <section id={id} className={`${baseClasses} ${tornTopClass} ${tornBottomClass} ${className}`}>
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-parchment mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-vignette pointer-events-none"></div>
      
      <div className="relative max-w-4xl mx-auto z-10">
        {children}
      </div>
    </section>
  );
};

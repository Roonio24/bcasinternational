import React from "react";

interface BCASLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function BCASLogo({ className = "", size = "md", variant = "light" }: BCASLogoProps) {
  const isDark = variant === "dark";

  // Map size prop to optimized rectangular dimensions and zoom scales to cut the massive white margin from the uploaded logo image
  const dimensions = {
    sm: {
      container: "h-20 w-[264px]",
      scale: "2.5",
      padding: "p-0.5",
    },
    md: {
      container: "h-14 w-[190px]",
      scale: "2.5",
      padding: "p-1",
    },
    lg: {
      container: "h-24 w-[320px]",
      scale: "2.5",
      padding: "p-1.5",
    }
  };

  const current = dimensions[size];

  return (
    <div 
      className={`flex items-center justify-center select-none transition-all duration-300 ${className}`}
      id={`bcas-logo-container-${size}`}
    >
      {/* 
        The uploaded logo.png contains massive whitespace margins around the actual mark.
        To display the logo at an elite size without wasting header/footer space or causing alignment clipping,
        we place the image in a defined overflow-hidden container and apply a centered hover-friendly scale.
      */}
      <div 
        className={`relative flex items-center justify-center rounded-xl overflow-hidden transition-all ${
          isDark 
            ? "bg-white shadow-sm border border-slate-200/50" 
            : "mix-blend-multiply"
        } ${current.container} ${current.padding}`}
      >
        <img
          src="/logo.png"
          alt="BCAS International University Placements"
          className="w-full h-full object-contain transition-transform duration-500"
          style={{ transform: `scale(${current.scale})` }}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}



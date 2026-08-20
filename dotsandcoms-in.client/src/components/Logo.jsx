import React from "react";
import logoImg from "../assets/images/dots-and-coms-logo.webp";

export default function Logo({ size = "md" }) {
  // Define heights for responsive logo sizes
  const heights = {
    sm: "h-[44px] md:h-12",
    md: "h-[56px] md:h-16",
    lg: "h-16 md:h-[72px]",
    xl: "h-24 md:h-28",
      '2xl': "h-24 md:h-[180px]",
  };

  const logoHeight = heights[size] || heights.md;

  return (
    <div className="flex items-center select-none">
      <img
        src={logoImg}
        alt="Dots & Coms - Web Development and Android iOS Mobile App Design Agency in Vadodara"
        className={`${logoHeight} w-auto object-contain transition-all duration-300`}
        draggable="false"
        decoding="async"
        width="94"
        height="98"
      />
    </div>
  );
}

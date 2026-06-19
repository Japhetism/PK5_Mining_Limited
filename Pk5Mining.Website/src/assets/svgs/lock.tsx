import React from "react";
import svgPaths from "./svgPaths";

interface LockIconProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
}

export const Lock: React.FC<LockIconProps> = ({
  fillColor = "#C89B3C",
  className,
  ...props
}) => {
  return (
    <svg
      className="absolute block inset-0 size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 79.2 79.2"
      {...props}
    >
      <rect
        fill="white"
        fillOpacity="0.97"
        height="78.21"
        rx="39.105"
        width="78.21"
        x="0.495"
        y="0.495"
      />
      <rect
        height="78.21"
        rx="39.105"
        stroke={fillColor}
        strokeWidth="0.99"
        width="78.21"
        x="0.495"
        y="0.495"
      />
      <path d={svgPaths.p315eef00} fill={fillColor} />
    </svg>
  );
};

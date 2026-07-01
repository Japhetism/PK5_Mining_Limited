import React from "react";
import svgPaths from "./svgPaths";

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
}

export const ArrowRight: React.FC<ArrowIconProps> = ({
  fillColor = "black",
  className,
  ...props
}) => {
  return (
    <svg
      className={`absolute block inset-0 size-full ${className || ""}`}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 12.285 8.44594"
      {...props}
    >
      <g clipPath="url(#clip_arrow)">
        <path
          clipRule="evenodd"
          d={svgPaths.p21c40370}
          fill={fillColor}
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d={svgPaths.pa560200}
          fill={fillColor}
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip_arrow">
          <rect fill="white" height="8.44594" width="12.285" />
        </clipPath>
      </defs>
    </svg>
  );
};

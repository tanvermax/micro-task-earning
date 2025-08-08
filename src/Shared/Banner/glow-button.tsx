import React from "react";

export default function SimpleGradientButton({
  children = "JOIN WITH US",
  colors = {
    base: { from: "#000000", via: "indigo-500", to: "purple-600" },
    hover: { from: "indigo-500", via: "#000000", to: "red-500" },
    focusRing: "#48acca",
  },
  onClick,
}) {
  // Construct Tailwind classes dynamically for gradients:
  // Note: Tailwind doesn't support fully dynamic colors out of the box, so
  // for full dynamic colors you'd need inline styles or a CSS-in-JS lib.
  // Here, we'll fallback to inline styles for dynamic colors.

  const baseGradient = `linear-gradient(to right, ${colors.base.from}, ${colors.base.via}, ${colors.base.to})`;
  const hoverGradient = `linear-gradient(to right, ${colors.hover.from}, ${colors.hover.via}, ${colors.hover.to})`;

  return (
    <>
      <button
        onClick={onClick}
        className="relative px-8 py-3 rounded-2xl font-semibold text-white bg-[length:200%_200%] transition-all duration-500 ease-in-out focus:outline-none focus:ring-4"
        style={{
          backgroundImage: baseGradient,
          backgroundSize: "200% 200%",
          boxShadow: `0 0 10px ${colors.base.to}`, // subtle glow
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage = hoverGradient;
          e.currentTarget.style.animation = "gradient-x 3s ease infinite";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage = baseGradient;
          e.currentTarget.style.animation = "none";
        }}
      >
        {children}
      </button>

      <style>
        {`
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          button:hover {
            background-size: 200% 200%;
          }
        `}
      </style>
    </>
  );
}

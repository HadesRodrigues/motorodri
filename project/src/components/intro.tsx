import { useEffect, useState } from "react";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onDone, 600);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "#000",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 9999,
      transition: "opacity 0.6s ease-in-out",
      opacity: hidden ? 0 : 1,
      pointerEvents: hidden ? "none" : "all",
    }}>
      <div style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        maxWidth: "500px",
      }}>
        <svg
          style={{ width: "100%", maxWidth: "320px", height: "auto" }}
          viewBox="0 -10 200 160"
        >
          {/* Arco cinza de fundo */}
          <path fill="none" stroke="#333" strokeWidth="8" strokeLinecap="round"
            d="M 40 140 A 85 85 0 1 1 160 140" />

          {/* Arco laranja animado */}
          <path fill="none" stroke="#ff6600" strokeWidth="8" strokeLinecap="round"
            className="gauge-fill"
            d="M 40 140 A 85 85 0 1 1 160 140" />

          {/* Ponteiro animado via CSS */}
          <g className="needle" style={{ transformOrigin: "100px 100px" }}>
            <polygon points="97,100 103,100 100,35" fill="#ff6600" />
            <circle cx="100" cy="100" r="6" fill="#ff6600" />
            <circle cx="100" cy="100" r="2" fill="#000" />
          </g>
        </svg>

        <h1 style={{
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          fontWeight: 900,
          color: "#ff6600",
          textTransform: "uppercase",
          letterSpacing: "clamp(2px, 1vw, 5px)",
          marginTop: -20,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 0px 0px 15px rgba(255,102,0,0.5)",
          animation: "textFade 0.8s ease-out 0.3s forwards",
          opacity: 0,
          whiteSpace: "nowrap",
        }}>
          Motorodri
        </h1>
      </div>

      <style>{`
        .gauge-fill {
          stroke-dasharray: 401;
          stroke-dashoffset: 401;
          animation: fillAnim 2s ease-in-out 0s forwards;
        }

        .needle {
          animation: needleAnim 2s ease-in-out 0s forwards;
        }

        @keyframes fillAnim {
          0%   { stroke-dashoffset: 401; }
          5%   { stroke-dashoffset: 401; }
          50%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 401; }
        }

        @keyframes needleAnim {
          0%   { transform: rotate(-135deg); transform-origin: 100px 100px; }
          5%   { transform: rotate(-135deg); transform-origin: 100px 100px; }
          50%  { transform: rotate(135deg); transform-origin: 100px 100px; }
          100% { transform: rotate(-135deg); transform-origin: 100px 100px; }
        }

        @keyframes textFade {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
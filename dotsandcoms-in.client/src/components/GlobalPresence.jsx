import { useEffect, useRef, useState } from "react";
import { Globe, MapPin } from "lucide-react";

export default function GlobalPresence() {
  const canvasRef = useRef(null);
  const [activeHub, setActiveHub] = useState(null);

  const hubs = [
    { name: "San Francisco, USA", x: 0.20, y: 0.38, clients: "120+ Brands Managed" },
    { name: "New York, USA", x: 0.28, y: 0.38, clients: "240+ Websites Delivered" },
    { name: "London, UK", x: 0.48, y: 0.31, clients: "90+ Corporate Systems" },
    { name: "Frankfurt, Germany", x: 0.51, y: 0.32, clients: "140+ Cloud Node Clusters" },
    { name: "Mumbai, India", x: 0.69, y: 0.50, clients: "1500+ Active Products" },
    { name: "Tokyo, Japan", x: 0.84, y: 0.37, clients: "70+ Custom Integrations" },
    { name: "Sydney, Australia", x: 0.88, y: 0.78, clients: "110+ E-Commerce Portals" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId;
    let pulseAngle = 0;

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 400;
      drawMap();
    };

    // Helper to draw a dotted map silhouette
    const drawMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw faint dot grid to simulate world map canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      const dotSpacing = 12;
      for (let x = 0; x < w; x += dotSpacing) {
        for (let y = 0; y < h; y += dotSpacing) {
          // Abstract world silhouette mask (mathematically simulated continents)
          const normX = x / w;
          const normY = y / h;
          
          let isLand = false;

          // North America
          if (normX > 0.12 && normX < 0.32 && normY > 0.22 && normY < 0.55 && !(normX > 0.28 && normY > 0.45)) isLand = true;
          // South America
          if (normX > 0.24 && normX < 0.36 && normY > 0.50 && normY < 0.90) isLand = true;
          // Greenland
          if (normX > 0.35 && normX < 0.45 && normY > 0.10 && normY < 0.22) isLand = true;
          // Africa
          if (normX > 0.45 && normX < 0.58 && normY > 0.42 && normY < 0.78) isLand = true;
          // Europe
          if (normX > 0.44 && normX < 0.58 && normY > 0.20 && normY < 0.42) isLand = true;
          // Asia
          if (normX > 0.56 && normX < 0.88 && normY > 0.18 && normY < 0.60 && !(normX > 0.72 && normY > 0.52)) isLand = true;
          // India area
          if (normX > 0.66 && normX < 0.73 && normY > 0.45 && normY < 0.56) isLand = true;
          // Australia
          if (normX > 0.80 && normX < 0.92 && normY > 0.68 && normY < 0.88) isLand = true;

          if (isLand) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw active communication arcs from Mumbai (our core hub)
      const coreHub = hubs.find(h => h.name.includes("Mumbai"));
      if (coreHub) {
        const startX = coreHub.x * w;
        const startY = coreHub.y * h;

        hubs.forEach((hub) => {
          if (hub === coreHub) return;
          const endX = hub.x * w;
          const endY = hub.y * h;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          // Quadratic curve for nice arcs
          const cpX = (startX + endX) / 2;
          const cpY = (startY + endY) / 2 - 80;
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
          ctx.strokeStyle = "rgba(220, 38, 38, 0.08)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Draw locations (hubs)
      pulseAngle += 0.05;
      hubs.forEach((hub) => {
        const hX = hub.x * w;
        const hY = hub.y * h;

        // Pulse size
        const pulse = 6 + Math.sin(pulseAngle) * 4;

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(hX, hY, pulse, 0, Math.PI * 2);
        ctx.fillStyle = hub.name.includes("Mumbai") 
          ? "rgba(220, 38, 38, 0.25)" 
          : "rgba(234, 88, 12, 0.20)";
        ctx.fill();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(hX, hY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hub.name.includes("Mumbai") ? "#dc2626" : "#ea580c";
        ctx.fill();
      });
    };

    const animate = () => {
      drawMap();
      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section id="presence" className="py-24 relative overflow-hidden bg-[#f8fafc]">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 text-left space-y-4">
            <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
              // GLOBAL FOOTPRINT
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
              International Reach, Direct Support
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Serving ambitious companies in over 12 countries, with active deployments synchronized across key regions.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-2xl glass-panel border border-slate-100 bg-white shadow-sm">
              <Globe className="w-6 h-6 text-[#dc2626] mb-2" />
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-heading">
                Multi-Region Deploy
              </h4>
              <p className="text-xs text-slate-550 mt-1">
                Optimized server endpoints across US, EU, and Asia Pacific.
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-slate-100 bg-white shadow-sm">
              <MapPin className="w-6 h-6 text-[#ea580c] mb-2" />
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-heading">
                Headquarters
              </h4>
              <p className="text-xs text-slate-550 mt-1">
                Mumbai hub managing core designs, API stacks and database clusters.
              </p>
            </div>
          </div>
        </div>

        {/* Map Canvas & Interactivity */}
        <div className="relative rounded-2xl glass-panel border border-slate-100 p-6 bg-white shadow-md">
          <canvas ref={canvasRef} className="w-full block" />
          
          {/* Location Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 border-t border-slate-100 pt-6">
            {hubs.map((hub) => (
              <button
                key={hub.name}
                onMouseEnter={() => setActiveHub(hub.name)}
                onMouseLeave={() => setActiveHub(null)}
                className={`px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeHub === hub.name
                    ? "bg-[#dc2626] border-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                    : "border-slate-200 bg-white text-slate-650 hover:text-slate-800"
                }`}
              >
                {hub.name}
              </button>
            ))}
          </div>

          {/* Active Detail Overlay */}
          {activeHub && (
            <div className="absolute top-6 left-6 p-4 rounded-xl glass-panel border border-red-500/10 max-w-[240px] text-left pointer-events-none hidden md:block bg-white/95 shadow-md">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                {activeHub}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {hubs.find(h => h.name === activeHub)?.clients}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

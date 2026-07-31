import { useEffect, useRef } from "react";

/**
 * Hero section background — exact same canvas grid system as inner-page banners.
 * Full width + height coverage guaranteed. Tilts with mouse, ripples on scroll.
 */
export default function ThreeBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setSize = () => {
            const p = canvas.parentElement;
            canvas.width  = p ? p.clientWidth  : window.innerWidth;
            canvas.height = p ? p.clientHeight : window.innerHeight;
        };
        setSize();

        /* ── camera tilt state ── */
        let targetRotX = -0.28;
        let targetRotY =  0.0;
        let rotX       = -0.28;
        let rotY       =  0.0;
        const LERP = 0.055;

        /* ── scroll ripple state ── */
        const ripples = [];
        let lastScrollY = window.scrollY;

        /* ── events ── */
        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const nx = ((e.clientX - rect.left)  / canvas.width  - 0.5) * 2;
            const ny = ((e.clientY - rect.top)   / canvas.height - 0.5) * 2;
            targetRotY =  nx * 0.22;
            targetRotX = -0.28 - ny * 0.14;
        };

        const onScroll = () => {
            const delta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            ripples.push({
                t:         0,
                speed:     0.018 + Math.random() * 0.012,
                amplitude: Math.min(Math.abs(delta) * 2.2, 55),
                direction: delta > 0 ? 1 : -1,
            });
            if (ripples.length > 6) ripples.splice(0, ripples.length - 6);
        };

        const onResize = () => setSize();

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("scroll",    onScroll);
        window.addEventListener("resize",    onResize);

        const CELL  = 52;
        const FL    = 800;
        const EXTRA = 10;

        /* ── projection — world coords centred at (0,0,0) ── */
        const project = (cx, cy, z, W, H) => {
            const x1 =  cx * Math.cos(rotY) + z  * Math.sin(rotY);
            const z1 = -cx * Math.sin(rotY) + z  * Math.cos(rotY);
            const y2 =  cy * Math.cos(rotX) - z1 * Math.sin(rotX);
            const z2 =  cy * Math.sin(rotX) + z1 * Math.cos(rotX);
            const depth = FL + z2 + 600;
            const scale = FL / Math.max(depth, 0.1);
            return {
                sx: W / 2 + x1 * scale,
                sy: H / 2 + y2 * scale,
            };
        };

        let time = 0;
        let raf;

        const draw = () => {
            rotX += (targetRotX - rotX) * LERP;
            rotY += (targetRotY - rotY) * LERP;

            // Advance ripple fronts
            for (let i = ripples.length - 1; i >= 0; i--) {
                ripples[i].t += ripples[i].speed;
                if (ripples[i].t > 1.6) ripples.splice(i, 1);
            }

            const W = canvas.width;
            const H = canvas.height;

            ctx.clearRect(0, 0, W, H);
            ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
            ctx.lineWidth   = 1;

            const COLS = Math.ceil(W / CELL) + EXTRA * 2;
            const ROWS = Math.ceil(H / CELL) + EXTRA * 2;

            const pts = [];
            for (let r = 0; r <= ROWS; r++) {
                pts[r] = [];
                for (let c = 0; c <= COLS; c++) {
                    const cx = (c - COLS / 2) * CELL;
                    const cy = (r - ROWS / 2) * CELL;

                    // Ambient wave
                    const ambient =
                        Math.sin(c * 0.38 + time) *
                        Math.cos(r * 0.42 + time * 0.7) * 16 +
                        Math.sin(r * 0.3  - time * 0.5) * 8;

                    // Scroll ripples
                    let scrollZ = 0;
                    for (const rip of ripples) {
                        const colNorm  = c / COLS;
                        const rowNorm  = r / ROWS;
                        const distFromFront = colNorm - rip.t * 1.1;
                        const envelope = Math.exp(-distFromFront * distFromFront * 28);
                        const rowMod   = Math.sin(rowNorm * Math.PI * 2.5 + rip.t * 6) * 0.5;
                        scrollZ += envelope * rip.amplitude * (1 + rowMod) * rip.direction;
                    }

                    pts[r][c] = project(cx, cy, ambient + scrollZ, W, H);
                }
            }

            /* Horizontal lines */
            for (let r = 0; r <= ROWS; r++) {
                ctx.beginPath();
                for (let c = 0; c <= COLS; c++) {
                    const p = pts[r][c];
                    c === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy);
                }
                ctx.stroke();
            }

            /* Vertical lines */
            for (let c = 0; c <= COLS; c++) {
                ctx.beginPath();
                for (let r = 0; r <= ROWS; r++) {
                    const p = pts[r][c];
                    r === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy);
                }
                ctx.stroke();
            }

            time += 0.014;
            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll",    onScroll);
            window.removeEventListener("resize",    onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                zIndex: 0,
                pointerEvents: "none",
            }}
            aria-hidden="true"
        />
    );
}

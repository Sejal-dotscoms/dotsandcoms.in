import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Configuration matching the Dots and Coms  SVG logo dots layout (using soft pastel colors)
const LOGO_CONFIG = [
    // Top Row (Light Pastel Yellow)
    { rx: 5.5,  ry: 3.0, cx: 30, cy: 30, color: 0xfef08a },
    { rx: 6.5,  ry: 3.5, cx: 48, cy: 26, color: 0xfef08a },
    { rx: 7.5,  ry: 4.0, cx: 68, cy: 24, color: 0xfef08a },
    // Middle Row (Light Pastel Orange)
    { rx: 7.5,  ry: 4.0, cx: 28, cy: 50, color: 0xfed7aa },
    { rx: 9.0,  ry: 4.8, cx: 48, cy: 44, color: 0xfed7aa },
    { rx: 11.0, ry: 5.5, cx: 72, cy: 40, color: 0xfed7aa },
    // Bottom Row (Light Pastel Rose/Crimson)
    { rx: 10.0, ry: 5.2, cx: 26, cy: 74, color: 0xfecdd3 },
    { rx: 12.5, ry: 6.5, cx: 50, cy: 68, color: 0xfecdd3 },
    { rx: 15.5, ry: 8.0, cx: 80, cy: 62, color: 0xfecdd3 }
];

function isWebGLAvailable() {
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
    } catch (e) {
        return false;
    }
}

export default function ThreeBackground2() {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
    const [webglSupported] = useState(() => isWebGLAvailable());

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!containerRef.current || !webglSupported) return;

        const container = containerRef.current;
        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || window.innerHeight;

        // 1. Scene setup
        const scene = new THREE.Scene();

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 12;

        // 3. Renderer setup
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (err) {
            console.warn("WebGL not supported, falling back to CSS static representation:", err);
            return;
        }

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 4. Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight1.position.set(5, 8, 5);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffaa66, 0.35); // Soft orange side highlight
        dirLight2.position.set(-5, -5, -2);
        scene.add(dirLight2);

        // 5. Interaction variables
        const mouse = new THREE.Vector2(0, 0);
        let scrollY = 0;
        let mergeFactor = 0; // 0 = floating abstract orbits, 1 = logo merged

        // 6. Create 9 Spheres (Spheroids) for logo dots
        const spheres = [];
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

        LOGO_CONFIG.forEach((config) => {
            const material = new THREE.MeshPhysicalMaterial({
                color: config.color,
                roughness: 0.2,
                metalness: 0.05,
                clearcoat: 0.8,
                clearcoatRoughness: 0.1,
                transparent: true,
                opacity: 0.28, // highly translucent pastel colors for readability
            });

            const mesh = new THREE.Mesh(sphereGeometry, material);
            scene.add(mesh);

            // Save target layouts, floating phase offsets, and spring physics properties
            spheres.push({
                mesh,
                config,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                phaseZ: Math.random() * Math.PI * 2,
                speedX: 0.35 + Math.random() * 0.3,
                speedY: 0.35 + Math.random() * 0.3,
                speedZ: 0.25 + Math.random() * 0.2,
                velocity: new THREE.Vector3(0, 0, 0),
            });
        });

        // 7. Create Silver Logo Swoosh Ring (Scaled to match 0.09 logo scale)
        const swooshGeometry = new THREE.TorusGeometry(4.0, 0.09, 16, 120);
        const swooshMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xdddddd,
            roughness: 0.15,
            metalness: 0.9,
            clearcoat: 0.8,
            transparent: true,
            opacity: 0,
        });
        const swoosh = new THREE.Mesh(swooshGeometry, swooshMaterial);
        scene.add(swoosh);

        // 8. Drifting Starfield Background
        const starCount = 30;
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        const starSpeeds = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 22;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
            starPositions[i * 3 + 2] = -3 - Math.random() * 5; 
            starSpeeds[i] = 0.2 + Math.random() * 0.5;
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xe2e8f0,
            size: 0.05,
            transparent: true,
            opacity: 0.1,
            sizeAttenuation: true,
        });
        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        // 9. Event Listeners
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
        };

        const handleMouseLeave = () => {
            mouse.x = 0;
            mouse.y = 0;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScroll);

        const handleResize = () => {
            if (!containerRef.current) return;
            width = container.clientWidth || window.innerWidth;
            height = container.clientHeight || window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        // 10. Animation Loop
        let animationFrameId;
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            // Calculate base position: ALWAYS AT THE BOTTOM-LEFT (SHIFTED TO FAR LEFT)
            const isMobile = width < 1024;
            const logoCenterX = isMobile ? -4.2 : -9.2; // shifted to the far-left edge
            const logoCenterY = isMobile ? -2.8 : -1.8; // positioned low on the left

            // Project NDC mouse coordinate to 3D units at z = 0
            const aspect = width / height;
            const vFOV = (camera.fov * Math.PI) / 180;
            const visibleHeight = 2 * Math.tan(vFOV / 2) * 12; // 12 is camera distance
            const visibleWidth = visibleHeight * aspect;
            const mouseX3D = mouse.x * (visibleWidth / 2);
            const mouseY3D = mouse.y * (visibleHeight / 2);

            // Snappy 8-second cycle for merging & dispersing:
            const cycleTime = time % 8;
            let targetMerge = 0;
            if (cycleTime >= 2.5 && cycleTime < 7.0) {
                targetMerge = 1;
            }

            // Snappy eased mergeFactor
            mergeFactor += (targetMerge - mergeFactor) * 0.15;

            // Scroll parallax offset
            const scrollOffset = scrollY * 0.004;

            // Update Spheres
            spheres.forEach((sphere, i) => {
                const { mesh, config, phaseX, phaseY, phaseZ, speedX, speedY, speedZ } = sphere;

                // A. Base Target Logo position (scaled to 0.09 for a larger logo)
                const relativeX = (config.cx - 50) * 0.09;
                const relativeY = -(config.cy - 50) * 0.09;
                let logoTargetX = logoCenterX + relativeX;
                let logoTargetY = logoCenterY + relativeY - scrollOffset * 0.7;
                let logoTargetZ = 0;

                // B. Base Orbit position (floating mode) - attracted slightly to mouse
                const floatOrbitX = logoCenterX + Math.sin(time * speedX + phaseX) * 2.2 + mouseX3D * 0.2;
                const floatOrbitY = logoCenterY + Math.cos(time * speedY + phaseY) * 1.8 + mouseY3D * 0.2 - scrollOffset * 0.6;
                const floatOrbitZ = Math.sin(time * speedZ + phaseZ) * 1.0;

                // C. Interactive repulsion ripples (only when merged)
                if (mergeFactor > 0.15) {
                    const dx = logoTargetX - mouseX3D;
                    const dy = logoTargetY - mouseY3D;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 2.8; // repulsion radius scaled up proportionally to the larger logo size

                    if (dist < maxDist) {
                        const force = (maxDist - dist) * 0.35 * mergeFactor;
                        logoTargetX += (dx / (dist || 0.001)) * force;
                        logoTargetY += (dy / (dist || 0.001)) * force;
                        logoTargetZ += (maxDist - dist) * 0.2 * mergeFactor;
                    }
                }

                // D. Interpolate actual target coordinate
                const currentTargetX = THREE.MathUtils.lerp(floatOrbitX, logoTargetX, mergeFactor);
                const currentTargetY = THREE.MathUtils.lerp(floatOrbitY, logoTargetY, mergeFactor);
                const currentTargetZ = THREE.MathUtils.lerp(floatOrbitZ, logoTargetZ, mergeFactor);

                // E. Snappy spring calculations
                const stiffness = 0.16;
                const damping = 0.8;

                sphere.velocity.x += (currentTargetX - mesh.position.x) * stiffness;
                sphere.velocity.y += (currentTargetY - mesh.position.y) * stiffness;
                sphere.velocity.z += (currentTargetZ - mesh.position.z) * stiffness;

                sphere.velocity.multiplyScalar(damping);
                mesh.position.add(sphere.velocity);

                // F. Lerp scale (flat ellipsoids in logo mode, round spheres in floating mode)
                const rx = config.rx * 0.09;
                const ry = config.ry * 0.09;
                const rz = ((config.rx + config.ry) / 2) * 0.09;

                const targetScaleX = rx;
                const targetScaleY = ry;
                const targetScaleZ = rz;

                const floatScale = 0.4; // larger floating size

                const currentScaleX = THREE.MathUtils.lerp(floatScale, targetScaleX, mergeFactor);
                const currentScaleY = THREE.MathUtils.lerp(floatScale, targetScaleY, mergeFactor);
                const currentScaleZ = THREE.MathUtils.lerp(floatScale, targetScaleZ, mergeFactor);

                mesh.scale.set(currentScaleX, currentScaleY, currentScaleZ);

                // G. Lerp rotation
                const targetRotZ = -28 * Math.PI / 180;
                
                const floatRotX = time * 0.4 + i;
                const floatRotY = time * 0.3 + i * 1.5;
                const floatRotZ = time * 0.5;

                mesh.rotation.x = THREE.MathUtils.lerp(floatRotX, 0, mergeFactor);
                mesh.rotation.y = THREE.MathUtils.lerp(floatRotY, 0, mergeFactor);
                mesh.rotation.z = THREE.MathUtils.lerp(floatRotZ, targetRotZ, mergeFactor);
            });

            // Update Swoosh Ring
            if (swoosh) {
                swoosh.position.set(logoCenterX, logoCenterY - scrollOffset * 0.7, 0);

                // Fade swoosh opacity
                swooshMaterial.opacity = THREE.MathUtils.lerp(0.0, 0.35, mergeFactor);

                // Scale up
                const scaleS = THREE.MathUtils.lerp(0.2, 1.0, mergeFactor);
                swoosh.scale.set(scaleS * 1.35, scaleS * 0.42, scaleS * 1.0);

                // Tilt and rotation
                const baseRotX = 1.25;
                const baseRotY = 0.45;
                const baseRotZ = -0.65;

                swoosh.rotation.x = baseRotX + mouse.y * 0.06;
                swoosh.rotation.y = baseRotY + mouse.x * 0.06;
                swoosh.rotation.z = baseRotZ + time * 0.03; // spin ring slowly
            }

            // Drifting starfield
            if (starField) {
                const pos = starGeometry.attributes.position.array;
                for (let i = 0; i < starCount; i++) {
                    pos[i * 3 + 1] -= 0.004 * starSpeeds[i];
                    pos[i * 3] += Math.sin(time * 0.2 + i) * 0.001;

                    if (pos[i * 3 + 1] < -7) {
                        pos[i * 3 + 1] = 7;
                        pos[i * 3] = (Math.random() - 0.5) * 22;
                    }
                }
                starGeometry.attributes.position.needsUpdate = true;
            }

            // Render
            renderer.render(scene, camera);

            // Exit animation frame requests on mobile
            if (isMobile) return;

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // 11. Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            // Dispose geometries, materials, and renderer
            sphereGeometry.dispose();
            swooshGeometry.dispose();
            swooshMaterial.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
            renderer.dispose();
        };
    }, [isMobile, webglSupported]);

    if (!webglSupported) {
        return (
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-600/5 blur-[120px]" />
                <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-orange-500/5 blur-[100px]" />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}

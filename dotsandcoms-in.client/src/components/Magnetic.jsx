import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Magnetic({ children }) {
    const ref = useRef(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 12, stiffness: 150, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Pull effect: moves the element slightly (35%) towards the cursor
        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

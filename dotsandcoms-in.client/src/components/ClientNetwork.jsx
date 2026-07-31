import { motion } from "framer-motion";

const PARTNERS = [
    {
        name: "Alembic Pharmaceuticals",
        url: "https://alembicpharmaceuticals.com/",
        logo: "/alembic-icon.svg",
        width: 127,
        height: 51
    },
    {
        name: "Gujarat Badminton Association",
        url: "https://www.gujaratbadminton.org/",
        logo: "/gujarat-badminton-association-sports-club.svg",
        width: 120,
        height: 79
    },
    {
        name: "Rubamin",
        url: "https://www.rubamin.com/",
        logo: "/rubamin-chemical-company-vadodara.svg",
        width: 134,
        height: 39
    },
    {
        name: "Nilkanth Group",
        url: "https://www.nilkanthgroup.co.in",
        logo: "/nilkanth-group-vadodara-business.svg",
        width: 120,
        height: 64
    },
    {
        name: "JR Group",
        url: "https://www.jrgroup.co.in/",
        logo: "/jr-industries-vadodara-manufacturing.svg",
        width: 120,
        height: 55
    },
    {
        name: "GIPCL",
        url: "https://www.gipcl.com",
        logo: "/gipcl-energy-company-gujarat-power.svg",
        width: 116,
        height: 110
    },
    {
        name: "Book Pratha",
        url: "https://www.bookpratha.com/",
        logo: "/bookpratha-online-bookstore-india.svg",
        width: 121,
        height: 47
    },
    {
        name: "Memorify",
        url: "https://www.memorify.world/",
        logo: "/memorify-learning-app-education.svg",
        width: 137,
        height: 73
    },
    {
        name: "Bankers Heart",
        url: "https://www.bankersheart.com/",
        logo: "/client-logos-banner-vadodara-company.svg",
        width: 133,
        height: 116
    }
];

// Divide partners into two distinct rows to display in the dual marquee
const ROW1_PARTNERS = [
    PARTNERS[0], PARTNERS[1], PARTNERS[2], PARTNERS[3], PARTNERS[4],
    PARTNERS[0], PARTNERS[1], PARTNERS[2], PARTNERS[3], PARTNERS[4]
];

const ROW2_PARTNERS = [
    PARTNERS[5], PARTNERS[6], PARTNERS[7], PARTNERS[8], PARTNERS[2],
    PARTNERS[5], PARTNERS[6], PARTNERS[7], PARTNERS[8], PARTNERS[2]
];

export default function ClientNetwork() {
    return (
        <section className="py-20 relative overflow-hidden bg-white border-y border-slate-100/80">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
                <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                    // CLIENT NETWORK
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight mt-2">
                    Trusted by Industry Leaders
                </h2>
            </div>

            {/* Marquee Container with side fade-out gradients */}
            <div className="relative flex flex-col space-y-6 w-full py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 md:before:w-40 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 md:after:w-40 after:bg-gradient-to-l after:from-white after:to-transparent">
                
                {/* Row 1: Left to Right Marquee */}
                <div className="relative flex overflow-x-hidden w-full">
                    <motion.div
                        className="flex space-x-8 whitespace-nowrap min-w-full items-center"
                        animate={{ x: [0, "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 25,
                            repeat: Infinity,
                        }}
                    >
                        {ROW1_PARTNERS.map((partner, index) => (
                            <a
                                key={`row1-${partner.name}-${index}`}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center justify-center h-20 w-44 px-3 filter grayscale contrast-75 brightness-95 opacity-70 hover:grayscale-0 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                                title={partner.name}
                            >
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} Logo`}
                                    className="max-h-12 max-w-[140px] object-contain pointer-events-none"
                                    loading="lazy"
                                    width={partner.width}
                                    height={partner.height}
                                />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Right to Left Marquee (Opposite Direction) */}
                <div className="relative flex overflow-x-hidden w-full">
                    <motion.div
                        className="flex space-x-8 whitespace-nowrap min-w-full items-center"
                        animate={{ x: ["-50%", 0] }}
                        transition={{
                            ease: "linear",
                            duration: 25,
                            repeat: Infinity,
                        }}
                    >
                        {ROW2_PARTNERS.map((partner, index) => (
                            <a
                                key={`row2-${partner.name}-${index}`}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center justify-center h-20 w-44 px-3 filter grayscale contrast-75 brightness-95 opacity-70 hover:grayscale-0 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                                title={partner.name}
                            >
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} Logo`}
                                    className="max-h-12 max-w-[140px] object-contain pointer-events-none"
                                    loading="lazy"
                                    width={partner.width}
                                    height={partner.height}
                                />
                            </a>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

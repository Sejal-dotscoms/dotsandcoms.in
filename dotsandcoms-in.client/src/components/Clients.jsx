import { motion } from "framer-motion";

export default function Clients() {
  const partners = [
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
    // {
    //   name: "Memorify",
    //   url: "https:www.memorify.world/",
    //   logo: "/memorify-learning-app-education.svg",
    //   width: 137,
    //   height: 73
    // },
    {
      name: "Bankers Heart",
      url: "https://www.bankersheart.com/",
      logo: "/client-logos-banner-vadodara-company.svg",
      width: 133,
      height: 116
    }
  ];

  // Double the list for infinite looping marquee
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-10 md:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center md:px-12">
        <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
          // CLIENT NETWORK
        </span>
        <h2 className="font-heading mt-2 text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex w-full overflow-x-hidden py-4 before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent md:before:w-40 md:after:w-40">
        <motion.div
          className="flex min-w-full items-center space-x-6 whitespace-nowrap md:space-x-8"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {marqueePartners.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-24 w-48 flex-shrink-0 cursor-pointer items-center justify-center px-3 opacity-70 brightness-95 contrast-75 grayscale filter transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:filter-none"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={index < 8 ? `${partner.name} Corporate Client of Dots & Coms` : ""}
                aria-hidden={index >= 8 ? "true" : undefined}
                className="pointer-events-none max-h-16 max-w-[150px] object-contain"
                loading="lazy"
                decoding="async"
                width={partner.width}
                height={partner.height}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

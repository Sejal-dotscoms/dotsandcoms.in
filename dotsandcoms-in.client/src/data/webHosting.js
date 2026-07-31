import sslImg from "../assets/images/ssl.png";
import logoImg from "../assets/images/dots-and-coms-logo.png";

export const bannerData = {
  title: "Web Hosting & Cloud Servers",
  subtitle: "High-performance SSD cloud server configurations, Windows & Linux VPS, and secure SSL digital certificates.",
  breadcrumbs: [
    { label: "Services", href: "/services" },
    { label: "Web Hosting" }
  ]
};

export const websiteHostingData = {
  title: "Reliable Windows Hosting with ASP.NET & MSSQL in Vadodara",
  paragraphs: [
    "Dots & Coms provides dependable Windows web hosting services for businesses and individuals working with ASP.NET, MSSQL, and other Microsoft technologies. Our hosting environment supports the .NET Framework, Windows Server, and scripting languages such as VBScript, making it ideal for applications that require a Windows-based infrastructure.",
    "We offer reliable uptime, scalable resources, and seamless connectivity with Microsoft platforms. Our Windows hosting services come with control panel access, email configurations, and secure database support. Whether you run a dynamic website or a corporate application, our hosting services provide continuous performance and data reliability.",
    "As a reliable Windows web hosting service provider, we also give technical assistance with server-side scripts, application deployment, and configuration."
  ],
  pricing: {
    sectionTitle: "Windows Shared Hosting Plans",
    headers: ["Hosting Plans", "Silver Pack", "Gold Pack", "Gold Plus Pack", "Platinum Pack", "Diamond Pack"],
    plans: [
      { pack: 1, price: "2,499" },
      { pack: 2, price: "3,999" },
      { pack: 3, price: "6,399" },
      { pack: 4, price: "11,250" },
      { pack: 5, price: "16,500" }
    ],
    features: [
      {
        group: "Account Features",
        items: [
          { name: "Disk Space", values: ["250 MB", "500 MB", "1 GB", "2.5 GB", "5 GB"] },
          { name: "Bandwidth Traffic", values: ["10 GB / Month", "20 GB / Month", "32 GB / Month", "40 GB / Month", "60 GB / Month"] },
          { name: "Control Panel", spec: "[Plesk Obsidian v18.0.65]", values: [true, true, true, true, true] },
          { name: "Friendly Customer Support", values: [true, true, true, true, true] }
        ]
      },
      {
        group: "Email Features [Mail Enable]",
        items: [
          { name: "Pop3 / IMAP Email Account", values: ["5", "10", "15", "25", "35"] },
          { name: "Email Auto Responders", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
          { name: "Email Forwarding & Aliases", values: [true, true, true, true, true] },
          { name: "Web Mail", spec: "[Mail Enable v10.48]", values: [true, true, true, true, true] },
          { name: "Spam & Virus Protection", values: [true, true, true, true, true] },
          { name: "Multi Recipient Addresses", values: [true, true, true, true, true] },
          { name: "IMAP", values: [true, true, true, true, true] }
        ]
      },
      {
        group: "Other Features",
        items: [
          { name: "FTP Accounts", values: [true, true, true, true, true] },
          { name: "Password Protection Directories", values: [true, true, true, true, true] },
          { name: "Access to Log Files", values: [true, true, true, true, true] },
          { name: "Customizable 404 Error Pages", values: [true, true, true, true, true] },
          { name: "Web Statistics [Live Status]", values: [true, true, true, true, true] },
          { name: "Domain aliases / sub-domains", values: ["1", "2", "5", "10", "15"] },
          { name: "ODBC DSN Connections", values: [true, true, true, true, true] }
        ]
      },
      {
        group: "Software Support",
        items: [
          { name: "ASP, ASP.NET, AJAX", spec: "[Version 4.8.0]", values: [true, true, true, true, true] },
          { name: "PHP", spec: "[v8.0.30, v8.2.26]", values: [true, true, true, true, true] },
          { name: "MS Access", values: [true, true, true, true, true] },
          { name: "MS SQL 2022", spec: "[Version 16.0.1000.6]", values: ["Optional*", "Optional*", "Optional*", "Optional*", "Optional*"] },
          { name: "MySQL [Maria DB 10.X]", values: [true, true, true, true, true] },
          { name: "CGI-BIN", values: [true, true, true, true, true] },
          { name: "Server Side Includes", values: [true, true, true, true, true] }
        ]
      },
      {
        group: "Servers & Network",
        items: [
          { name: "Intel Xeon 2.80 GHz – S2K / Intel Xeon 2.30 GHz – KK", values: [true, true, true, true, true] },
          { name: "99.99% uptime", values: [true, true, true, true, true] },
          { name: "24/7 Network Monitoring", values: [true, true, true, true, true] },
          { name: "Low User : Machine Ratio", values: [true, true, true, true, true] },
          { name: "UPS & Generator Backup", values: [true, true, true, true, true] },
          { name: "Data Backups [Acronis]", values: [true, true, true, true, true] }
        ]
      }
    ]
  },
  databaseAddon: {
    title: "MS SQL Database Add-on",
    text: "Secure MS SQL 2022 database setups are available at <strong>₹2,499 Per Year</strong> per database."
  },
  policies: {
    title: "Download Usage Policies",
    text: "Click here to download and review our official Acceptable Use Policies in PDF format.",
    pdfUrl: "https://www.dotsandcoms.in/assets/pdf/Acceptable_Use_Policy.pdf"
  }
};

export const vpsHostingData = {
  title: "Windows & Linux VPS Hosting in Gujarat with Root Access & Dedicated Resources",
  paragraphs: [
    "We offer Virtual Private Server (VPS) hosting to businesses who need dedicated resources and more control over their hosting environment. VPS hosting provides a secure and scalable solution that bridges the gap between shared and dedicated servers.",
    "Our VPS plans include root access, resource isolation, and unique customizations. Clients can use dedicated CPU, RAM, and storage to execute complex apps, manage high-traffic websites, or host many projects with increased performance and security.",
    "Our VPS hosting is ideal for developers, businesses and organizations that require flexibility. It is powered by virtualized infrastructure and comes with managed or unmanaged solutions. Local assistance is provided to help with setup, OS installation and regular server maintenance.",
    "As a VPS hosting provider, we guarantee data integrity, limited access and reliable uptime for your essential web applications."
  ],
  managedHostingExtraNote: "* Managed hosting for VPS will be Extra RS 3,750 per month.",
  subTabs: {
    windows: {
      paragraphs: [
        "We provide Windows VPS servers for businesses that demand a Microsoft-based environment. These VPS solutions, which enable Windows Server operating systems, Remote Desktop access, and full administrator control, are ideal for ASP.NET applications, MSSQL databases, and enterprise-level software.",
        "Each Windows VPS provides isolated resources (CPU, RAM, and storage), allowing clients to run applications in a stable and secure environment. Users can install custom software, manage updates, and scale as their needs evolve. Our infrastructure provides high uptime and performance, making it ideal for hosting business-critical services."
      ],
      plans: [
        { plan: "VPS-W 1", cpu: "1 Core", ram: "1 GB", disk: "25 GB", price: "3,535", pack: "1" },
        { plan: "VPS-W 2", cpu: "2 Core", ram: "2 GB", disk: "50 GB", price: "5,785", pack: "3" },
        { plan: "VPS-W 3", cpu: "2 Core", ram: "4 GB", disk: "80 GB", price: "8,355", pack: "5" },
        { plan: "VPS-W 4", cpu: "4 Core", ram: "8 GB", disk: "160 GB", price: "11,890", pack: "7" }
      ]
    },
    linux: {
      paragraphs: [
        "Our Linux VPS servers offer a flexible and reliable hosting environment for individuals and businesses that use open-source technology. Linux VPS hosting, which supports Ubuntu, CentOS, and Debian distributions, is optimal for PHP applications, MySQL databases, web servers (Apache/Nginx), and command-line control.",
        "Clients have root access, secure SSH connectivity, and the ability to configure the server according to their individual requirements. Whether you're running a development environment or deploying production workloads, Linux VPS provides excellent control and resource efficiency."
      ],
      plans: [
        { plan: "VPS-L 1", cpu: "1 Core", ram: "1 GB", disk: "25 GB", price: "2,895", pack: "1" },
        { plan: "VPS-L 2", cpu: "2 Core", ram: "2 GB", disk: "50 GB", price: "3,500", pack: "3" },
        { plan: "VPS-L 3", cpu: "2 Core", ram: "4 GB", disk: "80 GB", price: "4,820", pack: "5" },
        { plan: "VPS-L 4", cpu: "4 Core", ram: "8 GB", disk: "160 GB", price: "6,105", pack: "7" }
      ]
    }
  }
};

export const dedicatedServersData = {
  title: "Dedicated Server Plans: Self-Managed vs. Fully Managed Options",
  paragraphs: [
    "Dots and Coms offers dedicated server hosting to companies that need top efficiency, management and security. Our managed solutions are based on enterprise-class Super Micro servers and are ideal for resource-intensive applications, large databases, and high-traffic websites.",
    "Each dedicated server is set up to fulfil individual needs, including complete root access, separated hardware resources, and OS-level management. We provide initial setup, system configuration, and frequent updates. We help guarantee server stability and security at all times by monitoring proactively and responding quickly to problems."
  ],
  checklist: [
    "Enterprise-grade Super Micro-based dedicated servers",
    "Fully managed hosting with initial setup and configuration",
    "24/7 expert support with unlimited technical assistance",
    "Proactive server monitoring and performance optimization",
    "100% network and power uptime SLAs"
  ],
  outro: "Ideal for enterprises, SaaS providers and organizations with critical hosting demands, our dedicated server solutions ensure continuous availability and infrastructure reliability.",
  subTabs: {
    managed: {
      paragraphs: [
        "Our managed dedicated servers offer complete support from initial setup to daily maintenance...",
        "Ideal for businesses looking for hassle-free server management with expert assistance."
      ],
      features: [
        "Initial setup and OS configuration",
        "Proactive monitoring and response",
        "Security patching and regular updates",
        "Unlimited 24/7 technical support",
        "Hardware and network SLA-backed reliability"
      ]
    },
    "self-managed": {
      paragraphs: [
        "Our self-managed dedicated servers provide full root access and complete architectural freedom. You control the operating system, software configuration, and security updates, backed by our 100% network uptime SLAs.",
        "Ideal for experienced network administrators and development teams looking for unmanaged hardware environments."
      ],
      features: [
        "Full root access & administrative control",
        "Complete choice of operating systems (Linux/Windows)",
        "Redundant network uplink & IP allocations",
        "100% network and power availability SLA",
        "Hardware replacement assistance"
      ]
    }
  },
  plans: [
    // Managed Plans
    {
      title: "Gold Windows",
      price: "15,425",
      category: "managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "8GB DDR4 ECC RAM (max 64GB)",
        "1 * 500G HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "OS: Windows 2012 R2 / 2016 Standard",
        "Plesk Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=1"
    },
    {
      title: "Platinum Windows",
      price: "18,640",
      category: "managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "16GB DDR4 ECC RAM (max 64GB)",
        "1 * 1 TB HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "OS: Windows 2012 R2 / 2016 Standard",
        "Plesk Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=3"
    },
    {
      title: "Gold Linux",
      price: "14,785",
      category: "managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "8GB DDR4 ECC RAM (max 64GB)",
        "1 * 500G HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "CentOS6 x64/ CentOS7 x64",
        "cPanel Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=2"
    },
    {
      title: "Platinum Linux",
      price: "17,675",
      category: "managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "16GB DDR4 ECC RAM (max 64GB)",
        "1 * 1 TB HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "CentOS6 x64/ CentOS7 x64",
        "cPanel Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=4"
    },
    // Self-Managed Plans
    {
      title: "Bronze Windows",
      price: "13,500",
      category: "self-managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "8GB DDR4 ECC RAM (max 64GB)",
        "1 * 500G HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "OS: Windows 2012 R2 / 2016 Standard",
        "Plesk Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=5"
    },
    {
      title: "Silver Windows",
      price: "16,100",
      category: "self-managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "16GB DDR4 ECC RAM (max 64GB)",
        "1 * 1 TB HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "OS: Windows 2012 R2 / 2016 Standard",
        "Plesk Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=7"
    },
    {
      title: "Bronze Linux",
      price: "12,535",
      category: "self-managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "8GB DDR4 ECC RAM (max 64GB)",
        "1 * 500G HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "CentOS6 x64/ CentOS7 x64",
        "cPanel Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=6"
    },
    {
      title: "Silver Linux",
      price: "14,465",
      category: "self-managed",
      cpu: "Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)",
      features: [
        "16GB DDR4 ECC RAM (max 64GB)",
        "1 * 1 TB HDD",
        "20TB @1Gbps Uplink",
        "/29 ipv4 5 usable IPs",
        "CentOS6 x64/ CentOS7 x64",
        "cPanel Control Panel"
      ],
      link: "/order-now?type=dedicated&pack=8"
    }
  ],
  logo: logoImg
};

export const sslData = {
  title: "SSL & Digital Security Certificates in Vadodara for Secure Websites",
  paragraphs: [
    "Internet and consumer data safety is becoming a threat. Implementing SSL Digital Security Certificates is one of the best ways to keep your website secure and also to keep the customers data and transactions secure. Even the Search Giant Google recently announced to include HTTPS as a ranking signal. Now improve your rankings and your trust with an SSL Certificate (HTTPS).",
    "Dots & Coms being the complete web solutions provider brings you best in class security for your websites. SSL Certificates,"
  ],
  checklist: [
    "Keeps payments & customer data private",
    "Are Compatible with all major browsers",
    "Issued Super fast.",
    "Improves search Rankings on Google"
  ],
  image: sslImg,
  pricing: {
    headers: ["Plans", "for 1 year"],
    rows: [
      { name: "SSL Cost", price: "2900" },
      { name: "Installation Cost", price: "1500" }
    ],
    totalCost: "4400",
    orderLink: "/order-now?pack=ssl"
  },
  additionalInclusions: [
    "Strong 256 bit encryption",
    "Thawte Trusted Seal",
    "Supports IDN"
  ]
};

export const ctaData = {
  badge: "Cloud Consult",
  title: "Need secure enterprise cloud architecture?",
  description: "Contact DNC's network administrators to outline hosting specs, CDN configuration parameters, and SSL certificate installation plans.",
  ctaText: "Get Free Consulting",
  ctaLink: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
};

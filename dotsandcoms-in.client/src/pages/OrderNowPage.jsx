import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Globe, Building2, User, Mail, Phone, MapPin, Hash, 
  Check, ArrowRight, ShieldCheck, Database, ShoppingBag, 
  HelpCircle, RefreshCw, ChevronRight, CheckCircle2, Server, Settings, Terminal
} from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

// Predefined packages database with detailed specifications
const packages = [
  // Shared Hosting
  { 
    id: "shared-1", type: "shared", pack: "1", name: "Web Hosting - Silver Pack", price: 2499, period: "year",
    specs: ["Disk Space: 250 MB", "Bandwidth: 10 GB / Month", "Plesk Obsidian v18.0", "Friendly Customer Support"]
  },
  { 
    id: "shared-2", type: "shared", pack: "2", name: "Web Hosting - Gold Pack", price: 3999, period: "year",
    specs: ["Disk Space: 500 MB", "Bandwidth: 20 GB / Month", "Plesk Obsidian v18.0", "Friendly Customer Support"]
  },
  { 
    id: "shared-3", type: "shared", pack: "3", name: "Web Hosting - Gold Plus Pack", price: 6399, period: "year",
    specs: ["Disk Space: 1 GB", "Bandwidth: 32 GB / Month", "Plesk Obsidian v18.0", "Friendly Customer Support"]
  },
  { 
    id: "shared-4", type: "shared", pack: "4", name: "Web Hosting - Platinum Pack", price: 11250, period: "year",
    specs: ["Disk Space: 2.5 GB", "Bandwidth: 40 GB / Month", "Plesk Obsidian v18.0", "Friendly Customer Support"]
  },
  { 
    id: "shared-5", type: "shared", pack: "5", name: "Web Hosting - Diamond Pack", price: 16500, period: "year",
    specs: ["Disk Space: 5 GB", "Bandwidth: 60 GB / Month", "Plesk Obsidian v18.0", "Friendly Customer Support"]
  },
  
  // SSL Certificate
  { 
    id: "ssl", type: "ssl", pack: "ssl", name: "SSL 1 Year (2900 + 1500 = 4400 Rs)", price: 4400, period: "year",
    specs: ["Strong 256-bit encryption", "Thawte Trusted Seal Included", "Supports IDN", "Improves Search Rankings"]
  },
  
  // VPS Windows
  { 
    id: "vpsw-1", type: "vpsw", pack: "1", name: "VPS Windows Server Self-Managed | VPS-W 1", price: 3535, period: "month",
    specs: ["VPS Plan: VPS-W 1", "vCPU: 1 Core", "RAM: 1GB", "Disk Space: 25GB", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsw-3", type: "vpsw", pack: "3", name: "VPS Windows Server Self-Managed | VPS-W 2", price: 5785, period: "month",
    specs: ["VPS Plan: VPS-W 2", "vCPU: 2 Core", "RAM: 2GB", "Disk Space: 50GB", "Processor: 2x Intel E5-2620v2", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsw-5", type: "vpsw", pack: "5", name: "VPS Windows Server Self-Managed | VPS-W 3", price: 8355, period: "month",
    specs: ["VPS Plan: VPS-W 3", "vCPU: 2 Core", "RAM: 4GB", "Disk Space: 80GB", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsw-7", type: "vpsw", pack: "7", name: "VPS Windows Server Self-Managed | VPS-W 4", price: 11890, period: "month",
    specs: ["VPS Plan: VPS-W 4", "vCPU: 4 Core", "RAM: 8GB", "Disk Space: 160GB", "Highly Available", "Self-Healing"]
  },
  
  // VPS Linux
  { 
    id: "vpsl-1", type: "vpsl", pack: "1", name: "VPS Linux Server Self-Managed | VPS-L 1", price: 2895, period: "month",
    specs: ["VPS Plan: VPS-L 1", "vCPU: 1 Core", "RAM: 1GB", "Disk Space: 25GB", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsl-3", type: "vpsl", pack: "3", name: "VPS Linux Server Self-Managed | VPS-L 2", price: 3500, period: "month",
    specs: ["VPS Plan: VPS-L 2", "vCPU: 2 Core", "RAM: 2GB", "Disk Space: 50GB", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsl-5", type: "vpsl", pack: "5", name: "VPS Linux Server Self-Managed | VPS-L 3", price: 4820, period: "month",
    specs: ["VPS Plan: VPS-L 3", "vCPU: 2 Core", "RAM: 4GB", "Disk Space: 80GB", "Highly Available", "Self-Healing"]
  },
  { 
    id: "vpsl-7", type: "vpsl", pack: "7", name: "VPS Linux Server Self-Managed | VPS-L 4", price: 6105, period: "month",
    specs: ["VPS Plan: VPS-L 4", "vCPU: 4 Core", "RAM: 8GB", "Disk Space: 160GB", "Highly Available", "Self-Healing"]
  },
  
  // Dedicated Server
  { 
    id: "dedi-1", type: "dedicated", pack: "1", name: "Gold Windows - Managed", price: 15425, period: "month",
    specs: ["Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)", "8GB DDR4 ECC RAM (max 64GB)", "1 * 500G HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "OS: Windows 2012 R2 / 2016 Standard", "Plesk Control Panel"]
  },
  { 
    id: "dedi-3", type: "dedicated", pack: "3", name: "Platinum Windows - Managed", price: 18640, period: "month",
    specs: ["Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)", "16GB DDR4 ECC RAM (max 64GB)", "1 * 1 TB HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "OS: Windows 2012 R2 / 2016 Standard", "Plesk Control Panel"]
  },
  { 
    id: "dedi-5", type: "dedicated", pack: "5", name: "Bronze Windows - Self-Managed", price: 13500, period: "month",
    specs: ["Intel Xeon E3-1230v6 Processor (8 HT Cores)", "8GB DDR4 ECC RAM (max 64GB)", "1 * 500G HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "OS: Windows 2012 R2 / 2016 Standard", "Plesk Control Panel"]
  },
  { 
    id: "dedi-7", type: "dedicated", pack: "7", name: "Silver Windows - Self-Managed", price: 16100, period: "month",
    specs: ["Intel Xeon E3-1230v6 Processor (8 HT Cores)", "16GB DDR4 ECC RAM (max 64GB)", "1 * 1 TB HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "OS: Windows 2012 R2 / 2016 Standard", "Plesk Control Panel"]
  },
  { 
    id: "dedi-2", type: "dedicated", pack: "2", name: "Gold Linux - Managed", price: 14785, period: "month",
    specs: ["Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)", "8GB DDR4 ECC RAM (max 64GB)", "1 * 500G HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "CentOS6 x64/ CentOS7 x64", "cPanel Control Panel Available"]
  },
  { 
    id: "dedi-4", type: "dedicated", pack: "4", name: "Platinum Linux - Managed", price: 17675, period: "month",
    specs: ["Intel Xeon E3-1230v6 3.3GHz Processor (8 HT Cores)", "16GB DDR4 ECC RAM (max 64GB)", "1 * 1 TB HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "CentOS6 x64/ CentOS7 x64", "cPanel Control Panel Available"]
  },
  { 
    id: "dedi-6", type: "dedicated", pack: "6", name: "Bronze Linux - Self-Managed", price: 12535, period: "month",
    specs: ["Intel Xeon E3-1230v6 Processor (8 HT Cores)", "8GB DDR4 ECC RAM (max 64GB)", "1 * 500G HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "CentOS6 x64/ CentOS7 x64", "cPanel Control Panel"]
  },
  { 
    id: "dedi-8", type: "dedicated", pack: "8", name: "Silver Linux - Self-Managed", price: 14465, period: "month",
    specs: ["Intel Xeon E3-1230v6 Processor (8 HT Cores)", "16GB DDR4 ECC RAM (max 64GB)", "1 * 1 TB HDD", "20TB @1Gbps Uplink", "/29 ipv4 5 usable IPs", "CentOS6 x64/ CentOS7 x64", "cPanel Control Panel"]
  }
];

const countries = [
  { value: "India", label: "India" },
  { value: "United States", label: "United States of America" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "Australia", label: "Australia" },
  { value: "Canada", label: "Canada" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "cntr", label: "----------------------------------------------", disabled: true },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Anguilla", label: "Anguilla" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Antigua And Barbuda", label: "Antigua And Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Aruba", label: "Aruba" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bermuda", label: "Bermuda" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia And Herzegowina", label: "Bosnia And Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Brunei Darussalam", label: "Brunei Darussalam" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Cape Verde", label: "Cape Verde" },
  { value: "Cayman Islands", label: "Cayman Islands" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo", label: "Congo" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Denmark", label: "Denmark" },
  { value: "Egypt", label: "Egypt" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "Greece", label: "Greece" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Hungary", label: "Hungary" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Mexico", label: "Mexico" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Qatar", label: "Qatar" },
  { value: "Russian Federation", label: "Russia" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Singapore", label: "Singapore" },
  { value: "South Africa", label: "South Africa" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Thailand", label: "Thailand" },
  { value: "Turkey", label: "Turkey" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Viet Nam", label: "Vietnam" },
  { value: "Zimbabwe", label: "Zimbabwe" }
];

export default function OrderNowPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const packParam = searchParams.get("pack");
  const typeParam = searchParams.get("type");
  
  // Find initial package or fallback
  const getSelectedPackage = () => {
    if (typeParam) {
      return packages.find(p => p.type === typeParam && p.pack === packParam) || packages[0];
    }
    if (packParam) {
      return packages.find(p => p.pack === packParam) || packages[0];
    }
    return packages[0];
  };

  const [selectedPack, setSelectedPack] = useState(getSelectedPackage);
  
  // Is this a Server Plan (VPS/Dedicated)?
  const isServerPlan = selectedPack.type === "vpsw" || selectedPack.type === "vpsl" || selectedPack.type === "dedicated";
  const isWindowsServer = selectedPack.type === "vpsw" || (selectedPack.type === "dedicated" && selectedPack.name.toLowerCase().includes("windows"));
  const isLinuxVps = selectedPack.type === "vpsl";
  const isDedicatedPlan = selectedPack.type === "dedicated";
  const isSslPlan = selectedPack.type === "ssl";

  // Common Form States
  const [companyName, setCompanyName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState(isServerPlan ? "United States" : "India");
  const [comments, setComments] = useState("");

  // Shared Hosting specific fields
  const [domain, setDomain] = useState("");
  const [yourName, setYourName] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [addMsSql, setAddMsSql] = useState(false);

  // VPS/Dedicated specific fields
  const [serverName, setServerName] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [operatingSystem, setOperatingSystem] = useState(
    isDedicatedPlan
      ? "CentOS 6 x64"
      : isWindowsServer 
        ? "Windows 2016 Standard Edition" 
        : isLinuxVps 
          ? "CentOS 6 x64" 
          : "CentOS 7 x64"
  );
  const [paymentTerm, setPaymentTerm] = useState(
    isDedicatedPlan 
      ? "6" 
      : isLinuxVps 
        ? "1" 
        : "6"
  );
  const [controlPanelOption, setControlPanelOption] = useState(
    isDedicatedPlan 
      ? "0" 
      : selectedPack.type === "vpsw" 
        ? "355" 
        : "0"
  );

  // Captcha setup
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Sync state if search parameters change
  useEffect(() => {
    const newPack = getSelectedPackage();
    setSelectedPack(newPack);
    // Reset defaults based on selection type
    if (newPack.type === "vpsw" || newPack.type === "vpsl" || newPack.type === "dedicated") {
      setCountry("United States");
      const win = newPack.type === "vpsw" || newPack.name.toLowerCase().includes("windows");
      setOperatingSystem(newPack.type === "dedicated" ? "CentOS 6 x64" : (win ? "Windows 2016 Standard Edition" : (newPack.type === "vpsl" ? "CentOS 6 x64" : "CentOS 7 x64")));
      setPaymentTerm(newPack.type === "dedicated" ? "6" : (newPack.type === "vpsl" ? "1" : "6"));
      setControlPanelOption(newPack.type === "vpsw" ? "355" : "0");
    } else {
      setCountry("India");
    }
  }, [searchParams]);

  // Generate math captcha
  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // SEO metadata setup
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: `Complete Your Order - ${selectedPack.name} | Dots & Coms`,
      description: `Securely order ${selectedPack.name}. Blazing fast SSD network performance and professional support with Dots & Coms Baroda.`,
      keywords: "web hosting order, buy ssl certificate, checkout page Dots and Coms, windows hosting Baroda, secure server purchase",
      canonical: "https://www.dotsandcoms.in/order-now"
    });
  }, [selectedPack]);

  const handlePackageChange = (e) => {
    const packObj = packages.find(p => p.id === e.target.value);
    if (packObj) {
      setSelectedPack(packObj);
      if (packObj.type === "shared" || packObj.type === "ssl") {
        setSearchParams({ pack: packObj.pack });
      } else {
        setSearchParams({ type: packObj.type, pack: packObj.pack });
      }
    }
  };

  // Price Calculations
  const termMonths = isServerPlan ? parseInt(paymentTerm) : 1;
  const basePricePerPeriod = selectedPack.price;
  
  // Calculate Setup Charge
  const setupCharge = isServerPlan && paymentTerm === "1"
    ? (selectedPack.type === "dedicated" ? 3000 : 1500)
    : 0;

  // Control panel price per month
  const panelPricePerMonth = isServerPlan ? parseInt(controlPanelOption) : 0;
  
  // SQL addon for shared hosting
  const dbAddonPrice = !isServerPlan && addMsSql ? 2499 : 0;

  // Subtotal before setup and discounts (Monthly rate for servers, annual for others)
  const subtotal = basePricePerPeriod + panelPricePerMonth;
  
  // Calculate Discount (5% on 12 months for servers, calculated on monthly rate)
  const discount = isServerPlan && paymentTerm === "12" ? subtotal * 0.05 : 0;
  
  // Final calculated total (Monthly rate with setup fees/addons factored in)
  const totalPrice = subtotal - discount + setupCharge + dbAddonPrice;

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCaptchaError("");

        // Validate Math Captcha
        const expected = captchaNum1 + captchaNum2;
        if (parseInt(captchaAnswer) !== expected) {
            setCaptchaError("Incorrect captcha numeric value. Please try again.");
            return;
        }

        setIsSubmitting(true);

        //const payload = {
        //    packageName: selectedPack.name,
        //    packageId: selectedPack.id,
        //    price: selectedPack.price,
        //    period: selectedPack.period,
        //    companyName,
        //    contactNumber: contactNo,
        //    emailId: email,
        //    address,
        //    state,
        //    country,
        //    comments,
        //    isServerPlan,
        //    totalPrice,
        //    ...(isServerPlan ? {
        //        serverName,
        //        contactPersonName,
        //        specialInstructions,
        //        operatingSystem,
        //        paymentTerms: paymentTerm === "1" ? "1 Month + Setup" : paymentTerm === "6" ? "6 Months" : "12 Months (5% Disc)",
        //        controlPanel: controlPanelOption === "0" ? "No Panel" : `Panel Option - Rate: ₹${controlPanelOption}/mo`
        //    } : {
        //        domainName: domain,
        //        yourName,
        //        areaCode,
        //        addMsSql
        //    })
        //};
        const payload = {
            packageName: selectedPack.name,
            packageId: selectedPack.id,
            price: selectedPack.price,
            period: selectedPack.period,
            companyName,
            contactNumber: contactNo,
            emailId: email,
            address,
            city,                                    // 👈 add
            state,
            country,
            comments,
            isServerPlan,
            totalPrice: Math.round(totalPrice * 100) / 100,
            setupCharge,                              // 👈 add
            dbAddonPrice,                             // 👈 add
            discount: Math.round(discount * 100) / 100, // 👈 add

            serverName: isServerPlan ? serverName : "N/A",
            contactPersonName: isServerPlan ? contactPersonName : "N/A",
            specialInstructions: isServerPlan ? specialInstructions : "None",
            operatingSystem: isServerPlan ? operatingSystem : "N/A",
            paymentTerms: isServerPlan ? (paymentTerm === "1" ? "1 Month + Setup" : paymentTerm === "6" ? "6 Months" : "12 Months (5% Disc)") : "N/A",
            controlPanel: isServerPlan ? (controlPanelOption === "0" ? "No Panel" : `Panel Option - Rate: ₹${controlPanelOption}/mo`) : "N/A",

            domainName: !isServerPlan ? domain : "N/A",
            yourName: !isServerPlan ? yourName : "N/A",
            areaCode: !isServerPlan ? areaCode : "N/A",
            addMsSql: !isServerPlan ? addMsSql : false
        };


        try {
            const response = await fetch("https://www.dotsandcoms.in/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // DB me kuch save nahi hua — sirf token se agla page
                navigate(`/web-hosting-details?token=${encodeURIComponent(data.token)}`);
            } else {
                setCaptchaError(data.message || "Failed to submit the order. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setCaptchaError("Something went wrong. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
      <InnerBanner
        title={isSslPlan ? "Complete Your SSL Certificate Order" : "Complete Your Order"}
        subtitle={isSslPlan ? "Secure your website with advanced 256-bit SSL encryption and boost Google search visibility." : "Secure your custom SSD hosting infrastructure with high availability and self-healing environments."}
        breadcrumbs={[
          { label: "Web Hosting", href: "/windows-web-hosting-service-provider-baroda" },
          { label: "Order Now" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div 
                key="order-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-start"
              >
                {/* Billing details form */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-8">
                  
                  {/* Title banner matching traditional styling */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                        {isSslPlan ? "SSL Plan Option" : "Active Selection"}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
                        {isSslPlan ? "Package you chose : SSL 1 Year (2900 + 1500 = 4400 Rs)" : selectedPack.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-500 block">Price</span>
                      <span className="text-base sm:text-lg font-black text-slate-800 font-mono">
                        ₹{selectedPack.price.toLocaleString()} / {selectedPack.period}
                      </span>
                    </div>
                  </div>

                  {/* 1. Hosting Package Configuration */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-150 pb-2 mb-4 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#dc2626]" />
                      1. Select / Confirm Hosting Plan
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Package
                        </label>
                        <select
                          value={selectedPack.id}
                          onChange={handlePackageChange}
                          className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                        >
                          <optgroup label="Shared Windows Hosting">
                            {packages.filter(p => p.type === "shared").map(p => (
                              <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()}/Yr)</option>
                            ))}
                          </optgroup>
                          <optgroup label="SSL Certificates">
                            {packages.filter(p => p.type === "ssl").map(p => (
                              <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()}/Yr)</option>
                            ))}
                          </optgroup>
                          <optgroup label="Windows VPS Hosting">
                            {packages.filter(p => p.type === "vpsw").map(p => (
                              <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()}/mo)</option>
                            ))}
                          </optgroup>
                          <optgroup label="Linux VPS Hosting">
                            {packages.filter(p => p.type === "vpsl").map(p => (
                              <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()}/mo)</option>
                            ))}
                          </optgroup>
                          <optgroup label="Dedicated Servers">
                            {packages.filter(p => p.type === "dedicated").map(p => (
                              <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()}/mo)</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>

                      {/* CONDITIONAL FIELD: Server Name (VPS/Dedicated) vs Domain Name (Shared/SSL) */}
                      {isServerPlan ? (
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            *Server Name <span className="text-[10px] text-slate-400 font-normal">[eg. xyz.domainname.com]</span>
                          </label>
                          <div className="relative">
                            <Server className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                                                          required
                              placeholder="xyz.yourcompany.com"
                              value={serverName}
                              onChange={(e) => setServerName(e.target.value)}
                              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            *Domain Name
                          </label>
                          <div className="relative">
                            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                                                              required
                              placeholder="e.g. yourcompany.com"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value)}
                              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Billing details (Adapted labels) */}
                  <div className="space-y-4">
                    <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-150 pb-2 mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#dc2626]" />
                      2. Billing Information
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          *Company Name
                        </label>
                        <input
                          type="text"
                                                  required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                        />
                      </div>
                      
                      {/* CONDITIONAL LABEL: Contact Person Name vs Your Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          {isServerPlan ? "*Contact Person Name" : "*Your Name"}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                                                      required
                            value={isServerPlan ? contactPersonName : yourName}
                            onChange={(e) => isServerPlan ? setContactPersonName(e.target.value) : setYourName(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          *Email ID
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                                                      required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          *Contact Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                                                      required
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        *Address
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
                        <textarea
                          
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200 resize-none"
                        />
                      </div>
                    </div>

                    {isServerPlan ? (
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            *City
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            *State
                          </label>
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            *Country
                          </label>
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                          >
                            {countries.map((c, idx) => (
                              <option key={idx} value={c.value} disabled={c.disabled}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *City
                            </label>
                            <input
                              type="text"
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *State
                            </label>
                            <input
                              type="text"
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *Area Code
                            </label>
                            <input
                              type="text"
                              required
                              value={areaCode}
                              onChange={(e) => setAreaCode(e.target.value)}
                              className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *Country
                            </label>
                            <select
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            >
                              {countries.map((c, idx) => (
                                <option key={idx} value={c.value} disabled={c.disabled}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 3. Server Configuration & Addons */}
                  <div className="space-y-4">
                    <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-150 pb-2 mb-4 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#dc2626]" />
                      3. Configuration Details
                    </h3>

                    {/* VPS / Dedicated configuration selects */}
                    {isServerPlan ? (
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                          
                          {/* OS Selection */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *Operating System
                            </label>
                            <select
                                                          value={operatingSystem}
                                                          required
                              onChange={(e) => setOperatingSystem(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            >
                              {isDedicatedPlan || isLinuxVps ? (
                                <>
                                  <option value="CentOS 6 x64">CentOS 6 x64</option>
                                  <option value="CentOS 7 x64">CentOS 7 x64</option>
                                  <option value="Ubuntu x64">Ubuntu x64</option>
                                </>
                              ) : isWindowsServer ? (
                                <>
                                  <option value="Windows 2012 R2">Windows 2012 R2</option>
                                  <option value="Windows 2016 Standard Edition">Windows 2016 Standard Edition</option>
                                </>
                              ) : (
                                <>
                                  <option value="CentOS 7 x64">CentOS 7 x64</option>
                                  <option value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS</option>
                                  <option value="Debian 12">Debian 12</option>
                                </>
                              )}
                            </select>
                          </div>

                          {/* Payment Terms Term Selection */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *Payment Cycle
                            </label>
                                                      <select
                                                          required
                              value={paymentTerm}
                              onChange={(e) => setPaymentTerm(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            >
                               {isDedicatedPlan ? (
                                 <>
                                   <option value="1">1 Month Cost + Setup charge</option>
                                   <option value="6">6 Months (No Setup Charge)</option>
                                   <option value="12">12 Months (No Setup Charge / 5% Discount)</option>
                                 </>
                               ) : (
                                 <>
                                   <option value="1">1 Month + Setup fee</option>
                                   <option value="6">6 Months (No Setup)</option>
                                   <option value="12">12 Months (No Setup / 5% Disc)</option>
                                 </>
                               )}
                            </select>
                          </div>

                          {/* Control Panel Options Select */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              *Control Panel Options
                            </label>
                                                      <select
                                                          required
                              value={controlPanelOption}
                              onChange={(e) => setControlPanelOption(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200"
                            >
                              {isDedicatedPlan || isLinuxVps ? (
                                <>
                                  <option value="1950">cPanel ₹1950 per month</option>
                                  <option value="0">No Cpanel</option>
                                </>
                              ) : isWindowsServer ? (
                                <>
                                  <option value="0">No Cpanel</option>
                                  <option value="355">Plesk Web Admin (₹355/mo)</option>
                                  <option value="450">Plesk Web App (₹450/mo)</option>
                                  <option value="2380">Plesk Web Host (₹2,380/mo)</option>
                                </>
                              ) : (
                                <>
                                  <option value="0">No Cpanel</option>
                                  <option value="400">cPanel Admin (₹400/mo)</option>
                                  <option value="600">cPanel Pro (₹600/mo)</option>
                                  <option value="2500">cPanel Premier (₹2,500/mo)</option>
                                </>
                              )}
                            </select>
                          </div>

                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Special Instructions
                          </label>
                          <textarea
                            rows={3}
                                                      value={specialInstructions}
                                                      required
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200 resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      // Shared / SSL Add-on options
                      <div className="space-y-4">
                        {selectedPack.type === "shared" && (
                          <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={addMsSql}
                              onChange={(e) => setAddMsSql(e.target.checked)}
                              className="mt-1 w-4 h-4 rounded text-[#dc2626] border-slate-300 focus:ring-red-500"
                            />
                            <div className="text-xs sm:text-sm">
                              <span className="font-bold text-slate-800 block sm:inline">Add MS-SQL 2012 Database Support</span>
                              <span className="text-slate-500 sm:ml-2">Price: ₹2,499 per year</span>
                              <span className="text-[11px] block mt-0.5 text-[#dc2626] font-semibold bg-red-50 px-1.5 py-0.5 rounded w-max">
                                this can be added later
                              </span>
                            </div>
                          </label>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Comments
                          </label>
                          <textarea
                                                          rows={3}
                                                          required
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200 resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Math Captcha & Submit */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-full sm:w-auto flex flex-col gap-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        *Verify Math Check
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center gap-1.5 px-4 h-11 rounded-lg bg-slate-800 text-white font-mono font-black text-sm tracking-wide select-none">
                          <span>{captchaNum1}</span>
                          <span>+</span>

                          <span>{captchaNum2}</span>
                          <span>=</span>
                        </div>
                        <input
                          type="number"
                         
                          placeholder="Answer"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          className="w-28 h-11 text-center bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200 font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                          title="Refresh Captcha"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        capcha verification
                                          </span>
                                          {captchaError && (
                                              <p className="text-xs text-[#dc2626] font-semibold mb-2">{captchaError}</p>
                                          )}
                    </div>

                    <div className="w-full sm:flex-1 flex flex-col items-stretch sm:items-end justify-end">
                      
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all duration-300 hover:shadow-red-300 hover:-translate-y-0.5 text-sm uppercase tracking-wider cursor-pointer font-heading"
                      >
                        {isSubmitting ? "Processing..." : "Submit Order Now"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </form>

                {/* Sidebar summary */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Plan Specifications Panel */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#dc2626]" />
                      Package Specifications
                    </h3>
                    <ul className="space-y-2">
                      {selectedPack.specs && selectedPack.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="text-xs font-semibold text-slate-650 flex items-start gap-1.5">
                          <span className="text-[#dc2626] font-bold">&gt;</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Summary Card */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#dc2626]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4 mb-4">
                      Order Summary
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-semibold">Plan Chosen</div>
                        <div className="text-base font-extrabold text-white mt-1 leading-tight">{selectedPack.name}</div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs text-slate-350">
                        <span>Term Option</span>
                        <span className="font-bold bg-white/10 px-2.5 py-0.5 rounded text-white uppercase tracking-wider">
                          {isServerPlan ? `${paymentTerm} Month(s)` : `1 ${selectedPack.period}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1 text-sm text-slate-300">
                        <span>Base Cost {isServerPlan ? "/ Month" : ""}</span>
                        <span className="font-mono font-bold text-white">₹{basePricePerPeriod.toLocaleString()}</span>
                      </div>

                      {/* VPS Control Panel item */}
                      {isServerPlan && parseInt(controlPanelOption) > 0 && (
                        <div className="flex justify-between items-center py-1 text-sm text-slate-350">
                          <span>Control Panel / Month</span>
                          <span className="font-mono font-bold text-white">₹{panelPricePerMonth.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Shared Hosting database addon */}
                      {!isServerPlan && addMsSql && (
                        <div className="flex justify-between items-center py-1 text-sm text-slate-350">
                          <span>MS-SQL Add-on</span>
                          <span className="font-mono font-bold text-white">₹2,499</span>
                        </div>
                      )}

                      {/* Setup Charge */}
                      {setupCharge > 0 && (
                        <div className="flex justify-between items-center py-1 text-sm text-slate-350">
                          <span>Setup Charge</span>
                          <span className="font-mono font-bold text-white">₹{setupCharge.toLocaleString()}</span>
                        </div>
                      )}

                      {/* 12 Months Discount */}
                      {discount > 0 && (
                        <div className="flex justify-between items-center py-1 text-sm text-emerald-400 font-semibold">
                          <span>5% Discount Applied</span>
                          <span className="font-mono">-₹{Math.round(discount).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="w-full h-[1px] bg-white/10 my-4" />

                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs text-slate-400 uppercase font-semibold">Total Amount</div>
                          <div className="text-slate-500 text-[10px] mt-0.5 font-medium">*Excludes GST if applicable</div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black font-mono text-white">₹{Math.round(totalPrice).toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            / {selectedPack.period} {isServerPlan && `(${paymentTerm} Month cycle)`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Card */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#dc2626]" />
                      Dots & Coms Guarantee
                    </h4>
                    <ul className="text-xs text-slate-650 space-y-2.5">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Blazing fast network speed powered by Intel Xeon hardware.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Acronis backups included to protect against data loss.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>99.99% uptime guarantee with 24/7 proactive network monitoring.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-12 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Order Placed Successfully!</h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Thank you for ordering with Dots & Coms. We have received your order details and will setup your server/domain hosting shortly.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto border border-slate-150 space-y-3 text-left">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Order Reference</span>
                    <span>Plan Details</span>
                  </div>
                  <div className="flex justify-between text-slate-800 font-bold">
                    <span className="font-mono text-base text-[#dc2626]">{orderNumber}</span>
                    <span className="text-sm">{selectedPack.name}</span>
                  </div>
                  <div className="w-full h-[1px] bg-slate-200" />
                  <div className="flex justify-between items-center text-xs text-slate-505">
                    <span>Total Amount due:</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">₹{Math.round(totalPrice).toLocaleString()}</span>
                  </div>
                  {(serverName || domain) && (
                    <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-150">
                      Primary server/domain assigned: <strong className="text-slate-700">{isServerPlan ? serverName : domain}</strong>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Our deployment desk will contact you via email at <strong className="text-slate-600">{email}</strong> to complete server verification and payment processing.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => navigate("/windows-web-hosting-service-provider-baroda")}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-md cursor-pointer"
                  >
                    Back to Hosting Solutions
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

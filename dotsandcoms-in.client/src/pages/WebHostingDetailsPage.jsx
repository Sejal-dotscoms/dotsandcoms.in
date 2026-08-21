import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import paymentMethodsImg from "../assets/images/payment-methods.png";
import { setPageSEO } from "../utils/seo";

export default function WebHostingDetailsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("Master Card");
    const [processing, setProcessing] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        return setPageSEO({
            title: "Web Hosting Order Details | Dots & Coms",
            description: "View and process your web hosting order details. Enjoy secure transactions, 99.9% uptime, and robust cloud hosting setups with Dots & Coms Baroda.",
            keywords: "hosting order details, invoice tracking, web hosting setup, secure hosting payment, Dots and Coms",
            canonical: "https://www.dotsandcoms.in/web-hosting-details"
        });
    }, []);

    // Token se order data fetch karo — DB me kuch bhi nahi hai, sab kuch token me hai
    useEffect(() => {
        if (!token) {
            setLoadError("No order token found.");
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await fetch(`https://www.dotsandcoms.in/api/orders/details?token=${encodeURIComponent(token)}`);
                const data = await res.json();
                if (res.ok && data.success) {
                    setOrder(data.data);
                } else {
                    setLoadError(data.message || "Invalid or expired order link.");
                }
            } catch (err) {
                console.error(err);
                setLoadError("Something went wrong while loading your order.");
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-white p-6">
                <div role="status" className="sr-only">Loading Web Hosting Order Details...</div>
                <Loader2 className="h-6 w-6 animate-spin text-[#dc2626]" />
            </div>
        );
    }

    if (loadError || !order) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-white p-6">
                <div className="w-full max-w-md space-y-4 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Web Hosting Order Details</h2>
                    <p className="text-base font-semibold text-slate-600">No Active Order Session</p>
                    <p className="text-sm text-slate-500">
                        {loadError || "We couldn't find any pending order details. Please fill out the configuration form first."}
                    </p>
                    <button
                        onClick={() => navigate("/order-now")}
                        className="inline-flex items-center gap-2 bg-[#dc2626] text-white font-bold py-2 px-6 rounded hover:bg-red-700 transition"
                    >
                        Go to Order Now
                    </button>
                </div>
            </div>
        );
    }

    const {
        orderRef, packageName, price: packagePrice, period: packagePeriod,
        domainName, companyName, yourName, emailId, contactNumber, address,
        city, state: orderState, areaCode, country, comments, totalPrice,
        isServerPlan, serverName, operatingSystem,
        setupCharge = 0, dbAddonPrice = 0, discount = 0
    } = order;

    const displayName = packageName.replace("Web Hosting - ", "");
    const gstRate = 0.18;
    const gstAmount = Math.round(totalPrice * gstRate * 100) / 100;
    const grandTotal = Math.round((totalPrice + gstAmount) * 100) / 100;

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setProcessing(true);

        try {
            const res = await fetch("https://www.dotsandcoms.in/api/orders/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, paymentMethod })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                // Webforms jaisa hi — external payment gateway pe redirect, naye token ke saath
                window.location.href = data.redirectUrl;
            } else {
                setSubmitError(data.message || "Unable to proceed to payment. Please try again.");
                setProcessing(false);
            }
        } catch (err) {
            console.error(err);
            setSubmitError("Something went wrong. Please check your connection and try again.");
            setProcessing(false);
        }
    };

    return (
        <>
            <InnerBanner
                title="Web Hosting Order Details"
                subtitle={<>Review your <strong>web hosting configuration</strong>, billing information, and proceed with <strong>secure payment</strong> at Dots & Coms.</>}
                breadcrumbs={[
                    { label: "Web Hosting", href: "/windows-web-hosting-service-provider-baroda" },
                    { label: "Order Now", href: "/order-now" },
                    { label: "Order Details" }
                ]}
            />
            <div className="min-h-screen bg-white px-6 py-16 font-sans text-slate-900 sm:px-12 md:px-24">
                <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed md:text-lg">
                    <motion.form
                        key="payment-form"
                        onSubmit={handleFinalSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div>
                            <p className="font-extrabold text-black">
                                Package you choosed : <span className="font-black text-slate-900">{displayName}</span> Price: ₹ {packagePrice} per {packagePeriod}
                            </p>
                            <p className="mt-1 font-mono text-xs text-slate-400">Order Ref: {orderRef}</p>
                        </div>

                        <div>
                            <p className="font-bold text-slate-800">
                                {isServerPlan ? "Server Name:" : "Domain Name:"}
                                <span className="ml-4 font-extrabold text-black">
                                    {isServerPlan ? serverName : domainName}
                                </span>
                            </p>
                            {isServerPlan && (
                                <p className="mt-1 font-bold text-slate-800">
                                    Operating System:
                                    <span className="ml-4 font-extrabold text-black">{operatingSystem}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 pt-2">
                            <h2 className="mb-3 border-b border-slate-200 pb-1 text-lg font-black text-black">
                                Billing Information:
                            </h2>
                            <div className="space-y-1.5">
                                <p className="text-slate-700">Company Name: <span className="ml-2 font-extrabold text-black">{companyName}</span></p>
                                <p className="text-slate-700">Your Name: <span className="ml-2 font-extrabold text-black">{yourName}</span></p>
                                <p className="text-slate-700">Email ID: <span className="ml-2 font-extrabold text-black">{emailId}</span></p>
                                <p className="text-slate-700">Contact Number: <span className="ml-2 font-extrabold text-black">{contactNumber}</span></p>
                                <p className="text-slate-700">Address: <span className="ml-2 font-extrabold text-black">{address}</span></p>
                                <p className="text-slate-700">City: <span className="ml-2 font-extrabold text-black">{city}</span></p>
                                <p className="text-slate-700">State: <span className="ml-2 font-extrabold text-black">{orderState}</span></p>
                                {!isServerPlan && areaCode && (
                                    <p className="text-slate-700">Area Code: <span className="ml-2 font-extrabold text-black">{areaCode}</span></p>
                                )}
                                <p className="text-slate-700">Country: <span className="ml-2 font-extrabold text-black">{country}</span></p>
                                <p className="text-slate-700">Comments: <span className="ml-2 font-extrabold text-black">{comments || "N/A"}</span></p>
                            </div>
                        </div>

                        <div className="space-y-1.5 border-t border-slate-100 pt-4">
                            <p className="text-slate-700">{displayName}: <span className="ml-2 font-extrabold text-black">₹ {Number(packagePrice).toFixed(2)}</span></p>
                            {!isServerPlan && dbAddonPrice > 0 && (
                                <p className="text-slate-700">SQL 2012 Database Support: <span className="ml-2 font-extrabold text-black">₹ {Number(dbAddonPrice).toFixed(2)}</span></p>
                            )}
                            {setupCharge > 0 && (
                                <p className="text-slate-700">Setup Charge: <span className="ml-2 font-extrabold text-black">₹ {Number(setupCharge).toFixed(2)}</span></p>
                            )}
                            {discount > 0 && (
                                <p className="text-emerald-700">Discount: <span className="ml-2 font-extrabold">-₹ {Number(discount).toFixed(2)}</span></p>
                            )}
                            <p className="text-slate-700">Total: <span className="ml-2 font-extrabold text-black">₹ {Number(totalPrice).toFixed(2)}</span></p>
                            <p className="text-slate-700">GST (18%) : <span className="ml-2 font-extrabold text-black">₹ {gstAmount.toFixed(2)}</span></p>
                            <p className="font-extrabold text-black">Grand Total: <span className="ml-2 font-black text-black">₹ {grandTotal.toFixed(2)}</span></p>
                        </div>

                        <div className="space-y-4 border-t border-slate-100 pt-4">
                            <h2 className="text-base font-bold text-slate-800">Payment methods:</h2>
                            <div className="my-2 max-w-lg">
                                <img src={paymentMethodsImg} alt="Payment Gateway Logos" className="h-auto w-full object-contain" loading="lazy" decoding="async" width="1024" height="189" />
                            </div>
                            <div className="flex flex-col gap-6 pt-2 sm:flex-row">
                                {["Master Card", "Visa", "NetBanking"].map((method) => (
                                    <label key={method} className="inline-flex cursor-pointer items-center gap-2 select-none">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#dc2626] focus:ring-red-500 border-slate-350"
                                        />
                                        <span className="text-sm font-semibold text-slate-800">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {submitError && (
                            <p className="text-xs font-semibold text-[#dc2626]">{submitError}</p>
                        )}

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="font-heading cursor-pointer rounded bg-[#dc2626] px-8 py-3.5 text-sm font-bold tracking-wider text-white uppercase shadow transition hover:bg-red-700"
                            >
                                {processing ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}
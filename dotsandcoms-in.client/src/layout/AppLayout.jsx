import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WhatsAppButton from "../components/ui/WhatsAppButton";

const AppLayout = () => {
    useEffect(() => {
        window.hasLoadedOnce = true;
    }, []);

    return (
        <>
            <Header/>
            <Outlet />
            <Footer/>
            <WhatsAppButton />
        </>
    );
};

export default AppLayout;
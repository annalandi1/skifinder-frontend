import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router-dom";

const LayoutWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* SideMenu per desktop */}
      {!isMobile && <SideMenu />}

      <div className="flex-1 pb-16 md:pb-0 md:pl-16">
        {/* Contenuto dinamico in base alla width della schermata */}
        <Outlet />

        {/* BottomNav per mobile */}
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
};

export default LayoutWrapper;

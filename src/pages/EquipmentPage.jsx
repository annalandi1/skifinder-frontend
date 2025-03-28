import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import "../App.css";
import EquipmentSwipe from "../components/EquipmentSwipe";
import EquipmentGrid from "../components/EquipmentGrid";
import SideMenu from "../components/SideMenu";

const EquipmentPage = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [viewMode, setViewMode] = useState("tinder");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) setViewMode("row"); // forza modalità row su desktop
    };

    const fetchEquipment = async () => {
      try {
        const res = await API.get("/equipment"); // pubblico per tutti
        setEquipmentList(res.data);
      } catch (err) {
        console.error("❌ Errore nel caricamento delle attrezzature", err);
      }
    };

    fetchEquipment();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid">
      {/* Contenuto principale */}
      <div className="col-12 col-md-9 col-lg-10 mt-2 mb-5">
        {!isDesktop && (
          <div className="form-check form-switch mt-3 mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={viewMode === "row"}
              onChange={() =>
                setViewMode(viewMode === "tinder" ? "row" : "tinder")
              }
            />
            <label className="form-check-label">
              {viewMode === "tinder" ? "Modalità Tinder" : "Modalità Lista"}
            </label>
          </div>
        )}

        {viewMode === "row" ? (
          <EquipmentGrid equipmentList={equipmentList} />
        ) : (
          <EquipmentSwipe equipmentList={equipmentList} />
        )}
      </div>
    </div>
  );
};

export default EquipmentPage;

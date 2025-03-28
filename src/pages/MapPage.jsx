import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API from "../api/axiosConfig";

const MapPage = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initMap = L.map("map").setView([46.0667, 11.1167], 10);
    setMap(initMap);

    L.tileLayer(
      "https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=73ae30d2f4064b05ab87dac05b9a39ca",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }
    ).addTo(initMap);

    return () => initMap.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    const fetchEquipment = async () => {
      try {
        const res = await API.get("/equipment");
        const bounds = [];

        res.data.forEach((equipment) => {
          console.log("📍 Equipment:", equipment);
          const loc = equipment.location;
          if (loc?.latitude && loc?.longitude) {
            const marker = L.marker([loc.latitude, loc.longitude]).addTo(map);
            marker.bindPopup(
              `<b>${equipment.name}</b><br>${equipment.description}`
            );
            bounds.push([loc.latitude, loc.longitude]);
          }
        });

        if (bounds.length) {
          map.fitBounds(bounds);
        }
      } catch (err) {
        console.error("❌ Errore nel recupero attrezzature:", err);
      }
    };

    fetchEquipment();
  }, [map]);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Mappa attrezzature</h1>
      <div
        id="map"
        className="w-100"
        style={{
          height: "70vh",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      ></div>
    </div>
  );
};

export default MapPage;

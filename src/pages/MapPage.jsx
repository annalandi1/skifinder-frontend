import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  useEffect(() => {
    const map = L.map("map").setView([46.0667, 11.1167], 10);

    L.tileLayer(
      "https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=YOUR_GEOAPIFY_API_KEY",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }
    ).addTo(map);

    const marker = L.marker([46.0667, 11.1167]).addTo(map);
    marker.bindPopup("<b>Ciao!</b><br />Qui un'attrezzatura.").openPopup();

    return () => map.remove();
  }, []);

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

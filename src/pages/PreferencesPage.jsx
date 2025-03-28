import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import EquipmentDetailModal from "../components/EquipmentDetailModal";

const PreferencePage = () => {
  const [preferences, setPreferences] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    API.get("/preference/user")
      .then((res) => setPreferences(res.data))
      .catch((err) => console.error("Errore nel caricamento preferiti", err));
  }, []);

  const handleRemovePreference = async (equipmentId) => {
    try {
      await API.delete("/preference", { params: { equipmentId } });
      setPreferences((prev) =>
        prev.filter((pref) => pref.equipment.id !== equipmentId)
      );
    } catch (err) {
      console.error("Errore nella rimozione dai preferiti", err);
    }
  };

  const openDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const closeDetails = () => {
    setSelectedEquipment(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attrezzature Preferite</h2>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-3">
        {preferences.map((pref) => (
          <div className="col" key={pref.id}>
            <div className="card h-100 shadow-sm position-relative">
              {/* Cuoricino in alto a destra */}
              <FontAwesomeIcon
                icon={faHeart}
                className="position-absolute text-danger"
                style={{
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleRemovePreference(pref.equipment.id)}
              />

              <img
                src={
                  pref.equipment.imagePaths?.[0] ||
                  "https://placehold.co/600x300"
                }
                alt={pref.equipment.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{pref.equipment.name}</h5>
                  <p className="card-text">{pref.equipment.description}</p>
                </div>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => openDetails(pref.equipment)}
                >
                  Dettagli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default PreferencePage;

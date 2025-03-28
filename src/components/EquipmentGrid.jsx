import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import API from "../api/axiosConfig";
import EquipmentDetailModal from "../components/EquipmentDetailModal";

const EquipmentGrid = ({ equipmentList }) => {
  const [favourites, setFavourites] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null); // 👈 Per il modal

  useEffect(() => {
    API.get("/preference/user")
      .then((res) => setFavourites(res.data.map((p) => p.equipment.id)))
      .catch((err) => console.error("❌ Errore nel recupero preferiti", err));
  }, []);

  const handleToggleFavourite = async (equipmentId) => {
    const isFavourite = favourites.includes(equipmentId);
    setClickedId(equipmentId);

    try {
      if (isFavourite) {
        await API.delete(`/preference?equipmentId=${equipmentId}`);
        setFavourites((prev) => prev.filter((id) => id !== equipmentId));
      } else {
        await API.post(`/preference?equipmentId=${equipmentId}`);
        setFavourites((prev) => [...prev, equipmentId]);
      }
    } catch (err) {
      console.error("❌ Errore nella modifica preferenza", err);
    } finally {
      setTimeout(() => setClickedId(null), 200);
    }
  };

  return (
    <>
      <div className="row g-3">
        {equipmentList.map((equipment) => (
          <div className="col-12 col-md-6" key={equipment.id}>
            <div className="card h-100 shadow-sm position-relative">
              <img
                src={
                  equipment.imagePaths?.[0] || "https://placehold.co/600x300"
                }
                alt={equipment.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{equipment.name}</h5>
                  <FontAwesomeIcon
                    icon={
                      favourites.includes(equipment.id)
                        ? filledHeart
                        : emptyHeart
                    }
                    className={`heart-icon text-danger ${
                      clickedId === equipment.id ? "clicked" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggleFavourite(equipment.id)}
                  />
                </div>
                <p className="card-text">{equipment.description}</p>
                <p className="card-text">
                  <strong>Taglia:</strong> {equipment.size}
                </p>
                <p className="card-text">
                  <strong>Tipo:</strong> {equipment.type}
                </p>
                <p className="card-text">
                  <strong>Prezzo:</strong> {equipment.price}€/giorno
                </p>

                <button
                  className="btn btn-outline-primary mt-2 w-100"
                  onClick={() => setSelectedEquipment(equipment)}
                >
                  Dettagli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dettaglio in sovrapposizione */}
      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </>
  );
};

export default EquipmentGrid;

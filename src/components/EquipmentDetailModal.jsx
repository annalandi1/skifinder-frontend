import React, { useState } from "react";
import "../App.css";
import BookingModal from "./BookingModal";

const EquipmentDetailModal = ({ equipment, onClose }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!equipment) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
        style={{ zIndex: 1050 }}
      >
        <div className="card p-3" style={{ maxWidth: "600px", width: "90vw" }}>
          <button
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={onClose}
          ></button>
          {equipment.imagePaths?.[0] && (
            <img
              src={equipment.imagePaths[0]}
              alt={equipment.name}
              className="img-fluid mb-3"
            />
          )}
          <h4>{equipment.name}</h4>
          <p>{equipment.description}</p>
          <p>
            <strong>Prezzo:</strong> {equipment.price}€/giorno
          </p>
          <p>
            <strong>Taglia:</strong> {equipment.size}
          </p>
          <p>
            <strong>Tipo:</strong> {equipment.type}
          </p>
          <p>
            <strong>Disponibilità:</strong>{" "}
            {equipment.isAvailable ? "Disponibile" : "Non disponibile"}
          </p>
          <p>
            <strong>Indirizzo:</strong> {equipment.location?.address}
          </p>
          <button
            className="btn btn-success mt-3"
            onClick={() => setShowBookingModal(true)}
          >
            Prenota
          </button>
        </div>
      </div>

      {/* Passiamo direttamente l'oggetto equipment */}
      {showBookingModal && (
        <BookingModal
          equipment={equipment}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
};

export default EquipmentDetailModal;

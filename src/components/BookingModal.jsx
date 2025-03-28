import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import API from "../api/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faEuroSign,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ equipment, onClose }) => {
  const [selectedRange, setSelectedRange] = useState();
  const [existingBookings, setExistingBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get(`/bookings/equipment/${equipment.id}`);
        setExistingBookings(res.data);
      } catch (err) {
        console.error("Errore nel caricamento delle date prenotate", err);
      }
    };
    if (equipment?.id) fetchBookings();
  }, [equipment]);

  const isDateBooked = (date) => {
    return existingBookings.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return date >= start && date <= end;
    });
  };

  const modifiers = {
    booked: isDateBooked,
  };

  const modifiersStyles = {
    booked: { backgroundColor: "#facc15", color: "white" },
  };

  const getTotalDays = () => {
    if (!selectedRange?.from || !selectedRange?.to) return 0;
    return (
      Math.round(
        (selectedRange.to - selectedRange.from) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  const totalPrice = getTotalDays() * equipment.price;

  const handleBooking = async () => {
    setLoading(true);
    try {
      await API.post("/bookings", null, {
        params: {
          equipmentId: equipment.id,
          startDate: selectedRange.from.toISOString().split("T")[0],
          endDate: selectedRange.to.toISOString().split("T")[0],
        },
      });
      setSuccessMessage("Prenotazione effettuata con successo!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Errore nella prenotazione", err);
      setSuccessMessage("❌ Errore nella prenotazione. Riprova.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="card p-4 shadow overflow-auto"
        style={{
          maxWidth: "600px",
          width: "90vw",
          maxHeight: "95vh",
          position: "relative",
        }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-2"
          onClick={onClose}
        ></button>

        <h5 className="mb-3">Prenota: {equipment.name}</h5>

        <div className="mb-3">
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
        </div>

        <h6>Seleziona le date per la prenotazione:</h6>
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={setSelectedRange}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />

        {selectedRange?.from && selectedRange?.to && (
          <div className="mt-4 border-top pt-3">
            <h6 className="mb-3">📝 Riepilogo Prenotazione</h6>

            <p>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="me-2 text-primary"
              />
              <strong>Dal:</strong> {selectedRange.from.toLocaleDateString()}{" "}
              <strong>al:</strong> {selectedRange.to.toLocaleDateString()}
            </p>

            <p>
              <FontAwesomeIcon icon={faClock} className="me-2 text-warning" />
              <strong>Giorni:</strong> {getTotalDays()}
            </p>

            <p>
              <FontAwesomeIcon
                icon={faEuroSign}
                className="me-2 text-success"
              />
              <strong>Totale:</strong> {totalPrice.toFixed(2)}€
            </p>

            <p className="text-muted">
              <FontAwesomeIcon icon={faTag} className="me-2" />
              {equipment.price}€/giorno
            </p>
          </div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Chiudi
          </button>
          <button
            className="btn btn-primary"
            disabled={!selectedRange?.from || !selectedRange?.to || loading}
            onClick={handleBooking}
          >
            {loading ? "Prenotazione in corso..." : "Prenota"}
          </button>
        </div>

        {successMessage && (
          <div
            className="alert alert-success position-absolute top-0 start-50 translate-middle-x mt-2 w-75 text-center"
            role="alert"
            style={{ zIndex: 1060 }}
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;

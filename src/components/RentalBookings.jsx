import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const RentalBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/bookings/rental")
      .then((res) => setBookings(res.data))
      .catch((err) =>
        setError("Errore nel caricamento delle prenotazioni ricevute", err)
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Caricamento prenotazioni...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h4>Prenotazioni ricevute</h4>
      {bookings.length === 0 ? (
        <p>Nessuna prenotazione ricevuta.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li key={booking.id} className="list-group-item">
              <strong>{booking.user?.username}</strong> ha prenotato{" "}
              <strong>{booking.equipment?.name}</strong>
              <br />
              Dal{" "}
              <strong>
                {new Date(booking.startDate).toLocaleDateString()}
              </strong>{" "}
              al{" "}
              <strong>{new Date(booking.endDate).toLocaleDateString()}</strong>
              <br />
              Stato: <strong>{booking.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalBookings;

import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const ClientBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/bookings/user")
      .then((res) => setBookings(res.data))
      .catch((err) =>
        setError("Errore nel caricamento delle prenotazioni effettuate", err)
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Caricamento prenotazioni...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h4>Prenotazioni effettuate</h4>
      {bookings.length === 0 ? (
        <p>Nessuna prenotazione effettuata.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li key={booking.id} className="list-group-item">
              Hai prenotato <strong>{booking.equipment?.name}</strong> da{" "}
              <strong>
                {booking.equipment?.owner?.username || "noleggiatore"}
              </strong>
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

export default ClientBookings;

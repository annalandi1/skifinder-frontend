import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import ProfileCard from "../components/ProfileCard"; // Importa il nuovo componente
import EquipmentUpload from "../components/EquipmentUpload"; // Importa il componente per il caricamento delle attrezzature
import RentalBookings from "../components/RentalBookings";
import ClientBookings from "../components/ClientBookings";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [equipmentList, setEquipmentList] = useState([]); // Stato per le attrezzature
  const [showClientBookings, setShowClientBookings] = useState(true);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setError("Errore nel caricamento del profilo"));

    // Carica l'elenco delle attrezzature dell'utente
    API.get(`/equipment`)
      .then((res) => setEquipmentList(res.data))
      .catch(() => setError("Errore nel caricamento delle attrezzature"));
  }, []);

  const handleEquipmentUploaded = (newEquipment) => {
    setEquipmentList([...equipmentList, newEquipment]);
  };

  if (!user) return <p>Caricamento...</p>;

  return (
    <div className="container py-4 mb-4">
      <h1 className="h3 mb-4">Il tuo Profilo</h1>
      <div className="mb-4">
        {/* Componente per visualizzare il profilo dell'utente */}
        <ProfileCard
          user={user}
          setUser={setUser}
          error={error}
          setError={setError}
        />
      </div>
      {/* Sezione per il caricamento delle attrezzature */}
      <EquipmentUpload onEquipmentUploaded={handleEquipmentUploaded} />

      {/* Toggle solo se NOLEGGIATORE */}
      {user.role === "NOLEGGIATORE" && (
        <div className="form-check form-switch my-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showClientBookings}
            onChange={() => setShowClientBookings((prev) => !prev)}
            id="bookingToggle"
          />
          <label className="form-check-label" htmlFor="bookingToggle">
            {showClientBookings
              ? "Visualizza prenotazioni ricevute"
              : "Visualizza prenotazioni effettuate"}
          </label>
        </div>
      )}

      {/* Prenotazioni */}
      <div className="mt-4">
        {user.role === "NOLEGGIATORE" ? (
          showClientBookings ? (
            <ClientBookings emptyMessage="Nessuna attrezzatura noleggiata" />
          ) : (
            <RentalBookings emptyMessage="Nessuna attrezzatura prenotata" />
          )
        ) : (
          <ClientBookings emptyMessage="Nessuna attrezzatura noleggiata" />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

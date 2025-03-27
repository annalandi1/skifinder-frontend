import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import ProfileCard from "../components/ProfileCard"; // Importa il nuovo componente
import EquipmentUpload from "../components/EquipmentUpload"; // Importa il componente per il caricamento delle attrezzature

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [equipmentList, setEquipmentList] = useState([]); // Stato per le attrezzature

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
    <div className="container py-4">
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

      {/* Sezione per visualizzare le attrezzature caricate */}
      <div className="mt-4 mb-5 mb-md-1">
        <h3>Le tue attrezzature</h3>
        <ul className="list-group">
          {equipmentList.map((equipment) => (
            <li className="list-group-item" key={equipment.id}>
              <strong>{equipment.name}</strong> - {equipment.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import axios from "axios"; // Aggiungi axios per fare le richieste a Geoapify

const EquipmentUpload = ({ onEquipmentUploaded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [location, setLocation] = useState(""); // Manteniamo la location
  const [locationSuggestions, setLocationSuggestions] = useState([]); // Per memorizzare i suggerimenti
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);

  const geoapifyApiKey = "73ae30d2f4064b05ab87dac05b9a39ca";

  useEffect(() => {
    // Recupera le attrezzature caricate dall'utente noleggiatore
    API.get("/equipment/owned")
      .then((response) => {
        setEquipmentList(response.data);
      })
      .catch((err) => {
        setError("Errore nel caricamento delle attrezzature", err);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLocationChange = async (e) => {
    const query = e.target.value;
    setLocation(query);

    // Fai la richiesta all'API di Geoapify per l'autocomplete
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${geoapifyApiKey}`
        );
        setLocationSuggestions(response.data.features); // Memorizza i suggerimenti
      } catch (err) {
        console.error("Errore durante la ricerca della località", err);
      }
    } else {
      setLocationSuggestions([]); // Pulisci i suggerimenti quando la query è troppo corta
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    // Imposta la location selezionata e rimuove i suggerimenti
    setLocation(selectedLocation.properties.formatted);
    setLocationSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("type", type);
    formData.append("isAvailable", isAvailable);
    formData.append("location", location);

    try {
      const response = await API.post("/equipment/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Aggiungi la nuova attrezzatura alla lista
      setEquipmentList([response.data, ...equipmentList]);

      // Informa il componente padre che l'attrezzatura è stata caricata
      if (onEquipmentUploaded) {
        onEquipmentUploaded(response.data);
      }

      // Reset dei campi del form
      setName("");
      setDescription("");
      setPrice("");
      setSize("");
      setType("");
      setLocation("");
      setFile(null);
    } catch (err) {
      setError("Errore nel caricamento dell'attrezzatura", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3>Carica attrezzatura</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nome"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Descrizione"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-10">
              <input
                type="number"
                placeholder="Prezzo"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="1" // Imposta il minimo a 1
                required
              />
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <span>€/ day</span>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Taglia"
            className="form-control"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Tipo"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <label className="ms-2">Disponibile</label>
        </div>
        {/* Location input with autocomplete */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Indirizzo"
            className="form-control"
            value={location}
            onChange={handleLocationChange} // Chiamato ad ogni modifica
            required
          />
          <ul className="list-group mt-2">
            {locationSuggestions.map((suggestion) => (
              <li
                key={suggestion.properties.place_id}
                className="list-group-item"
                onClick={() => handleLocationSelect(suggestion)}
              >
                {suggestion.properties.formatted}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Caricamento..." : "Carica attrezzatura"}
        </button>
      </form>

      {error && <div className="text-danger mt-2">{error}</div>}

      <h4 className="mt-4">Attrezzature caricate</h4>
      <div className="list-group">
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div key={equipment.id} className="list-group-item">
              <h5>{equipment.name}</h5>
              {equipment.imagePaths && equipment.imagePaths.length > 0 && (
                <img
                  src={equipment.imagePaths[0]}
                  alt={`Foto di ${equipment.name}`}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <p>{equipment.description}</p>
              <p>
                <strong>Prezzo:</strong> {equipment.price}€
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
          ))
        ) : (
          <p>Nessuna attrezzatura caricata.</p>
        )}
      </div>
    </div>
  );
};

export default EquipmentUpload;

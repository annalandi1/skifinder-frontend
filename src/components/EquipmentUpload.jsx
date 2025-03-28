import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

const EquipmentUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [editingEquipment, setEditingEquipment] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    API.get("/equipment/owned")
      .then((response) => {
        setEquipmentList(response.data);
      })
      .catch((err) => {
        setError("Errore nel caricamento delle attrezzature", err);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    formData.append("location", location);

    try {
      if (editingEquipment) {
        await API.put(`/equipment/${editingEquipment.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/equipment/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchEquipment();
      resetForm();
    } catch (err) {
      setError("Errore nel caricamento dell'attrezzatura", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSize("");
    setType("");
    setLocation("");
    setFile(null);
    setEditingEquipment(null);
  };

  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
    setName(equipment.name);
    setDescription(equipment.description);
    setPrice(equipment.price);
    setSize(equipment.size);
    setType(equipment.type);
    setLocation(equipment.location?.address || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa attrezzatura?")) {
      await API.delete(`/equipment/${id}`);
      fetchEquipment();
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3>
        {editingEquipment ? "Modifica attrezzatura" : "Carica attrezzatura"}
      </h3>
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
                min="1"
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
            type="text"
            placeholder="Indirizzo"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Caricamento..."
            : editingEquipment
            ? "Salva modifiche"
            : "Carica attrezzatura"}
        </button>
      </form>

      {error && <div className="text-danger mt-2">{error}</div>}

      <h4 className="mt-4">Attrezzature caricate</h4>
      <div className="list-group">
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div
              key={equipment.id}
              className="list-group-item position-relative"
            >
              <div className="position-absolute top-0 end-0 mt-2 me-2 d-flex">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => handleEdit(equipment)}
                  title="Modifica"
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(equipment.id)}
                  title="Elimina"
                >
                  🗑️
                </button>
              </div>
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

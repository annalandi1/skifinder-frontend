import React, { useState } from "react";
import { Pencil } from "lucide-react";
import API from "../api/axiosConfig";

const ProfileCard = ({ user, setUser, error, setError }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await API.put("/auth/me/photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await API.put("/auth/me", { ...user, name });
      const updated = await API.get("/auth/me");
      setUser(updated.data);
      setFile(null);
      setEditing(false);
    } catch (err) {
      console.error("Errore durante il salvataggio:", err);
      setError("Errore nel salvataggio");
    } finally {
      setLoading(false);
    }
  };

  const photoUrl =
    user.photo && user.photo.startsWith("/uploads")
      ? `http://localhost:8080${user.photo}?t=${Date.now()}`
      : user.photo || "https://via.placeholder.com/80";

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex align-items-center mb-4">
        <img
          src={photoUrl}
          alt="Foto profilo"
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div className="ms-3">
          <p className="h5">{user.username}</p>
          <p className="text-muted">{user.email}</p>
        </div>
        {!editing && (
          <button
            className="btn btn-link"
            onClick={() => setEditing(true)}
            title="Modifica profilo"
          >
            <Pencil size={20} />
          </button>
        )}
      </div>

      {editing ? (
        <>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Modifica nome"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handlePhotoChange}
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvataggio..." : "Salva modifiche"}
          </button>
          <button
            className="btn btn-link w-100 mt-2 text-danger"
            onClick={() => setEditing(false)}
          >
            Annulla
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Cognome:</strong> {user.surname}
          </p>
          <p>
            <strong>Telefono:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Ruolo:</strong> {user.role}
          </p>
        </>
      )}

      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default ProfileCard;

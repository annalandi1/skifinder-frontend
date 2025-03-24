import React from "react";

const ProfilePage = () => {
  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Il tuo Profilo</h1>

      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-secondary"
            style={{ width: "80px", height: "80px" }}
          ></div>
          <div className="ms-3">
            <p className="h5">[Nome utente]</p>
            <p className="text-muted">[Email]</p>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Modifica nome"
            className="form-control"
            disabled
          />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" disabled />
        </div>
        <button className="btn btn-secondary w-100" disabled>
          Salva modifiche
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";

const PreferencesPage = () => {
  const fakePreferences = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Attrezzatura ${i + 1}`,
  }));

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Le tue Preferenze</h1>

      <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {fakePreferences.map((item) => (
          <div key={item.id} className="col">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <div
                  className="bg-secondary"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                ></div>
                <p className="h5 mt-2">{item.name}</p>
                <button className="btn btn-outline-danger mt-2">
                  ❤️ Rimuovi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-block d-md-none text-center text-muted mt-4">
        <p>Swipe a sinistra per rimuovere le preferenze (coming soon!)</p>
      </div>
    </div>
  );
};

export default PreferencesPage;

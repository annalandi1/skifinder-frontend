import { NavLink } from "react-router-dom";
import { Home, Heart, MapPin, User } from "lucide-react";

function SideMenu() {
  return (
    <nav className="d-none d-md-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm border-bottom">
      {/* LOGO a sinistra */}
      <div className="fw-bold text-primary fs-5">SkiFinder</div>

      {/* LINK a destra */}
      <div className="d-flex gap-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 nav-link ${
              isActive ? "text-primary fw-bold" : "text-dark"
            }`
          }
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/preferences"
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 nav-link ${
              isActive ? "text-primary fw-bold" : "text-dark"
            }`
          }
        >
          <Heart size={18} />
          <span>Preferiti</span>
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 nav-link ${
              isActive ? "text-primary fw-bold" : "text-dark"
            }`
          }
        >
          <MapPin size={18} />
          <span>Mappa</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 nav-link ${
              isActive ? "text-primary fw-bold" : "text-dark"
            }`
          }
        >
          <User size={18} />
          <span>Profilo</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default SideMenu;

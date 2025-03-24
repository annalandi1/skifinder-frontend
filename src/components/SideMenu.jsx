import { NavLink } from "react-router-dom";
import { Home, Heart, MapPin, User } from "lucide-react";

function SideMenu() {
  return (
    <aside className="d-none d-md-block position-fixed top-0 left-0 bg-white shadow-lg p-4 w-250px h-100vh">
      <NavLink to="/home" className="d-flex align-items-center gap-2 py-2">
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/preferences"
        className="d-flex align-items-center gap-2 py-2"
      >
        <Heart size={20} />
        <span>Preferiti</span>
      </NavLink>
      <NavLink to="/map" className="d-flex align-items-center gap-2 py-2">
        <MapPin size={20} />
        <span>Mappa</span>
      </NavLink>
      <NavLink to="/profile" className="d-flex align-items-center gap-2 py-2">
        <User size={20} />
        <span>Profilo</span>
      </NavLink>
    </aside>
  );
}

export default SideMenu;

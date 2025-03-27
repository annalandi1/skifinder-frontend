import { NavLink } from "react-router-dom";
import { Home, Heart, MapPin, User } from "lucide-react";

function BottomNav() {
  return (
    <nav className="fixed-bottom bg-white shadow-sm d-flex justify-content-around py-2 w-100 z-50">
      <NavLink to="/home" className="d-flex flex-column align-items-center">
        <Home size={24} />
        <span className="small">Home</span>
      </NavLink>
      <NavLink
        to="/preferences"
        className="d-flex flex-column align-items-center"
      >
        <Heart size={24} />
        <span className="small">Preferiti</span>
      </NavLink>
      <NavLink to="/map" className="d-flex flex-column align-items-center">
        <MapPin size={24} />
        <span className="small">Mappa</span>
      </NavLink>
      <NavLink to="/profile" className="d-flex flex-column align-items-center">
        <User size={24} />
        <span className="small">Profilo</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;

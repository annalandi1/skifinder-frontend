import { NavLink } from "react-router-dom";
import { Home, Heart, MapPin, User } from "lucide-react";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 md:hidden z-50">
      <NavLink to="/home" className="flex flex-col items-center">
        <Home size={24} />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink to="/preferences" className="flex flex-col items-center">
        <Heart size={24} />
        <span className="text-xs">Preferiti</span>
      </NavLink>
      <NavLink to="/map" className="flex flex-col items-center">
        <MapPin size={24} />
        <span className="text-xs">Mappa</span>
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center">
        <User size={24} />
        <span className="text-xs">Profilo</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;

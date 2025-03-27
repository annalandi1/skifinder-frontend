import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EquipmentPage from "./pages/EquipmentPage";
import PreferencesPage from "./pages/PreferencesPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import AuthPage from "./pages/AuthPage";
import LayoutWrapper from "./layout/LayoutWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<LayoutWrapper />}>
        <Route path="/home" element={<EquipmentPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;

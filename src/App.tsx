import { Routes, Route } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";
import { AdminPlayersPage } from "./pages/AdminPlayersPage";
import { AdminPlayerPage } from "./pages/AdminPlayerPage";
import { TestFunctionsPage } from "./pages/TestFunctionsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/p/:tagId" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/players" element={<AdminPlayersPage />} />
      <Route path="/admin/:tagId" element={<AdminPlayerPage />} />
      <Route path="/test-functions" element={<TestFunctionsPage />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="w-full h-[100vh]">
      <Routes path="/">
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<h1>register page</h1>} />
        <Route path="/adminpage/*" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;

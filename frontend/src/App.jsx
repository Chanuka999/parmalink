import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="w-full h-[100vh] bg-red-300">
      <Routes path="/">
        <Route path="/" element={<h1>home page</h1>} />
        <Route path="/register" element={<h1>register page</h1>} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;

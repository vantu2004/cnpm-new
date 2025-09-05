import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">🏪 Mini Shop</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c/:slug" element={<Category />} />
      </Routes>
    </div>
  );
}

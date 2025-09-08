import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import SearchPage from "./pages/SearchPage.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">🏪 Mini Shop v2</Link>
        <form action="/search" style={{ marginLeft: "auto" }}>
          <input name="q" placeholder="Tìm sản phẩm..." />
        </form>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c/:slug" element={<Category />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function CategoryList({ categories }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {categories.map((c) => (
        <Link
          key={c._id}
          to={`/c/${c.slug}`}
          style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
        >
          <div style={{ fontWeight: 600 }}>{c.name}</div>
          <div style={{ color: "#777", fontSize: 12 }}>{c.slug}</div>
        </Link>
      ))}
    </div>
  );
}

export default function ProductCard({ p }) {
  return (
    <div
      style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}
    >
      <img
        src={p.image}
        alt={p.name}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <div style={{ padding: 8 }}>
        <div style={{ fontWeight: 600 }}>{p.name}</div>
        <div style={{ color: "#555" }}>
          {p.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </div>
    </div>
  );
}

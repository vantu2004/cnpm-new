export default function ProductCard({ p }) {
  return (
    <div
      style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}
    >
      <img
        src={p.image}
        alt={p.name}
        style={{ width: "100%", height: 160, objectFit: "cover" }}
      />
      <div style={{ padding: 8 }}>
        <div style={{ fontWeight: 600 }}>{p.name}</div>
        <div style={{ color: "#555" }}>
          {p.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        {p.onSale && (
          <div style={{ color: "#d00", fontSize: 12 }}>
            Khuyến mãi {p.discountPercent}%
          </div>
        )}
        <div style={{ color: "#777", fontSize: 12 }}>{p.views} lượt xem</div>
      </div>
    </div>
  );
}

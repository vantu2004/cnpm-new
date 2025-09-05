import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsCursor } from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Category() {
  const { slug } = useParams();
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const sentinelRef = useRef(null);
  // lần đầu load
  useEffect(() => {
    setLoading(true);
    fetchProductsCursor({ categorySlug: slug, limit: 5 }).then((data) => {
      setItems(data.items);
      setNextCursor(data.nextCursor);
      setLoading(false);
    });
  }, [slug]);

  // observer để load tiếp khi chạm đáy
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const ob = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (first.isIntersecting && nextCursor && !isFetchingMore) {
          setIsFetchingMore(true);
          const data = await fetchProductsCursor({
            categorySlug: slug,
            limit: 5,
            after: nextCursor,
          });
          setItems((prev) => [...prev, ...data.items]);
          setNextCursor(data.nextCursor);
          setIsFetchingMore(false);
        }
      },
      { rootMargin: "200px" }
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, [nextCursor, isFetchingMore, slug]);
  return (
    <div>
      <h2>Danh mục: {slug}</h2>
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {items.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}

      {/* Sentinel để trigger load tiếp */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingMore && <p>Đang tải thêm...</p>}
      {!nextCursor && !loading && (
        <p style={{ color: "#888", marginTop: 12 }}>Đã hết sản phẩm.</p>
      )}
    </div>
  );
}

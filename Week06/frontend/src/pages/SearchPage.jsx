import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts, fetchCategories } from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [cats, setCats] = useState([]);
  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    pageSize: 12,
  });

  const q = params.get("q") || "";
  const categorySlug = params.get("categorySlug") || "";
  const priceMin = params.get("priceMin") || "";
  const priceMax = params.get("priceMax") || "";
  const onSale = params.get("onSale") || ""; // "true"|"false"|""
  const minViews = params.get("minViews") || "";
  const sort = params.get("sort") || "relevance";
  const page = Number(params.get("page") || 1);

  useEffect(() => {
    fetchCategories().then(setCats);
  }, []);
  useEffect(() => {
    searchProducts({
      q,
      categorySlug,
      priceMin,
      priceMax,
      onSale,
      minViews,
      sort,
      page,
      pageSize: 12,
    }).then(setData);
  }, [q, categorySlug, priceMin, priceMax, onSale, minViews, sort, page]);

  console.log(data);

  const setParam = (name, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value == null) next.delete(name);
    else next.set(name, value);
    next.delete("page");
    setParams(next);
  };

  return (
    <div>
      <h2>Kết quả tìm kiếm</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}
      >
        <aside
          style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
        >
          <div>
            <label>Danh mục</label>
            <select
              value={categorySlug}
              onChange={(e) => setParam("categorySlug", e.target.value)}
            >
              <option value="">-- tất cả --</option>
              {cats.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Giá tối thiểu</label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setParam("priceMin", e.target.value)}
            />
          </div>
          <div>
            <label>Giá tối đa</label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setParam("priceMax", e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={onSale === "true"}
                onChange={(e) =>
                  setParam("onSale", e.target.checked ? "true" : "")
                }
              />
              ️Khuyến mãi
            </label>
          </div>
          <div>
            <label>Lượt xem tối thiểu</label>
            <input
              type="number"
              value={minViews}
              onChange={(e) => setParam("minViews", e.target.value)}
            />
          </div>
          <div>
            <label>Sắp xếp</label>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
            >
              <option value="relevance">Phù hợp nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="priceAsc">Giá ↑</option>
              <option value="priceDesc">Giá ↓</option>
              <option value="viewsDesc">Lượt xem ↓</option>
            </select>
          </div>
        </aside>
        <main>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {data.items.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <button
              disabled={page <= 1}
              onClick={() => setParam("page", String(page - 1))}
            >
              Trang trước
            </button>
            <span>Trang {data.page}</span>
            <button
              disabled={data.page * data.pageSize >= data.total}
              onClick={() => setParam("page", String(page + 1))}
            >
              Trang sau
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

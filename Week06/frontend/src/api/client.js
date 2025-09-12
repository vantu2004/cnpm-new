import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function fetchCategories() {
  const { data } = await api.get("/categories");
  return data.categories;
}

export async function fetchProductsCursor({ categorySlug, limit = 5, after }) {
  const params = { categorySlug, limit };
  if (after) params.after = after;
  const { data } = await api.get("/products", { params });
  return data; // { items, nextCursor }
}

export async function searchProducts(params) {
  const { data } = await api.get("/search/products", { params });
  return data; // { items, total, page, pageSize }
}

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export async function fetchCategories() {
  const { data } = await api.get("/categories");
  return data.categories;
}

export async function fetchProductsCursor({ categorySlug, limit = 5, after }) {
  const params = { categorySlug, limit };
  if (after) params.after = after;
  const { data } = await api.get("/products", { params });
  return data; // {success, items, nextCursor}
}

// Optional: pagination
export async function fetchProductsPaged({
  categoryId,
  page = 1,
  pageSize = 5,
}) {
  const params = { categoryId, page, pageSize };
  const { data } = await api.get("/products/paged", { params });
  return data; // { items, total, ... }
}

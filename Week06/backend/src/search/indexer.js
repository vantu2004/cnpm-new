import { es, ES_INDEX, ensureIndex } from "./es.js";

export async function indexProductDoc(p) {
  await ensureIndex();
  const doc = {
    name: p.name,
    description: p.description || "",
    categoryId: String(p.categoryId),
    categorySlug: p.categorySlug,
    price: p.price,
    onSale: !!p.onSale,
    discountPercent: p.discountPercent || 0,
    views: p.views ?? 0,
    createdAt: p.createdAt,
  };
  await es.index({
    index: ES_INDEX,
    id: String(p._id),
    document: doc,
    refresh: "wait_for",
  });
}

export async function deleteProductDoc(id) {
  await es.delete({ index: ES_INDEX, id: String(id) }).catch(() => {});
}

export async function bulkReindex(products) {
  await ensureIndex();
  const ops = [];
  for (const p of products) {
    ops.push({ index: { _index: ES_INDEX, _id: String(p._id) } });
    ops.push({
      name: p.name,
      description: p.description || "",
      categoryId: String(p.categoryId),
      categorySlug: p.categorySlug,
      price: p.price,
      onSale: !!p.onSale,
      discountPercent: p.discountPercent || 0,
      views: p.views ?? 0,
      createdAt: p.createdAt,
    });
  }
  if (ops.length) await es.bulk({ refresh: "wait_for", operations: ops });
}

import dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

export const ES_INDEX = process.env.ES_INDEX || "mini_products";

export const es = new Client({
  node: process.env.ES_NODE || "http://localhost:9200",
  auth: process.env.ES_USERNAME
    ? { username: process.env.ES_USERNAME, password: process.env.ES_PASSWORD }
    : undefined,
});

export async function ensureIndex() {
  const exists = await es.indices.exists({ index: ES_INDEX });
  if (!exists) {
    await es.indices.create({
      index: ES_INDEX,
      settings: { index: { number_of_shards: 1, number_of_replicas: 0 } },
      mappings: {
        properties: {
          name: { type: "text", fields: { keyword: { type: "keyword" } } },
          description: { type: "text" },
          categoryId: { type: "keyword" },
          categorySlug: { type: "keyword" },
          price: { type: "double" },
          onSale: { type: "boolean" },
          discountPercent: { type: "double" },
          views: { type: "integer" },
          createdAt: { type: "date" },
        },
      },
    });
    console.log("✅ ES index created:", ES_INDEX);
  }
}

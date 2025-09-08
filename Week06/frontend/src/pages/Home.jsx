import { useEffect, useState } from "react";
import { fetchCategories } from "../api/client.js";
import CategoryList from "../components/CategoryList.jsx";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCats(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Đang tải danh mục...</p>;
  return (
    <div>
      <h2>Danh mục</h2>
      <CategoryList categories={cats} />
    </div>
  );
}

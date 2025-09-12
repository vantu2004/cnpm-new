import React, { useState } from "react";
import {
  CartProvider,
  useCart,
  Button,
  Input,
  Card,
  Modal,
} from "cart-library-vantu";

const ProductList = () => {
  const { cart, addItem, removeItem, updateItem } = useCart();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!name) return;
    addItem({ id: Date.now(), name });
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Giỏ hàng demo</h2>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên sản phẩm..."
      />
      <Button onClick={handleAdd}>Thêm sản phẩm</Button>

      {cart.map((item) => (
        <Card key={item.id} title={item.name}>
          <Button onClick={() => removeItem(item.id)}>Xóa</Button>
          <Button
            onClick={() => updateItem(item.id, { name: item.name + " (sửa)" })}
          >
            Sửa
          </Button>
        </Card>
      ))}

      <Button onClick={() => setOpen(true)}>Xem giỏ</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>Giỏ hàng hiện tại</h3>
        {cart.length === 0 ? (
          <p>Chưa có sản phẩm nào</p>
        ) : (
          cart.map((i) => <p key={i.id}>{i.name}</p>)
        )}
      </Modal>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <ProductList />
    </CartProvider>
  );
}

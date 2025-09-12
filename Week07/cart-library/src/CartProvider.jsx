import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => setCart((prev) => [...prev, item]);
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id, newData) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...newData } : i))
    );

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

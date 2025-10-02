// context/CartContext.js
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToData = (product, selectedSize = null) => {
    let updatecart = [...cartData];

    const existingItemIndex = updatecart.findIndex(
      item =>
        item.product_id === product.id &&
        item.size?.sizes_id === selectedSize?.sizes_id
    );

    if (existingItemIndex > -1) {
      updatecart[existingItemIndex].qty += 1;
    } else {
      updatecart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
        product_id: product.id,
        size: selectedSize,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url
      });
    }

    setCartData(updatecart);
    localStorage.setItem("cart", JSON.stringify(updatecart));
  };

  const updateQty = (id, newQty) => {
    const updatedCart = cartData.map(item =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartData.filter(item => item.id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subTotal = () => {
    let subTotal = 0;
    cartData.map(item => {
      subTotal += item.qty * item.price;
    });
    return subTotal;
  };

  const shipping = () => {
    const totalAmount = subTotal();
    return totalAmount > 500 ? 0 : 50;
  };

  const GrandTotal = () => {
    return subTotal() + shipping();
  };

  return (
    <CartContext.Provider
      value={{
        addToData,
        cartData,
        updateQty,
        removeFromCart,
        subTotal,
        shipping,
        GrandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

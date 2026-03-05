"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [cartData, setCartData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const generateOrderId = () => {
    const id = "ECO" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderId(id);
    return id;
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        setShippingAddress,
        cartData,
        setCartData,
        orderId,
        generateOrderId,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
}

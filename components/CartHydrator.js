"use client";

import { useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";

// This thin client component bridges SSR-fetched data → client context
export default function CartHydrator({ cartData }) {
  const { setCartData } = useCheckout();

  useEffect(() => {
    setCartData(cartData);
  }, [cartData, setCartData]);

  return null;
}

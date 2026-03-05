export async function GET() {
  const cartData = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://via.placeholder.com/150/d4e8d1/2C5F2E?text=🎋",
        description: "Biodegradable, BPA-free bristles",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://via.placeholder.com/150/e8d9c4/6B4C3B?text=🌿",
        description: "Set of 5, organic cotton mesh",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };

  return Response.json(cartData);
}

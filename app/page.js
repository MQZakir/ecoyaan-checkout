import Link from "next/link";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import CartItem from "@/components/CartItem";
import CartHydrator from "@/components/CartHydrator";

async function getCartData() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "",
        description: "Biodegradable, BPA-free bristles",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "",
        description: "Set of 5, organic cotton mesh",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };
}

export default async function CartPage() {
  const cartData = await getCartData();

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cartData.shipping_fee - cartData.discount_applied;
  const itemCount = cartData.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hydrate context with server-fetched data */}
      <CartHydrator cartData={cartData} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <StepIndicator currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Cart items — left column */}
          <div className="lg:col-span-3">
            <div className="animate-fade-up">
              <h1 className="font-display text-3xl sm:text-4xl text-ink mb-1 leading-tight">
                Your Cart
              </h1>
              <p className="font-body text-stone text-sm mb-6">
                {itemCount} item{itemCount !== 1 ? "s" : ""} — let&apos;s make a difference
              </p>
            </div>

            <div className="bg-white/60 rounded-2xl border border-stone/15 px-5 animate-fade-up-delay-1">
              {cartData.cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>

            {/* Eco badge */}
            <div className="mt-4 flex items-start gap-3 bg-forest/8 rounded-xl p-4 border border-forest/15 animate-fade-up-delay-2">
              <span className="text-lg mt-0.5">🌱</span>
              <div>
                <p className="font-body text-sm font-semibold text-forest">
                  You&apos;re making a sustainable choice
                </p>
                <p className="font-body text-xs text-forest-muted mt-0.5">
                  Every purchase plants a tree and reduces plastic in our oceans.
                </p>
              </div>
            </div>
          </div>

          {/* Order summary — right column */}
          <div className="lg:col-span-2 animate-fade-up-delay-2">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white/60 rounded-2xl border border-stone/15 p-5">
                <h2 className="font-display text-xl text-ink mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  {cartData.cartItems.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between items-start gap-2"
                    >
                      <span className="font-body text-sm text-ink-soft leading-snug flex-1">
                        {item.product_name}{" "}
                        <span className="text-stone text-xs">×{item.quantity}</span>
                      </span>
                      <span className="font-body text-sm font-medium text-ink whitespace-nowrap">
                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-stone/15">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone">Subtotal</span>
                    <span className="font-body text-sm text-ink">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone">Shipping</span>
                    <span className="font-body text-sm text-ink">
                      ₹{cartData.shipping_fee}
                    </span>
                  </div>
                  {cartData.discount_applied > 0 && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-forest">Discount</span>
                      <span className="font-body text-sm text-forest">
                        −₹{cartData.discount_applied}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-stone/15">
                    <span className="font-body font-semibold text-ink">Total</span>
                    <div className="text-right">
                      <span className="font-display text-2xl text-forest">
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                      <p className="font-body text-xs text-stone">incl. all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-4 w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-cream font-body font-semibold text-sm py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-forest/20 active:scale-[0.98]"
              >
                Proceed to Checkout
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <p className="font-body text-xs text-stone text-center mt-3 flex items-center justify-center gap-1.5">
                <span>🔒</span>
                <span>256-bit SSL secured checkout</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import Header from "@/components/Header";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { shippingAddress, cartData } = useCheckout();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const today = new Date();
  const delivery = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
  const deliveryStr = delivery.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Checkmark animation */}
        <div
          className={`w-20 h-20 rounded-full bg-forest mx-auto flex items-center justify-center mb-6 transition-all duration-700 ${
            show ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className={`transition-all duration-500 ${show ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <path
              d="M7 18L14 25L29 11"
              stroke="#F5F0E8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          className={`transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-2">
            Order Placed!
          </h1>
          <p className="font-body text-stone text-base">
            Thank you,{" "}
            <span className="text-ink font-medium">
              {shippingAddress?.fullName?.split(" ")[0] || "there"}
            </span>
            . Your order is confirmed.
          </p>
        </div>

        {/* Order details card */}
        <div
          className={`mt-8 bg-white/70 rounded-2xl border border-stone/15 p-6 text-left transition-all duration-500 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.45s" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-body text-xs text-stone uppercase tracking-wider">
                Order ID
              </p>
              <p className="font-body text-base font-semibold text-ink mt-0.5">
                #{orderId}
              </p>
            </div>
            <span className="bg-forest/10 text-forest font-body text-xs font-semibold px-3 py-1.5 rounded-full">
              Confirmed ✓
            </span>
          </div>

          <div className="border-t border-stone/15 pt-4 space-y-2.5">
            {cartData?.cartItems?.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cream-dark flex items-center justify-center text-base flex-shrink-0">
                  {item.product_id === 101 ? "🎋" : "🛍️"}
                </div>
                <span className="font-body text-sm text-ink-soft flex-1">
                  {item.product_name}
                </span>
                <span className="font-body text-xs text-stone">×{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone/15 mt-4 pt-4 flex items-start gap-3">
            <span className="text-base">📍</span>
            <div>
              <p className="font-body text-xs text-stone uppercase tracking-wider">
                Delivering to
              </p>
              <p className="font-body text-sm text-ink mt-0.5">
                {shippingAddress?.fullName}
              </p>
              <p className="font-body text-xs text-stone">
                {shippingAddress?.city && shippingAddress?.state
                  ? `${shippingAddress.city}, ${shippingAddress.state}`
                  : "—"}
              </p>
            </div>
          </div>

          <div className="border-t border-stone/15 mt-4 pt-4 flex items-start gap-3">
            <span className="text-base">🚚</span>
            <div>
              <p className="font-body text-xs text-stone uppercase tracking-wider">
                Expected Delivery
              </p>
              <p className="font-body text-sm font-medium text-forest mt-0.5">
                {deliveryStr}
              </p>
            </div>
          </div>
        </div>

        {/* Eco impact */}
        <div
          className={`mt-4 bg-forest/8 rounded-2xl border border-forest/15 p-5 text-center transition-all duration-500 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <p className="text-2xl mb-1.5">🌳</p>
          <p className="font-body text-sm font-semibold text-forest">
            1 tree will be planted in your name
          </p>
          <p className="font-body text-xs text-forest-muted mt-1">
            Your purchase offsets approximately 2.3 kg of CO₂
          </p>
        </div>

        <div
          className={`mt-7 transition-all duration-500 ${show ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.75s" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-stone hover:text-ink transition-colors underline underline-offset-4"
          >
            ← Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SuccessContent />
    </Suspense>
  );
}

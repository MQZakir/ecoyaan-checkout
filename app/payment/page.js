"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { useCheckout } from "@/context/CheckoutContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, shippingAddress, generateOrderId } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cartData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-stone mb-3">Your cart is empty.</p>
          <button
            onClick={() => router.push("/")}
            className="font-body text-sm text-forest underline"
          >
            Back to cart
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cartData.shipping_fee - cartData.discount_applied;

  const handlePay = () => {
    setIsProcessing(true);
    const id = generateOrderId();
    setTimeout(() => {
      router.push(`/success?orderId=${id}`);
    }, 2000);
  };

  const paymentOptions = [
    {
      id: "upi",
      label: "UPI",
      icon: "⚡",
      description: "PhonePe, GPay, Paytm",
    },
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: "💳",
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: "🏦",
      description: "All major banks",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: "📦",
      description: "Pay when delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <StepIndicator currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-5">
            {/* Order review */}
            <div className="animate-fade-up">
              <h1 className="font-display text-3xl sm:text-4xl text-ink mb-1 leading-tight">
                Review & Pay
              </h1>
              <p className="font-body text-stone text-sm mb-6">
                Almost there — review your order before paying
              </p>

              {/* Items recap */}
              <div className="bg-white/60 rounded-2xl border border-stone/15 p-5">
                <h2 className="font-body text-sm font-semibold text-stone uppercase tracking-wider mb-4">
                  Your Items
                </h2>
                <div className="space-y-3">
                  {cartData.cartItems.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cream-dark flex items-center justify-center text-lg flex-shrink-0">
                        {item.product_id === 101 ? "🎋" : "🛍️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-ink leading-snug truncate">
                          {item.product_name}
                        </p>
                        <p className="font-body text-xs text-stone">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-body text-sm font-semibold text-ink whitespace-nowrap">
                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white/60 rounded-2xl border border-stone/15 p-5 animate-fade-up-delay-1">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-body text-sm font-semibold text-stone uppercase tracking-wider">
                  Delivering To
                </h2>
                <button
                  onClick={() => router.push("/checkout")}
                  className="font-body text-xs text-forest hover:text-forest-light underline underline-offset-2"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">📍</span>
                <div>
                  <p className="font-body text-sm font-semibold text-ink">
                    {shippingAddress.fullName || "—"}
                  </p>
                  <p className="font-body text-sm text-ink-soft mt-0.5">
                    {shippingAddress.city && shippingAddress.state
                      ? `${shippingAddress.city}, ${shippingAddress.state} — ${shippingAddress.pinCode}`
                      : "Address not entered"}
                  </p>
                  <p className="font-body text-xs text-stone mt-1">
                    {shippingAddress.phone ? `+91 ${shippingAddress.phone}` : ""}
                    {shippingAddress.phone && shippingAddress.email ? " · " : ""}
                    {shippingAddress.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white/60 rounded-2xl border border-stone/15 p-5 animate-fade-up-delay-2">
              <h2 className="font-body text-sm font-semibold text-stone uppercase tracking-wider mb-4">
                Payment Method
              </h2>
              <div className="space-y-2">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150
                      ${
                        paymentMethod === opt.id
                          ? "border-forest bg-forest/5"
                          : "border-stone/15 hover:border-stone/30 hover:bg-white/50"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors
                        ${paymentMethod === opt.id ? "border-forest" : "border-stone/40"}`}
                    >
                      {paymentMethod === opt.id && (
                        <div className="w-2 h-2 rounded-full bg-forest m-auto mt-[2px]" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="sr-only"
                    />
                    <span className="text-lg">{opt.icon}</span>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">
                        {opt.label}
                      </p>
                      <p className="font-body text-xs text-stone">
                        {opt.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 animate-fade-up-delay-3">
              <button
                onClick={() => router.push("/checkout")}
                className="flex items-center gap-1.5 font-body text-sm text-stone hover:text-ink transition-colors py-4 px-5 rounded-2xl hover:bg-white/50"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M11 7H3M3 7L7 3M3 7l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 bg-forest hover:bg-forest-light disabled:opacity-70 disabled:cursor-not-allowed text-cream font-body font-semibold text-sm py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-forest/20 active:scale-[0.98]"
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M8 2a6 6 0 0 1 6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    Pay ₹{total.toLocaleString("en-IN")} Securely
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right column — price breakdown */}
          <div className="lg:col-span-2 animate-fade-up-delay-1">
            <div className="lg:sticky lg:top-6 bg-white/60 rounded-2xl border border-stone/15 p-5">
              <h3 className="font-display text-xl text-ink mb-4">Bill Summary</h3>
              <div className="space-y-2">
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
                  <span className="font-body font-semibold text-ink">
                    Amount to Pay
                  </span>
                  <div className="text-right">
                    <span className="font-display text-2xl text-forest">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone/15 space-y-2">
                <div className="flex items-center gap-2 text-stone">
                  <span className="text-sm">✓</span>
                  <span className="font-body text-xs">Free returns within 7 days</span>
                </div>
                <div className="flex items-center gap-2 text-stone">
                  <span className="text-sm">✓</span>
                  <span className="font-body text-xs">100% eco-certified products</span>
                </div>
                <div className="flex items-center gap-2 text-stone">
                  <span className="text-sm">✓</span>
                  <span className="font-body text-xs">Carbon-neutral delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

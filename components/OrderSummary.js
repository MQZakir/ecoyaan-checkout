"use client";

export default function OrderSummary({ cartData, compact = false }) {
  if (!cartData) return null;

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cartData.shipping_fee - cartData.discount_applied;

  return (
    <div className={compact ? "" : "bg-white/60 rounded-2xl p-5 border border-stone/15"}>
      {!compact && (
        <h3 className="font-display text-lg text-ink mb-4">Order Summary</h3>
      )}

      {!compact && (
        <div className="space-y-1 mb-4">
          {cartData.cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between items-start gap-2">
              <span className="font-body text-sm text-ink-soft leading-snug flex-1">
                {item.product_name}{" "}
                <span className="text-stone">×{item.quantity}</span>
              </span>
              <span className="font-body text-sm font-medium text-ink whitespace-nowrap">
                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}

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
            {cartData.shipping_fee === 0
              ? "Free"
              : `₹${cartData.shipping_fee}`}
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
        <div className="flex justify-between items-center pt-2 border-t border-stone/15">
          <span className="font-body font-semibold text-ink">Total</span>
          <span className="font-display text-xl text-forest">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <p className="font-body text-xs text-stone mt-3 flex items-center gap-1.5">
        <span>🔒</span>
        <span>Secure, encrypted checkout</span>
      </p>
    </div>
  );
}

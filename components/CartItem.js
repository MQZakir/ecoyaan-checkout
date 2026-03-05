"use client";

export default function CartItem({ item }) {
  const total = item.product_price * item.quantity;

  return (
    <div className="flex gap-4 py-5 border-b border-stone/15 last:border-0 animate-fade-up">
      {/* Product image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-cream-dark flex-shrink-0 overflow-hidden">
        <img
          src={`https://placehold.co/80x80/d4e8d1/2C5F2E?text=🌿`}
          alt={item.product_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl">${
              item.product_id === 101 ? "🎋" : "🛍️"
            }</div>`;
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-semibold text-ink text-sm sm:text-base leading-snug">
          {item.product_name}
        </h3>
        {item.description && (
          <p className="font-body text-xs text-stone mt-0.5">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-stone">Qty</span>
            <span className="font-body text-sm font-semibold text-ink-soft bg-cream-dark px-2.5 py-0.5 rounded-full">
              {item.quantity}
            </span>
          </div>
          <div className="text-right">
            <p className="font-body text-sm font-bold text-ink">
              ₹{total.toLocaleString("en-IN")}
            </p>
            <p className="font-body text-xs text-stone">
              ₹{item.product_price} each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

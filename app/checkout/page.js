"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

function validate(fields) {
  const errors = {};
  if (!fields.fullName.trim()) errors.fullName = "Name is required";
  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(fields.phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a valid 10-digit phone number";
  }
  if (!fields.pinCode.trim()) {
    errors.pinCode = "PIN code is required";
  } else if (!/^\d{6}$/.test(fields.pinCode)) {
    errors.pinCode = "Enter a valid 6-digit PIN code";
  }
  if (!fields.city.trim()) errors.city = "City is required";
  if (!fields.state) errors.state = "Please select a state";
  return errors;
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="font-body text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-500 mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full font-body text-sm text-ink bg-white/70 border rounded-xl px-4 py-3 transition-all duration-200
  placeholder:text-stone/50 focus:ring-2 focus:bg-white
  ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-stone/20 focus:border-forest focus:ring-forest/10"
  }`;

export default function CheckoutPage() {
  const router = useRouter();
  const { shippingAddress, setShippingAddress, cartData } = useCheckout();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    const updated = { ...shippingAddress, [field]: value };
    setShippingAddress(updated);
    if (touched[field]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(shippingAddress);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = () => {
    const allTouched = Object.keys(shippingAddress).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
    const newErrors = validate(shippingAddress);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <StepIndicator currentStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form — left column */}
          <div className="lg:col-span-3 animate-fade-up">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-1 leading-tight">
              Delivery Details
            </h1>
            <p className="font-body text-stone text-sm mb-7">
              Where should we send your order?
            </p>

            <div className="bg-white/60 rounded-2xl border border-stone/15 p-5 sm:p-6 space-y-5">
              {/* Full Name */}
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  placeholder="Priya Sharma"
                  value={shippingAddress.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  className={inputClass(errors.fullName)}
                />
              </Field>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={shippingAddress.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputClass(errors.email)}
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-body text-sm text-stone">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      onBlur={() => handleBlur("phone")}
                      className={`${inputClass(errors.phone)} pl-12`}
                    />
                  </div>
                </Field>
              </div>

              {/* PIN + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="PIN Code" error={errors.pinCode}>
                  <input
                    type="text"
                    placeholder="400001"
                    value={shippingAddress.pinCode}
                    onChange={(e) =>
                      handleChange("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    onBlur={() => handleBlur("pinCode")}
                    className={inputClass(errors.pinCode)}
                  />
                </Field>
                <Field label="City" error={errors.city}>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={shippingAddress.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    onBlur={() => handleBlur("city")}
                    className={inputClass(errors.city)}
                  />
                </Field>
              </div>

              {/* State */}
              <Field label="State" error={errors.state}>
                <select
                  value={shippingAddress.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  onBlur={() => handleBlur("state")}
                  className={`${inputClass(errors.state)} cursor-pointer`}
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => router.push("/")}
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
                Back to Cart
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-cream font-body font-semibold text-sm py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-forest/20 active:scale-[0.98]"
              >
                Continue to Payment
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Order summary — right column */}
          <div className="lg:col-span-2 animate-fade-up-delay-1">
            <div className="lg:sticky lg:top-6">
              <OrderSummary cartData={cartData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

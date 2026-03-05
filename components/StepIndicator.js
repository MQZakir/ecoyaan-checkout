"use client";

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Address" },
  { id: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          {/* Circle */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 font-body
                ${
                  currentStep > step.id
                    ? "bg-forest text-cream"
                    : currentStep === step.id
                    ? "bg-forest text-cream ring-4 ring-forest/20"
                    : "bg-cream-dark text-stone border border-stone/30"
                }`}
            >
              {currentStep > step.id ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7L5.5 10L11.5 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span
              className={`text-xs font-body font-medium ${
                currentStep >= step.id ? "text-forest" : "text-stone"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500 ${
                currentStep > step.id ? "bg-forest" : "bg-stone/25"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

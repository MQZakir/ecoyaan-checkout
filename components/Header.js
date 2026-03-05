export default function Header() {
  return (
    <header className="w-full py-5 px-6 flex items-center justify-between border-b border-stone/15">
      <a href="/" className="flex items-center gap-2 group">
        <span className="w-7 h-7 rounded-full bg-forest flex items-center justify-center text-cream text-xs">
          🌿
        </span>
        <span className="font-display text-xl text-ink tracking-tight">
          ecoyaan
        </span>
      </a>
      <span className="font-body text-sm text-stone">
        Secure checkout
      </span>
    </header>
  );
}

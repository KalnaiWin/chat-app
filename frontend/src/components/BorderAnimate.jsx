export default function BorderAnimate({ children }) {
  return (
    <div class="w-full animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-black from-80% via-[#F4845F] via-90% to-black to-100% p-px transition-all duration-1000">
      <div class="rounded-lg border border-neutral-800 bg-slate-800 text-white/50">
        {children}
      </div>
    </div>
  );
}

import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-500/10 grid place-items-center border border-red-200">
            <Wallet className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Kakeibo</h1>
            <p className="text-xs text-neutral-500">家計簿 • mindful money</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
            Minimal • 和風
          </span>
        </div>
      </div>
    </header>
  );
}

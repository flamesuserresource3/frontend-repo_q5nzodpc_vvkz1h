import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import UploadPanel from "./components/UploadPanel";
import ScreenshotCapture from "./components/ScreenshotCapture";
import TransactionsList from "./components/TransactionsList";
import SummaryBar from "./components/SummaryBar";

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((data) => {
    setItems((prev) => [
      { id: crypto.randomUUID(), date: Date.now(), ...data },
      ...prev,
    ]);
  }, []);

  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const accentPattern = useMemo(
    () => (
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ef4444" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="relative">
        {accentPattern}
      </div>
      <Header />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <UploadPanel onAdd={addItem} />
          <ScreenshotCapture onAdd={addItem} />
        </div>

        <SummaryBar items={items} />

        <section>
          <h3 className="mb-3 text-sm font-medium text-neutral-800">Records</h3>
          <TransactionsList items={items} onDelete={deleteItem} />
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-center text-xs text-neutral-500">
        Designed with a minimalist Japanese aesthetic. Connect Google Drive next to sync your receipts across devices.
      </footer>
    </div>
  );
}

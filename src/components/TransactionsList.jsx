import { Trash2 } from "lucide-react";

export default function TransactionsList({ items, onDelete }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 bg-white">
        No records yet. Add a photo or take a screenshot to begin.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t.id} className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3">
          <div className="h-14 w-14 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 flex-shrink-0">
            {t.imageUrl ? (
              <img src={t.imageUrl} alt={t.note || "receipt"} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full grid place-items-center text-xs text-neutral-400">No image</div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-neutral-900 truncate">{t.category}</p>
              <p className="font-semibold text-red-700">¥{t.amount.toLocaleString()}</p>
            </div>
            <p className="text-sm text-neutral-600 truncate">{t.note || "—"}</p>
            <p className="text-[11px] text-neutral-400">{new Date(t.date).toLocaleString()}</p>
          </div>
          <button
            onClick={() => onDelete(t.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white p-2 text-neutral-700 hover:bg-neutral-50"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}

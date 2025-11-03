export default function SummaryBar({ items }) {
  const total = items.reduce((acc, t) => acc + (Number.isFinite(t.amount) ? t.amount : 0), 0);
  const byCategory = items.reduce((acc, t) => {
    const key = t.category || "General";
    acc[key] = (acc[key] || 0) + (Number.isFinite(t.amount) ? t.amount : 0);
    return acc;
  }, {});
  const top = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs text-neutral-500">This session</p>
          <p className="text-2xl font-semibold text-neutral-900">¥{total.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500">Top categories</p>
          <div className="mt-1 flex flex-wrap justify-end gap-2">
            {top.length === 0 ? (
              <span className="text-xs text-neutral-400">—</span>
            ) : (
              top.map(([name, val]) => (
                <span key={name} className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-700 bg-neutral-50">
                  {name} · ¥{val.toLocaleString()}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-neutral-500">
        In the next step, you can connect Google Drive to store your receipts and keep your records synced.
      </p>
    </section>
  );
}

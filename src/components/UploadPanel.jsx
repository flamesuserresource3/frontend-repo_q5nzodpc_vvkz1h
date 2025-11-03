import { useRef, useState } from "react";
import { Camera, Upload } from "lucide-react";

export default function UploadPanel({ onAdd }) {
  const fileInputRef = useRef(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    return { file, imageUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    setIsSubmitting(true);
    try {
      const selected = fileInputRef.current.files[0];
      const { imageUrl } = await handleFileSelect(selected);
      const amt = parseFloat(amount || "0");
      onAdd({ amount: isNaN(amt) ? 0 : amt, category, note, imageUrl, source: "upload" });
      // reset
      fileInputRef.current.value = "";
      setAmount("");
      setNote("");
      setCategory("General");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-red-500/10 grid place-items-center border border-red-200">
          <Camera className="h-4 w-4 text-red-600" />
        </div>
        <h2 className="text-sm font-medium text-neutral-800">Quick Capture</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <label className="block text-xs text-neutral-600 mb-1">Amount (¥)</label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full rounded-md border-neutral-200 focus:border-red-400 focus:ring-red-400 text-neutral-900"
            required
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs text-neutral-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border-neutral-200 focus:border-red-400 focus:ring-red-400 text-neutral-900"
          >
            <option>General</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-neutral-600 mb-1">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What is this for?"
            className="w-full rounded-md border-neutral-200 focus:border-red-400 focus:ring-red-400 text-neutral-900"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="block text-xs text-neutral-600 mb-1">Photo or receipt</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            required
          />
          <p className="mt-1 text-[11px] text-neutral-500">Use your camera or pick from your library.</p>
        </div>
        <div className="sm:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 w-full"
          >
            <Upload className="h-4 w-4" />
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

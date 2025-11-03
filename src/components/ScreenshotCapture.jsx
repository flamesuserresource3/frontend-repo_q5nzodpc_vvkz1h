import { useRef, useState } from "react";
import { Camera } from "lucide-react";

export default function ScreenshotCapture({ onAdd }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const startCapture = async () => {
    try {
      setBusy(true);
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      // Wait a moment for the first frame
      await new Promise((r) => setTimeout(r, 300));

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!canvas || !video) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      stream.getTracks().forEach((t) => t.stop());

      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], `screenshot-${Date.now()}.png`, { type: "image/png" });
        const imageUrl = URL.createObjectURL(file);
        onAdd({ amount: 0, category: "Screenshot", note: "Captured screenshot", imageUrl, source: "screenshot" });
        setBusy(false);
      }, "image/png", 0.95);
    } catch (e) {
      console.error(e);
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-500/10 grid place-items-center border border-red-200">
            <Camera className="h-4 w-4 text-red-600" />
          </div>
          <h2 className="text-sm font-medium text-neutral-800">Screenshot</h2>
        </div>
        <button
          type="button"
          onClick={startCapture}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-100 disabled:opacity-50"
        >
          <Camera className="h-4 w-4" />
          {busy ? "Capturing…" : "Capture"}
        </button>
      </div>
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
      <p className="mt-3 text-xs text-neutral-500">
        Take a quick screenshot of invoices, statements, or receipts and log them instantly.
      </p>
    </section>
  );
}

"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setShortUrl(""); setCopied(false);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) { setShortUrl(data.shortUrl); setUrl(""); }
      else { setError(data.error || "Terjadi kesalahan"); }
    } catch { setError("Gagal terhubung ke server"); }
    finally { setLoading(false); }
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shortUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { setError("Gagal menyalin"); }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-900 dark:text-white">Link Shortener</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Pendekkan URL panjang Anda</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://contoh.com/..." required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
          <button type="submit" disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50">
            {loading ? "Memproses..." : "Pendekkan"}
          </button>
        </form>
        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {shortUrl && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <p className="font-semibold text-green-800 mb-2">Link pendek Anda:</p>
            <div className="flex items-center gap-2">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 underline break-all">{shortUrl}</a>
              <button onClick={handleCopy} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

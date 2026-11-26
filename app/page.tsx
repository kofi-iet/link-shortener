"use client";

import { useState } from "react";
import { Link2, Copy, Check, Loader2, AlertCircle } from "lucide-react";

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
    try { 
      await navigator.clipboard.writeText(shortUrl); 
      setCopied(true); 
      setTimeout(() => setCopied(false), 2000); 
    }
    catch { setError("Gagal menyalin"); }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <Link2 className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Pendekin URL
          </h1>
          <p className="text-gray-400 text-sm">Buat link pendek yang rapi, cepat, dan gratis.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="sr-only">URL Panjang</label>
              <input 
                id="url"
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="https://contoh.com/url-panjang..." 
                required
                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex justify-center items-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
              ) : (
                "Pendekkan Sekarang"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {shortUrl && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-sm font-medium mb-2">Berhasil dibuat!</p>
              <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 text-blue-400 hover:text-blue-300 underline text-sm break-all transition-colors"
                >
                  {shortUrl}
                </a>
                <button 
                  onClick={handleCopy} 
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                  title="Salin Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Link2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setUrl("");
      } else {
        setError(data.error || "Terjadi kesalahan");
      }
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Gagal menyalin link");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/3 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-6 sm:py-8">
          <a href="/" className="group flex items-center gap-3" aria-label="Pendekin URL beranda">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/15 transition-transform group-hover:-rotate-6 sm:h-11 sm:w-11">
              <Link2 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">pendekin<span className="text-blue-600">.url</span></span>
          </a>
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            Siap digunakan
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 pb-12 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:pb-20 lg:pt-10">
          <section className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 shadow-sm shadow-blue-100 sm:mb-7">
              <Sparkles className="h-3.5 w-3.5" />
              Link lebih rapi, dalam sekejap
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Link panjang jadi
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text pb-2 text-transparent">pendek dan berkesan.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Bagikan URL yang bersih, mudah diingat, dan terlihat profesional. Tanpa registrasi, tanpa langkah rumit.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] sm:mt-10 sm:p-6">
              <form onSubmit={handleSubmit}>
                <label htmlFor="url" className="mb-2.5 block text-sm font-bold text-slate-800">Masukkan URL yang ingin dipendekkan</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Link2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="https://contoh.com/url-panjang"
                      required
                      autoComplete="url"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-600 hover:shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-4 w-4" />}
                    {loading ? "Memproses" : "Pendekkan"}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {shortUrl && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4" role="status" aria-live="polite">
                  <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="h-5 w-5" />
                    Link berhasil dibuat
                  </div>
                  <div className="flex min-w-0 items-center gap-2 rounded-xl border border-emerald-200/80 bg-white p-2">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 break-all px-2 text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900">
                      {shortUrl}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      title={copied ? "Link tersalin" : "Salin link"}
                      aria-label={copied ? "Link tersalin" : "Salin link"}
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {copied && <p className="mt-2 text-xs font-semibold text-emerald-700">Link tersalin ke clipboard.</p>}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 sm:mt-7">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Gratis selamanya</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Tanpa daftar</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Proses cepat</span>
            </div>
          </section>

          <aside className="relative mx-auto w-full max-w-md lg:mr-0" aria-label="Keunggulan Pendekin URL">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-transparent to-violet-200/60 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-5 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.55)] sm:p-7">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Link Anda</p>
                    <p className="mt-1 text-sm font-bold text-white">Siap dibagikan</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Link2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="truncate text-xs text-slate-500">URL ASLI</p>
                  <p className="mt-2 truncate text-sm text-slate-300">contoh.com/artikel-terbaru...</p>
                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-400/70 to-violet-400/70" />
                    <ArrowRight className="h-4 w-4 text-blue-300" />
                    <div className="h-px flex-1 bg-gradient-to-r from-violet-400/70 to-blue-400/70" />
                  </div>
                  <p className="truncate text-xs text-slate-500">LINK PENDEK</p>
                  <p className="mt-2 truncate text-base font-bold text-blue-300">pendekin.url/aB3xY7z</p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5">
                    <Zap className="h-4 w-4 text-amber-300" />
                    <p className="mt-3 text-sm font-bold text-white">Sekejap</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Buat link tanpa menunggu</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <p className="mt-3 text-sm font-bold text-white">Terpercaya</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Format aman dan rapi</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-200/80 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pendekin URL</p>
          <p className="font-medium">Sederhana. Cepat. Profesional.</p>
        </footer>
      </div>
    </main>
  );
}

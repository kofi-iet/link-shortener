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
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#050505] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-4 pb-[env(safe-area-inset-bottom)] sm:px-6 lg:px-8">
        <header className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 py-5 sm:py-8">
          <a href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Pendekin URL beranda">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 shadow-lg shadow-white/10 transition-transform group-hover:-rotate-6 sm:h-11 sm:w-11">
              <Link2 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
            </span>
            <span className="truncate text-base font-bold tracking-tight text-white sm:text-lg">pendekin<span className="text-blue-400">.url</span></span>
          </a>
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-300 shadow-sm backdrop-blur sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            Siap digunakan
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 pb-10 pt-6 sm:gap-12 sm:pb-12 sm:pt-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20 lg:pb-20 lg:pt-10">
          <section className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-300 shadow-sm shadow-blue-950/40 sm:mb-7">
              <Sparkles className="h-3.5 w-3.5" />
              Link lebih rapi, dalam sekejap
            </div>
            <h1 className="max-w-xl text-[clamp(2.25rem,8vw,3.75rem)] font-black leading-[1.08] tracking-[-0.045em] text-white">
              Link panjang jadi
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text pb-2 text-transparent">pendek dan berkesan.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Bagikan URL bersih dan mudah diingat. Tanpa registrasi, tanpa langkah rumit.
            </p>

            <div className="mt-8 w-full rounded-3xl border border-white/10 bg-[#101010] p-4 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)] sm:mt-10 sm:p-6 lg:max-w-2xl">
              <form onSubmit={handleSubmit}>
                <label htmlFor="url" className="mb-2.5 block text-sm font-bold text-slate-200">Masukkan URL yang ingin dipendekkan</label>
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
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-500 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-4 w-4" />}
                    {loading ? "Memproses" : "Pendekkan"}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-300" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {shortUrl && (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4" role="status" aria-live="polite">
                  <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                    Link berhasil dibuat
                  </div>
                  <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-2 sm:p-2.5">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 break-all px-2 text-sm font-semibold text-blue-300 underline decoration-blue-400/40 underline-offset-4 transition hover:text-blue-200">
                      {shortUrl}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-950 transition hover:bg-blue-600 hover:text-white active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      title={copied ? "Link tersalin" : "Salin link"}
                      aria-label={copied ? "Link tersalin" : "Salin link"}
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {copied && <p className="mt-2 text-xs font-semibold text-emerald-300">Link tersalin ke clipboard.</p>}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400 sm:mt-7 sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Gratis selamanya</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Tanpa daftar</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" />Proses cepat</span>
            </div>
          </section>

          <aside className="relative mx-auto w-full min-w-0 max-w-md lg:sticky lg:top-8 lg:mr-0" aria-label="Keunggulan Pendekin URL">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-transparent to-violet-600/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-5 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.8)] sm:p-7">
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
                  <p className="truncate text-xs text-slate-400">URL ASLI</p>
                  <p className="mt-2 truncate text-sm text-slate-300">contoh.com/artikel-terbaru...</p>
                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-400/70 to-violet-400/70" />
                    <ArrowRight className="h-4 w-4 text-blue-300" />
                    <div className="h-px flex-1 bg-gradient-to-r from-violet-400/70 to-blue-400/70" />
                  </div>
                  <p className="truncate text-xs text-slate-400">LINK PENDEK</p>
                  <p className="mt-2 truncate text-base font-bold text-blue-300">pendekin.url/aB3xY7z</p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/20 hover:bg-white/[0.08]">
                    <Zap className="h-4 w-4 text-amber-300" />
                    <p className="mt-3 text-sm font-bold text-white">Sekejap</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Buat link tanpa menunggu</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/20 hover:bg-white/[0.08]">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <p className="mt-3 text-sm font-bold text-white">Terpercaya</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Format aman dan rapi</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p>© {new Date().getFullYear()} Pendekin URL</p>
          <p className="font-medium">Sederhana. Cepat. Profesional.</p>
        </footer>
      </div>
    </main>
  );
}

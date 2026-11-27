import Link from "next/link";
import { ArrowLeft, Link2, Unlink } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f9fc] px-4 py-12 text-slate-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2.5"
          aria-label="Pendekin URL beranda"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
            <Link2 className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">
            pendekin<span className="text-blue-600">.url</span>
          </span>
        </Link>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Unlink className="h-7 w-7" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Error 404</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
            Link tidak ditemukan
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Link yang Anda buka mungkin sudah dihapus, kedaluwarsa, atau salah ketik.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-600 hover:shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
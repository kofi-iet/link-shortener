import Link from "next/link";
import { ArrowLeft, Link2, Unlink } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2.5"
          aria-label="Pendekin URL beranda"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 shadow-lg shadow-blue-500/10">
            <Link2 className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-base font-bold tracking-tight text-white">
            pendekin<span className="text-blue-400">.url</span>
          </span>
        </Link>

        <div className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            <Unlink className="h-7 w-7" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Error 404</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
            Link tidak ditemukan
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Link yang Anda buka mungkin sudah dihapus, kedaluwarsa, atau salah ketik.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-slate-950 shadow-lg shadow-white/10 transition hover:bg-blue-500 hover:text-white hover:shadow-blue-500/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  );
}

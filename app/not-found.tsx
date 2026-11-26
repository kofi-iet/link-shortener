import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">Link tidak ditemukan.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg">Kembali</Link>
    </main>
  );
}

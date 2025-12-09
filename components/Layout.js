import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <header className="relative overflow-hidden">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center text-white">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Cordia
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:underline/80">Contacts</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">GitHub</a>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8 animate-fade-in">{children}</main>
      <footer className="border-t mt-12 py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Cordia Contacts</footer>
    </div>
  );
}

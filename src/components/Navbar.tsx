import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative z-50">
       <Link href="/">
         <h1 className="text-xl font-bold tracking-widest text-white uppercase"><span className="text-[#C5A059]">UH</span> Custom Watches</h1>
       </Link>
       <div className="hidden md:flex space-x-8 text-xs font-semibold tracking-widest uppercase text-white/50">
          <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
          <Link href="/craftsmanship" className="hover:text-white transition-colors">Craftsmanship</Link>
       </div>
       <button className="md:hidden text-white">Menu</button>
    </nav>
  );
}

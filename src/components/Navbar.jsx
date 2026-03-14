import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Home', 'Journey', 'Gallery', 'Wishes'];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="font-serif text-xl font-semibold tracking-tight text-ink hover:text-gold transition-colors">
            Prof. Faith <span className="text-gold italic font-light">· Celebration</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-ink-light hover:text-gold transition-colors font-sans"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-ink p-1">
            <span className={`block w-6 h-0.5 bg-ink mb-1.5 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink mb-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-4xl text-ink hover:text-gold transition-colors"
          >
            {l}
          </a>
        ))}
      </div>
    </>
  );
}

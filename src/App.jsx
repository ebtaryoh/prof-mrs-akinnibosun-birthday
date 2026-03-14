import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Legacy from './components/Legacy';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-ink overflow-x-hidden selection:bg-rose/20 selection:text-rose">
      <Navbar />
      <main>
        <Hero />
        <Legacy />
        <Gallery />
        <Guestbook />
      </main>
      <AudioPlayer />
      <footer
        style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.5)' }}
        className="py-10 text-center font-sans text-xs tracking-widest"
      >
        <p className="font-serif text-white/80 italic text-xl mb-3">
          Happy Birthday, Prof. (Mrs) Faith Akinnibosun 🎂
        </p>
        <p className="uppercase tracking-[0.3em]">
          MADE WITH ❤️ · MARCH 14 · 2026 · A CELEBRATION OF LIFE
        </p>
      </footer>
    </div>
  );
}

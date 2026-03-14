import React, { useEffect, useRef, useState } from 'react';

// Load first image for hero portrait
const imgs = import.meta.glob('../../assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const allImgs = Object.values(imgs).map(m => m.default);
const heroImg = allImgs[0] || null;

function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  const colors = ['#B8860B', '#C8A24E', '#8FA89D', '#D4A07A', '#E8D5A3', '#A8C4B8'];
  const shapes = ['rounded-sm', 'rounded-full'];

  return (
    <>
      {pieces.map(i => (
        <div
          key={i}
          className={`confetti-piece ${shapes[i % 2]}`}
          style={{
            left: `${(i * 5.5 + 3) % 100}%`,
            background: colors[i % colors.length],
            width: `${6 + (i % 4)}px`,
            height: `${6 + (i % 3)}px`,
            animationDuration: `${4 + (i % 5)}s`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-cream flex flex-col items-center justify-center overflow-hidden"
    >
      <Confetti />

      {/* Giant background "52" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="font-serif font-bold leading-none"
          style={{
            fontSize: 'min(55vw, 55vh)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(184, 134, 11, 0.15)',
          }}
        >
          52
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-16"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease' }}
      >
        {/* Date pill */}
        <p
          className="text-gold font-sans text-xs tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease 0.3s' }}
        >
          MARCH 14 · 2026 · A CELEBRATION OF LIFE
        </p>

        {/* Portrait — rounded at top, open at bottom like reference */}
        {heroImg && (
          <div
            className="relative mb-8"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.92)', transition: 'all 1s ease 0.2s' }}
          >
            <div
              className="overflow-hidden bg-cream-dark shadow-2xl mx-auto"
              style={{
                width: '260px',
                height: '340px',
                borderRadius: '140px 140px 40px 40px',
                border: '4px solid rgba(184, 134, 11, 0.25)',
              }}
            >
              <img
                src={heroImg}
                alt="Prof. Mrs. Faith Akinnibosun"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Glow ring */}
            <div
              className="absolute -inset-3 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: -1,
              }}
            />
          </div>
        )}

        {/* Name */}
        <h1
          className="font-serif text-ink leading-tight mb-4"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Prof. (Mrs){' '}
          <em className="font-light text-gold not-italic">Faith Iguodala</em>{' '}
          Akinnibosun
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px w-12 bg-gold/40" />
          <div className="w-2 h-2 rounded-full bg-gold/60" />
          <div className="h-px w-12 bg-gold/40" />
        </div>

        {/* Roles */}
        <p
          className="font-sans text-ink-light tracking-[0.2em] uppercase text-xs font-medium mt-2"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.7s' }}
        >
          PROFESSOR &nbsp;·&nbsp; MOTHER &nbsp;·&nbsp; MINISTER &nbsp;·&nbsp; LEADER
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 1.5s' }}
      >
        <span className="font-sans text-[10px] tracking-[0.25em] text-ink-light uppercase">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-gold/20 to-gold"
            style={{ animation: 'fade-up 1.5s ease infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

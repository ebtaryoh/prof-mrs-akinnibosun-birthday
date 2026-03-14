import React, { useRef, useEffect, useState } from 'react';

const imgs = import.meta.glob('../../assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const allImgs = Object.values(imgs).map(m => m.default);

const milestones = [
  {
    year: '1972',
    tag: 'THE BEGINNING',
    emoji: '🌱',
    title: 'Born Into Greatness',
    body: 'On March 14, 1972, the Asowata family of the Ogiefa Royal Family of Benin Kingdom welcomed a daughter who would change every room she entered. Born in Uhunmwode LGA of Edo State, young Faith carried in her heart a fire that no circumstance could extinguish.',
    imgIdx: 0,
  },
  {
    year: '1977–1988',
    tag: 'EARLY EXCELLENCE',
    emoji: '📚',
    title: 'Best Student, Every Year',
    body: 'Through Edaiken and Ugbowo Primary Schools and on to Uselu Secondary School, Faith was simply unstoppable — graduating as the Best Student for five consecutive years, securing 1st Position every single term. A prophecy of greatness was already writing itself.',
    imgIdx: 1,
  },
  {
    year: '1995–2010',
    tag: 'ACADEMIC ASCENT',
    emoji: '🎓',
    title: 'From B.Sc to Ph.D',
    body: 'The University of Benin became her second home. She earned a Second Class Upper B.Sc in Microbiology (1995), an M.Sc (1998), and finally a Ph.D in collaboration with the University of Exeter, UK (2010) — supported by the prestigious Exeter Research Scholarship and grants from the Society for General Microbiology, UK.',
    imgIdx: 2,
  },
  {
    year: '2016–2019',
    tag: 'LEADERSHIP',
    emoji: '👑',
    title: 'Pioneer. Dean. Professor.',
    body: 'She made history as the Pioneer Head of Department of Microbiology, Edo State University (2016), served as Acting Dean of Science (2017), and rose to the rank of Professor at UNIBEN in 2019 — a testament to decades of relentless dedication and excellence.',
    imgIdx: 3,
  },
  {
    year: '2020–Present',
    tag: 'A LASTING LEGACY',
    emoji: '✨',
    title: '100+ Publications & Counting',
    body: 'A Fellow of the Linnean Society of London, "Best HOD of the Year", "Outstanding Leadership Award" recipient, and author of over 100 high-impact scientific publications. She has mentored 6 Ph.D, 84 MSc and 71 PGD graduates — and countless more whose lives she has quietly transformed.',
    imgIdx: 4,
  },
];

function useScrollSpy(refs, threshold = 0.5) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = refs.findIndex(r => r.current === e.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold }
    );
    refs.forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, [refs]);
  return active;
}

export default function Journey() {
  const refs = milestones.map(() => useRef(null));
  const active = useScrollSpy(refs);
  const imgSrc = allImgs[milestones[active]?.imgIdx] || allImgs[active % allImgs.length] || null;
  const [prevImg, setPrevImg] = useState(imgSrc);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (imgSrc !== prevImg) {
      setFade(false);
      const t = setTimeout(() => {
        setPrevImg(imgSrc);
        setFade(true);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [imgSrc]);

  return (
    <section id="journey" className="bg-cream-dark">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
        <p className="font-sans text-xs tracking-[0.3em] text-rose uppercase mb-3">Her Story</p>
        <h2 className="font-serif text-5xl md:text-6xl text-ink font-semibold">
          The Journey <em className="font-light text-rose-muted">So Far</em>
        </h2>
        <div className="h-px w-16 bg-rose/40 mx-auto mt-6" />
      </div>

      {/* Split-screen sticky layout */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-0 pb-32">
        {/* Left: Scrolling text */}
        <div className="md:w-1/2 md:pr-12 space-y-0">
          {milestones.map((m, i) => (
            <div
              key={i}
              ref={refs[i]}
              className="min-h-[75vh] flex flex-col justify-center py-20 border-l-2 border-rose/10 pl-8 md:border-none md:pl-0"
            >
              <p className="font-sans text-[10px] tracking-[0.35em] text-rose uppercase mb-3 flex items-center gap-2">
                <span className="inline-block w-5 h-px bg-rose/40" />
                {m.tag} · {m.year}
              </p>
              <div className="text-3xl mb-3">{m.emoji}</div>
              <h3
                className="font-serif text-3xl md:text-4xl text-ink font-semibold mb-5 leading-tight transition-colors"
                style={{ color: i === active ? '#2d2d2d' : '#8a7070' }}
              >
                {m.title}
              </h3>
              <p className="font-sans text-ink-light text-[15px] leading-relaxed max-w-md">{m.body}</p>
            </div>
          ))}
        </div>

        {/* Right: Sticky image panel */}
        <div className="hidden md:flex md:w-1/2 relative">
          <div className="sticky top-28 self-start w-full h-[72vh] rounded-3xl overflow-hidden shadow-2xl">
            {prevImg ? (
              <img
                src={prevImg}
                alt="Journey moment"
                className="w-full h-full object-cover object-center transition-opacity duration-500"
                style={{ opacity: fade ? 1 : 0 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cream-dark to-rose-light flex items-center justify-center">
                <span className="font-serif text-5xl text-rose/40 italic">52</span>
              </div>
            )}
            {/* Milestone counter */}
            <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow">
              {milestones.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '6px',
                    height: '6px',
                    background: i === active ? '#B8860B' : '#ddd',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

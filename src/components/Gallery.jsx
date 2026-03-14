import React, { useState, useRef } from 'react';

/* ─── Import images by folder ─── */
const academicsImgs = import.meta.glob('../../assets/ACADEMICS/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const familyImgs = import.meta.glob('../../assets/FAMILY/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const occasionsImgs = import.meta.glob('../../assets/OCCASIONS/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const wishesImgs = import.meta.glob('../../assets/BIRTHDAY WISHES/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });

const toArr = modules => Object.values(modules).map(m => m.default);

const categories = {
  'All': [],
  'Academics': toArr(academicsImgs),
  'Family': toArr(familyImgs),
  'Occasions': toArr(occasionsImgs),
  'Birthday Wishes': toArr(wishesImgs),
};

// "All" = merge of every folder
categories['All'] = [
  ...categories['Academics'],
  ...categories['Family'],
  ...categories['Occasions'],
  ...categories['Birthday Wishes'],
];

/* ─── Horizontal Carousel ─── */
function Carousel({ images, onImageClick }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (!ref.current) return;
    const amount = ref.current.offsetWidth * 0.7;
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (images.length === 0) return <p className="text-ink-light text-center italic font-sans py-12">No images in this category.</p>;

  return (
    <div className="relative group">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
        style={{ background: 'rgba(253,251,247,0.9)', color: '#b8860b' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* Scrollable strip */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {images.map((url, i) => (
          <div
            key={url + i}
            className="snap-start flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group/img shadow-sm hover:shadow-xl transition-shadow duration-300"
            style={{ width: '280px', height: '320px' }}
            onClick={() => onImageClick(url)}
          >
            <img
              src={url}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-400" />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
        style={{ background: 'rgba(253,251,247,0.9)', color: '#b8860b' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

/* ─── Main Gallery ─── */
export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const catNames = Object.keys(categories);

  // For the "All" tab, limit to 6 unless "See More" is clicked
  const displayImages = active === 'All' && !showAll
    ? categories['All'].slice(0, 6)
    : categories[active] || [];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#b8860b' }}>A Portrait in Frames</p>
          <h2 className="font-serif text-5xl md:text-6xl text-ink font-semibold leading-tight">
            Milestones &amp; <em className="font-light" style={{ color: '#c8a24e' }}>Memories</em>
          </h2>
          <div className="h-px w-16 mx-auto mt-6 mb-10" style={{ background: 'rgba(184, 134, 11, 0.4)' }} />

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {catNames.map(cat => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setShowAll(false); }}
                className="px-5 py-2 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300"
                style={
                  active === cat
                    ? { background: '#b8860b', color: '#FDFBF7', boxShadow: '0 4px 14px rgba(184,134,11,0.3)' }
                    : { color: '#6b6b6b', border: '1px solid rgba(45,45,45,0.1)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <Carousel images={displayImages} onImageClick={setLightbox} />

        {/* "See More" button — only in "All" tab when not expanded */}
        {active === 'All' && !showAll && categories['All'].length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full font-sans text-sm tracking-wide font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ background: '#b8860b', color: '#FDFBF7' }}
            >
              See More Photos ✨
            </button>
          </div>
        )}

        {/* Collapse button when expanded */}
        {active === 'All' && showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(false)}
              className="px-8 py-3 rounded-full font-sans text-sm tracking-wide font-medium transition-all duration-300"
              style={{ border: '1px solid #b8860b', color: '#b8860b' }}
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Full view"
            className="max-w-4xl max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'rgba(184,134,11,0.6)' }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

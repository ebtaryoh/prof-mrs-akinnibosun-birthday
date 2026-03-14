import React, { useState, useRef, useEffect } from 'react';
import birthdaySong from '../../assets/birthday song.mpeg';

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [bars] = useState([3, 5, 4, 6, 3, 5, 4]);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.volume = 0.45;
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play().catch(() => {});
    }
    setPlaying(p => !p);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={ref} src={birthdaySong} loop onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />

      {/* Pill capsule — exactly like reference site */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        style={{
          background: 'rgba(253, 251, 247, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(184, 134, 11, 0.2)',
          borderRadius: '999px',
          padding: '10px 18px 10px 10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(184,134,11,0.15)',
        }}
        onClick={toggle}
      >
        {/* Play/pause circle button */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#B8860B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s',
          }}
        >
          {playing ? (
            // Pause icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="5" y="4" width="4" height="16" rx="1"/>
              <rect x="15" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            // Play icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '2px' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>

        {/* Text + visualizer */}
        <div>
          <p className="font-sans text-ink font-semibold text-xs tracking-wider uppercase whitespace-nowrap">
            HAPPY BIRTHDAY 🎂
          </p>
          <div className="flex items-end gap-0.5 mt-1" style={{ height: '14px' }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: '3px',
                  height: playing ? `${h * 2}px` : '3px',
                  background: '#B8860B',
                  transition: 'height 0.2s ease',
                  animation: playing ? `shimmer ${0.6 + i * 0.1}s ease-in-out infinite alternate` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Guestbook() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [useFB, setUseFB] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, snap => {
        setWishes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }, () => {
        setUseFB(false);
        const saved = JSON.parse(localStorage.getItem('bday_wishes') || '[]');
        setWishes(saved.sort((a, b) => b.ts - a.ts));
      });
      return () => unsub();
    } catch {
      setUseFB(false);
      const saved = JSON.parse(localStorage.getItem('bday_wishes') || '[]');
      setWishes(saved.sort((a, b) => b.ts - a.ts));
    }
  }, []);

  const submit = async e => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setSending(true);
    try {
      if (useFB) {
        await addDoc(collection(db, 'wishes'), { name: name.trim(), message: msg.trim(), createdAt: serverTimestamp() });
      } else {
        const wish = { id: Date.now().toString(), name: name.trim(), message: msg.trim(), ts: Date.now() };
        const all = JSON.parse(localStorage.getItem('bday_wishes') || '[]');
        const updated = [wish, ...all];
        localStorage.setItem('bday_wishes', JSON.stringify(updated));
        setWishes(updated);
      }
      setName(''); setMsg('');
    } catch { alert('Could not send wish. Please try again.'); }
    finally { setSending(false); }
  };

  return (
    <section id="wishes" style={{ background: 'linear-gradient(160deg, #f9e8f0 0%, #f0eaf5 50%, #e8f0f5 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-3">Leave a Note</p>
          <h2 className="font-serif text-5xl md:text-6xl text-ink font-semibold">
            Birthday <em className="font-light text-gold-muted">Wishes</em>
          </h2>
          <p className="font-sans text-ink-light mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Share your love, blessings, and warmest birthday wishes for the Professor. All messages are visible to everyone.
          </p>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-ink-light mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="What's your name?"
                className="w-full bg-white/70 border border-white/60 rounded-2xl px-5 py-4 font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:bg-white transition-all backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-ink-light mb-2">Your Message</label>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                required
                rows={5}
                placeholder="Write your birthday message here..."
                className="w-full bg-white/70 border border-white/60 rounded-2xl px-5 py-4 font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:bg-white transition-all resize-none backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gold hover:bg-gold-muted text-white font-sans font-medium text-sm tracking-wide py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-gold/25 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Sending…
                </span>
              ) : (
                <>Send Birthday Wish 🌸</>
              )}
            </button>
            {!useFB && (
              <p className="text-center text-[10px] text-ink/40 font-sans leading-relaxed">
                Saving locally. Connect Firebase in <code>src/firebase.js</code> to share with everyone.
              </p>
            )}
          </form>

          {/* Wish cards */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto scrollbar-thin pr-1">
            {wishes.length === 0 ? (
              <div className="text-center py-16 text-ink/30">
                <div className="text-5xl mb-4">🌸</div>
                <p className="font-serif text-xl italic">Be the first to leave a birthday wish!</p>
              </div>
            ) : (
              wishes.map((w, i) => (
                <div
                  key={w.id}
                  className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
                  style={{ animation: `fade-up 0.5s ease ${i * 0.06}s both` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-light flex items-center justify-center">
                        <span className="text-gold font-serif font-semibold text-sm">{w.name?.[0]?.toUpperCase()}</span>
                      </div>
                      <span className="font-sans font-semibold text-sm text-ink">{w.name}</span>
                    </div>
                    <span className="text-gold text-lg">🌸</span>
                  </div>
                  <p className="font-sans text-ink/70 text-sm leading-relaxed">"{w.message}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

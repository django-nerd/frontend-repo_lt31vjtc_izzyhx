import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function TopCreators({ segment }) {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = new URL(`${API}/top-creators`);
    if (segment) url.searchParams.set('segment', segment);
    url.searchParams.set('limit', '8');
    fetch(url.toString())
      .then(r => r.json())
      .then(setCreators)
      .finally(() => setLoading(false));
  }, [segment]);

  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Top creators{segment ? ` · ${segment}` : ''}</h2>
      </div>
      {loading && <p className="text-slate-400">Loading creators…</p>}
      {!loading && creators.length === 0 && (
        <div className="text-slate-300 bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
          <p>No creators yet. Click "Seed sample data" below to populate demo content.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {creators.map(c => (
          <div key={c.id} className="group bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 hover:border-slate-500/60 transition">
            <div className="flex items-center gap-3">
              <img src={c.avatar_url || 'https://placehold.co/64x64'} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h3 className="text-white font-semibold leading-tight">{c.name}</h3>
                {c.handle && <p className="text-slate-400 text-sm">@{c.handle}</p>}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
              <span>⭐ {c.rating.toFixed(1)}</span>
              <span>·</span>
              <span>👥 {Intl.NumberFormat().format(c.followers)}</span>
            </div>
            {c.segments?.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {c.segments.slice(0,3).map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-200 text-xs">{s}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCreators;

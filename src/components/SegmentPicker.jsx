import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function SegmentPicker({ value, onChange }) {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/segments`).then(r => r.json()).then(setSegments).finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-200 mb-2">Choose a segment</label>
      <div className="flex gap-2 flex-wrap">
        {loading && <span className="text-slate-400 text-sm">Loading segments…</span>}
        {!loading && segments.map(seg => (
          <button
            key={seg.slug}
            onClick={() => onChange(seg.slug)}
            className={`px-3 py-1.5 rounded-full border text-sm transition ${value === seg.slug ? 'bg-white text-slate-900 border-white' : 'border-slate-600/50 text-slate-200 hover:border-slate-400'}`}
            style={seg.color ? { boxShadow: `0 0 0 1px ${seg.color} inset` } : {}}
          >
            {seg.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SegmentPicker;

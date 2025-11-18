import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import SegmentPicker from './components/SegmentPicker'
import TopCreators from './components/TopCreators'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [segment, setSegment] = useState('')
  const [seedLoading, setSeedLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const seed = async () => {
    setSeedLoading(true)
    try {
      const res = await fetch(`${API}/seed`, { method: 'POST' })
      if (!res.ok) throw new Error('Seed failed')
      setSeeded(true)
    } catch (e) {
      console.error(e)
      alert('Seeding failed. Is the backend database configured?')
    } finally {
      setSeedLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-fuchsia-500" />
            <span className="font-semibold">CreatorChoice</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={seed} disabled={seedLoading} className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-medium disabled:opacity-60">
              {seedLoading ? 'Seeding…' : 'Seed sample data'}
            </button>
          </div>
        </div>
      </header>

      <Hero />

      <main className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 -mt-10 relative z-10">
          <SegmentPicker value={segment} onChange={setSegment} />
        </div>

        <TopCreators segment={segment} />

        <section className="mt-12 mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white">Why this is different</h3>
            <p className="mt-2 text-slate-300 text-sm leading-6">
              You decide what your audience sees. Segments empower creators to present their work the way it should be found. Consumers browse by interest, not fleeting trends.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white">How discovery works</h3>
            <p className="mt-2 text-slate-300 text-sm leading-6">
              Each segment showcases its top creators with transparent signals like community ratings and follower reach. No opaque feed — browse, filter, and follow on your terms.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-400 text-sm">
        Built for creators. Powered by segments, not a black-box algorithm.
      </footer>
    </div>
  )
}

export default App

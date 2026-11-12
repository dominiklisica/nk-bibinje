import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import Squad from './pages/Squad'
import Table from './pages/Table'
import Stats from './pages/Stats'
import About from './pages/About'
import News from './pages/News'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Donations from './pages/Donations'
import Privacy from './pages/Privacy'
import School from './pages/School'
import ComingSoon from './components/ui/ComingSoon'
import { MEMBERSHIP_ENABLED } from './lib/features'

// Članarina i evidencija kluba koriste bazu (Supabase) — učitavaju se tek kad se otvore.
const Membership = lazy(() => import('./pages/Membership'))
const ClubAdmin = lazy(() => import('./pages/ClubAdmin'))
const loadingPage = <div className="text-muted mx-auto max-w-4xl px-4 pb-16 pt-28">Učitavanje…</div>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/utakmice" element={<Matches />} />
        <Route path="/utakmice/:id" element={<MatchDetail />} />
        <Route path="/momcad" element={<Squad />} />
        <Route path="/tablica" element={<Table />} />
        <Route path="/statistika" element={<Stats />} />
        <Route path="/o-klubu" element={<About />} />
        <Route path="/vijesti" element={<News />} />
        <Route path="/galerija" element={<Gallery />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/donacije" element={<Donations />} />
        <Route path="/privatnost" element={<Privacy />} />
        <Route path="/skola-nogometa" element={<School />} />
        <Route
          path="/clanarina"
          element={
            MEMBERSHIP_ENABLED ? (
              <Suspense fallback={loadingPage}>
                <Membership />
              </Suspense>
            ) : (
              <ComingSoon
                title="Članarina"
                subtitle="Plaćanje članarine barkodom iz mobilne banke."
                planned={['Pregled plaćenih i neplaćenih mjeseci za vaše dijete', 'Barkod za uplatu svakog mjeseca']}
              />
            )
          }
        />
        <Route
          path="/klub"
          element={
            MEMBERSHIP_ENABLED ? (
              <Suspense fallback={loadingPage}>
                <ClubAdmin />
              </Suspense>
            ) : (
              <ComingSoon title="Evidencija kluba" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

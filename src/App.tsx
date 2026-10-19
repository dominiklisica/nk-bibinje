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
import NotFound from './pages/NotFound'

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

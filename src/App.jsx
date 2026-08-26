import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Beranda from './pages/Beranda.jsx'
import Chat from './pages/Chat.jsx'
import Dokumentasi from './pages/Dokumentasi.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/docs" element={<Dokumentasi />} />
      </Routes>
    </Layout>
  )
}

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stock from './pages/Stock';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Intro from './components/intro';
import Admin from './pages/Admin';
import Sold from './pages/Sold';



function App() {
  const [showIntro, setShowIntro] = useState(true);

  console.log("App carregado, showIntro:", showIntro);

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}

      <BrowserRouter>
        <div className="min-h-screen bg-[#0B0B0B] flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vendidos" element={<Sold />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contactos" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
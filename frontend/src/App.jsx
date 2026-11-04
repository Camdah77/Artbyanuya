import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './pages/footer';

// Importera sidorna
import Home from './pages/home';
import OriginalArt from './pages/OriginalArt';
import MyStory from './pages/story';
import Camilla from './pages/camilla';
import Contact from './pages/contact';
import Exhibitions from './pages/exhibitions';
import Fineart from './pages/fineart';
import Gallery from './pages/gallery';
import Interior from './pages/interior';
import Media from './pages/media';
import Soldart from './pages/soldart';
import Some from './pages/some';
import Studio from './pages/studio';
import Memory from './pages/memo/memory';

function App() {
  const [message, setMessage] = useState('Laddar...');

  useEffect(() => {
    axios.get('http://localhost:8000/api/data/')
      .then(response => setMessage(response.data.message))
      .catch(() => setMessage("Kunde inte hämta data."));
  }, []);

  return (
    <Router>
      {/* Navbaren ligger alltid kvar överst på alla sidor */}
      <Navbar />

      {/* Här skiftar innehållet beroende på URL-adressen */}
      <Routes>
        <Route path="/" element={<Home backendMessage={message} />} />

        {/* Dropdown: Gallery */}
        <Route path="/gallery/original" element={<OriginalArt />} />
        <Route path="/gallery/fine-art" element={<Fineart />} />
        <Route path="/gallery/interior" element={<Interior />} />
         <Route path="/gallery/sold" element={<Soldart />} />

        {/* Dropdown: Inspiration */}
        <Route path="/story" element={<MyStory />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/media" element={<Media />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/social" element={<Some />} />

        {/* Contact-sidan nås direkt på /contact */}
        <Route path="/contact" element={<Contact />} />
    
        {/* Övriga sidor / Lekplatser */}
        <Route path="/camilla" element={<Camilla />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/memory" element={<Memory />} />
      </Routes>

      {/* Footer ligger alltid längst ner på alla sidor */}
      <Footer />
    </Router>
  );
}

export default App;

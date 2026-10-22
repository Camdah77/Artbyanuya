import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

// Importera sidorna
import Home from './pages/home';
import OriginalArt from './pages/OriginalArt';
import MyStory from './pages/story';
import Camilla from './pages/camilla';
import Contact from './pages/contact';
import Exhibitions from './pages/exhibitions';
import Fineart from './pages/fineart';
import Gallery from './pages/gallery';
import Gameboard from './pages/mem';
import Interior from './pages/interior';
import Media from './pages/media';
import Soldart from './pages/soldart';
import Some from './pages/some';
import Studio from './pages/studio';

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

  {/* Dropdown: Camilla */}
  
        <Route path="/camilla/story" element={<MyStory />} />
        <Route path="/camilla/exhibitions" element={<Exhibitions />} />
        <Route path="/camilla/media" element={<Media />} />
        <Route path="/camilla/sold" element={<Soldart />} />
  {/* RÄTTAT: Matchar nu navbarens länk /camilla/social */}
        <Route path="/camilla/studio" element={<Studio />} />
        <Route path="/camilla/social" element={<Some />} />

  {/* RÄTTAT: Contact-sidan nås nu direkt på /contact */}
        <Route path="/contact" element={<Contact />} />
    
  {/* Övriga sidor / Lekplatser */}
        <Route path="/camilla" element={<Camilla />} />
        <Route path="/mem" element={<Gameboard />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
     </Router>
  );

}
export default App;
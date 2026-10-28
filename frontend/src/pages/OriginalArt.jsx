import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'; // TILLAGD: Denna import saknades och orsakade fel!

// 1. SEPARAT KOMPONENT FÖR VARJE TAVELKORT
function ArtworkCard({ art }) {
  const initialImage = art.image_env || art.image_main;
  const [currentImage, setCurrentImage] = useState(initialImage);

  useEffect(() => {
    setCurrentImage(initialImage);
  }, [initialImage]);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0 bg-white" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        
        {art.is_sold && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 fw-bold shadow-sm" style={{ zIndex: 2 }}>
            SÅLD
          </span>
        )}

        {/* Hover-bildväxling */}
        <div 
          className="position-relative cursor-pointer"
          style={{ height: '380px', overflow: 'hidden' }}
          onMouseEnter={() => art.image_detail && setCurrentImage(art.image_detail)}
          onMouseLeave={() => setCurrentImage(initialImage)}
        >
          {currentImage ? (
            <img 
              src={currentImage} 
              className="w-100 h-100" 
              alt={art.title} 
              style={{ objectFit: 'cover', transition: 'all 0.4s ease' }}
            />
          ) : (
            <div className="bg-light text-center d-flex align-items-center justify-content-center h-100 text-muted">
              Bild saknas
            </div>
          )}
        </div>

        {/* Text & Detaljer */}
        <div className="card-body d-flex flex-column p-4 text-start">
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <h3 className="h5 fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.3px', fontFamily: 'Montserrat, sans-serif' }}>{art.title}</h3>
            {art.year && <span className="badge bg-light text-dark border p-2 small">{art.year}</span>}
          </div>
          
          <p className="text-muted small flex-grow-1 mb-3" style={{ lineHeight: '150%', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>
            {art.description || "Ett unikt originalverk skapat i akryl eller olja."}
          </p>
          
          <div className="d-flex gap-2 mb-3">
            {art.size && (
              <span className="text-secondary small bg-light px-2 py-1 rounded border" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {art.size} cm
              </span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <div>
              <span className="text-muted d-block small" style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>Price</span>
              <span className="fs-5 fw-bold text-dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {art.price ? `${Number(art.price).toLocaleString('sv-SE')} kr` : "Pris på begäran"}
              </span>
            </div>
            <Link className="btn btn-outline-dark btn-sm px-4 py-2 fw-semibold rounded-pill" to={`/gallery/original`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Read More
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. HUVUDKOMPONENTEN
export default function OriginalArt() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // STATS FÖR FILTRERING & SORTERING
  const [statusFilter, setStatusFilter] = useState('all'); // all, available, sold
  const [selectedTag, setSelectedTag] = useState('all');   // all, ansikte, abstrakt, etc.
  const [sortBy, setSortBy] = useState('default');         // default, price-low, price-high, size-large

  useEffect(() => {
    axios.get('http://localhost:8000/api/data/')
      .then(response => {
        const originalOnly = response.data.filter(art => art.category === 'original');
        setArtworks(originalOnly);
        setLoading(false);
      })
      .catch(error => {
        console.error("Kunde inte hämta originalverk:", error);
        setLoading(false);
      });
  }, []);

  // 1. EXTRAHERA ALLA UNIKA TAGGAR DYNAMISKT FRÅN KONSTVERKEN (när databasen har dem)
  // Om art.tags inte finns än, använder vi en tom lista som fallback
  const allTags = ['all', ...new Set(artworks.flatMap(art => art.tags || []))];

  // 2. FILTRERA LISTAN
  const filteredArtworks = artworks.filter(art => {
    // Statusfilter (Tillgänglig / Såld)
    const matchesStatus = statusFilter === 'available' ? !art.is_sold : statusFilter === 'sold' ? art.is_sold : true;
    
    // Taggfilter (Ansikte, Abstrakt etc.)
    // Om din API skickar taggar som en array, t.ex. ["abstrakt", "ansikte"]
    const matchesTag = selectedTag === 'all' ? true : art.tags?.includes(selectedTag);

    return matchesStatus && matchesTag;
  });

  // 3. SORTERA DEN FILTRERADE LISTAN
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;
    
    // Sortering på storlek (antar formatet "60x80" eller bara en siffra, vi gör en enkel rensning för säkerhets skull)
    const sizeA = parseInt(a.size) || 0;
    const sizeB = parseInt(b.size) || 0;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'size-large') return sizeB - sizeA;
    return 0; // standard (ingen sortering)
  });

  return (
    <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Original Art</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Vibrant art inspired from every corner of the world.
          </p>
        </div>
      </div>

      {/* FILTER & SORTERINGS-PANEL */}
      <div className="bg-light p-4 rounded-4 mb-5 text-start shadow-sm">
        <div className="row g-3 align-items-center">
          
          {/* Status-filter */}
          <div className="col-md-4">
            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Status</label>
            <div className="d-flex gap-2">
              {['all', 'available', 'sold'].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold flex-grow-1 ${statusFilter === status ? 'btn-dark' : 'btn-outline-dark bg-white'}`}
                  onClick={() => setStatusFilter(status)}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}
                >
                  {status === 'all' ? 'Alla' : status === 'available' ? 'Tillgängliga' : 'Sålda'}
                </button>
              ))}
            </div>
          </div>

          {/* Tagg-filter */}
          <div className="col-md-4">
            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Kategori / Motiv</label>
            <select 
              className="form-select form-select-sm rounded-pill px-3 py-2" 
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {/* Om du vill testa innan databasen har taggar, hårdkoda: ['all', 'ansikte', 'djur', 'landskap', 'abstrakt'] */}
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'Alla motiv' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sortering */}
          <div className="col-md-4">
            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sortera efter</label>
            <select 
              className="form-select form-select-sm rounded-pill px-3 py-2" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="default">Standardordning</option>
              <option value="price-low">Pris: Lägst till högst</option>
              <option value="price-high">Pris: Högst till lägst</option>
              <option value="size-large">Storlek: Störst först</option>
            </select>
          </div>

        </div>
      </div>

      {/* RENDERINGS-LOGIK */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Laddar...</span>
          </div>
        </div>
      ) : sortedArtworks.length === 0 ? (
        <div className="text-center my-5 py-5">
          <p className="text-muted fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Inga konstverk matchar dina valda filter.</p>
        </div>
      ) : (
        /* Renderar nu sortedArtworks */
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sortedArtworks.map((art) => (
            <ArtworkCard key={art.id} art={art} />
          ))}
        </div>
      )}
    </Container>
  );
}

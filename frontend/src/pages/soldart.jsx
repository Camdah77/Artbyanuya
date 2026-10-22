import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

// 1. EN HELT EGEN KORTKOMPONENT BARA FÖR DIN SÅLDA KONST
function SoldArtworkCard({ art }) {
  const initialImage = art.image_env || art.image_main;
  const [currentImage, setCurrentImage] = useState(initialImage);

  useEffect(() => {
    setCurrentImage(initialImage);
  }, [initialImage]);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border bg-white" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Röd banner som visar att verket har hittat sitt hem */}
        <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 fw-bold shadow-sm" style={{ zIndex: 2 }}>
          SOLD
        </span>

        {/* Bildbox med växling vid hover */}
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
            {art.description || "Ett unikt originalverk som har hittat sitt hem."}
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
              <span className="fs-7 text-danger-emphasis" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
export default function SoldArt() {
  const [soldArtworks, setSoldArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/data/')
      .then(response => {
        // STRÄNG FILTRERING: Hämtar ENBART konstverk där is_sold är exakt true
        const soldOnly = response.data.filter(art => art.is_sold === true);
        setSoldArtworks(soldOnly);
        setLoading(false);
      })
      .catch(error => {
        console.error("Kunde inte hämta sålda konstverk:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sold Art</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            A collection of past works that have found their forever homes. Each piece represents a unique chapter of my creative journey.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Laddar konstverk...</span>
          </div>
        </div>
      ) : soldArtworks.length === 0 ? (
        <div className="text-center my-5 py-5">
          <p className="text-muted fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Just nu visas inga sålda verk här.</p>
        </div>
      ) : (
        /* RÄTTAT GRID: row-cols-md-3 tvingar in tavlorna i ett vackert 3-kolumnsmönster! */
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {soldArtworks.map((art) => (
            <SoldArtworkCard key={art.id} art={art} />
          ))}
        </div>
      )}
    </Container>
  );
}

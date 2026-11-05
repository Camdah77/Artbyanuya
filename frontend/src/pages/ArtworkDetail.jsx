import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ArtworkDetail() {
  const { id } = useParams(); // Hämtar ID:t från URL:en (t.ex. "3")
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // Vi hämtar all data och letar rätt på det specifika konstverket baserat på ID
    axios.get('http://localhost:8000/api/data/')
      .then(response => {
        const foundArt = response.data.find(item => item.id === parseInt(id));
        setArt(foundArt);
        if (foundArt) {
          // Sätt standardvisningsbilden (miljöbild eller huvudbild)
          setMainImage(foundArt.image_main || foundArt.image_env);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Kunde inte hämta detaljer för konstverket:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading artwork...</span>
        </div>
      </Container>
    );
  }

  if (!art) {
    return (
      <Container className="text-center py-5">
        <h2>Artwork not found</h2>
        <Link to="/gallery/original" className="btn btn-dark mt-3">Back to Gallery</Link>
      </Container>
    );
  }

  // Samla alla tillgängliga bilder i en lista för tumnaglar
  const galleryImages = [art.image_main, art.image_env, art.image_detail].filter(Boolean);

  return (
    <Container className="py-5 text-start" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Brödsmulor / Tillbakalänk */}
      <Link to="/gallery/original" className="text-decoration-none text-muted small d-block mb-4">
        ← Back to Gallery
      </Link>

      <Row className="gy-5">
        {/* VÄNSTER: BILDGALLERI */}
        <Col lg={7}>
          {/* Stora bilden */}
          <div className="bg-light rounded shadow-sm mb-3" style={{ overflow: 'hidden', maxHeight: '600px' }}>
            <img 
              src={mainImage} 
              alt={art.title} 
              className="w-100 h-100" 
              style={{ objectFit: 'contain', maxHeight: '600px' }}
            />
          </div>

          {/* Tumnaglar för att byta bild (om det finns fler än 1 bild) */}
          {galleryImages.length > 1 && (
            <div className="d-flex gap-2 flex-wrap">
              {galleryImages.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className={`cursor-pointer rounded border ${mainImage === imgUrl ? 'border-dark shadow-sm' : 'border-light'}`}
                  style={{ width: '80px', height: '80px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setMainImage(imgUrl)}
                >
                  <img src={imgUrl} alt="Tumnagel" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </Col>

        {/* HÖGER: PRODUKTINFO */}
        <Col lg={5} className="ps-lg-5 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h1 className="fw-bold h2 text-dark mb-0">{art.title}</h1>
              {art.is_sold ? (
                <span className="badge bg-danger px-3 py-2 fw-bold">SOLD</span>
              ) : (
                <span className="badge bg-secondary px-3 py-2 fw-bold">AVAILABLE</span>
              )}
            </div>

            <hr />

            {/* Specifikationer */}
            <div className="my-4 small text-muted">
              {art.width && art.height && (
                <div className="mb-2"><strong>Size:</strong> {Math.round(art.width)} x {Math.round(art.height)} cm</div>
              )}
              {art.category && (
                <div className="mb-2 text-capitalize"><strong>Category:</strong> {art.category}</div>
              )}
              {art.orientation && (
                <div className="mb-2 text-capitalize"><strong>Orientation:</strong> {art.orientation}</div>
              )}
              {art.created_at && (
                <div className="mb-2"><strong>Created:</strong>  {art.created_at}</div>
              )}
            </div>

            {/* Beskrivning */}
            <h5 className="fw-bold text-dark mt-4">About the Artwork</h5>
            <p className="text-secondary" style={{ lineHeight: '1.7', fontSize: '15px', whiteSpace: 'pre-line' }}>
            {art.description || "This is a unique work painted and signed by Camilla Anuya Dahlstrom. A certificate will come with. Pick up in Stockholm or world wide shipping."}
            </p>
          </div>

          {/* Prisbox och Köpknapp */}
          <div className="p-4 bg-light rounded mt-5 border d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted d-block small text-uppercase" style={{ fontSize: '11px' }}>Price:</span>
              <span className="fs-3 fw-bold text-dark">
                {art.price ? `${Number(art.price).toLocaleString('sv-SE')} kr` : "Pris på begäran"}
              </span>
            </div>
            
            {!art.is_sold ? (
              <Link to="/contact" className="btn btn-dark px-4 py-2 rounded-pill fw-semibold shadow-sm">
                Inquire / Buy
              </Link>
            ) : (
              <button className="btn btn-secondary px-4 py-2 rounded-pill fw-semibold" disabled>
                The artwork is sold
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

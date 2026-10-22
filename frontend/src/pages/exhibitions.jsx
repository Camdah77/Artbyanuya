import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hämtar utställningsdatan från ditt Django-API
  useEffect(() => {
    axios.get('http://localhost:8000/api/exhibitions/')
      .then(response => {
        setExhibitions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Kunde inte hämta utställningar:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Exhibitions</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Explore my artistic journey through time and space. Here you can discover my past and upcoming exhibitions, from local art galleries to international venues.
          </p>
        </div>
      </div>

      {/* LADDNINGSSPINNER */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Laddar utställningar...</span>
          </div>
        </div>
      ) : exhibitions.length === 0 ? (
        <div className="text-center my-5 py-5">
          <p className="text-muted fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Just nu finns inga utställningar registrerade i databasen.</p>
        </div>
      ) : (
        /* UTSTÄLLNINGSKORT (Bootstrap Grid - 3 per rad på dator, 1 på mobil) */
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {exhibitions.map((exhib) => (
            <Col key={exhib.id}>
              <Card className="h-100 shadow-sm border bg-white" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                
                {/* Utställningsbild (om du har sparat en Cloudinary-länk, annars en stilren platshållare) */}
                {exhib.image_main ? (
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img 
                      src={exhib.image_main} 
                      className="w-100 h-100" 
                      alt={exhib.gallery} 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="bg-light text-center d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                    <span className="text-muted small fst-italic" style={{ fontFamily: 'Montserrat, sans-serif' }}>Bild saknas</span>
                  </div>
                )}

                <Card.Body className="p-4 text-start d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-baseline mb-3">
                    <h3 className="h5 fw-bold mb-0" style={{ color: '#9e7e3b', fontFamily: 'Montserrat, sans-serif' }}>
                      {exhib.gallery}
                    </h3>
                    <span className="badge bg-light text-dark border p-2 small" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {exhib.year}
                    </span>
                  </div>
                  
                  <p className="text-muted small mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <strong>Typ:</strong> {exhib.exhibtype}
                  </p>
                  
                  {exhib.arrangeby && (
                    <p className="text-muted small mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <strong>Arrangör:</strong> {exhib.arrangeby}
                    </p>
                  )}

                  {/* Om du har lagt in en länk till galleriet/mer info dyker knappen upp automatiskt */}
                  {exhib.readmore && (
                    <div className="mt-auto pt-3 border-top w-100">
                      <a 
                        href={exhib.readmore} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-semibold w-100"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        More info
                      </a>
                    </div>
                  )}
                </Card.Body>

              </Card>
            </Col>
          ))}
        </div>
      )}
    </Container>
  );
}

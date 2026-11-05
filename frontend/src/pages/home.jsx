import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselBootstrap from 'react-bootstrap/Carousel';
  import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const MAX_VISIBILITY = 3;

// ========================================================
// 1. STAPLADE KORT-KOMPONENTER (Från din CodePen-karusell)
// ========================================================

const ArtworkStoryCard = ({ art }) => {
  const displayImage = art.image_env || art.image_main;
  return (
    <div className='card bg-white rounded shadow border-0 overflow-hidden text-start h-100' style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ height: '240px', overflow: 'hidden', backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {displayImage ? (
          <img src={displayImage} alt={art.title} className="w-100 h-100" style={{ objectFit: 'contain', padding: '10px' }} />
        ) : (
          <div className="bg-light text-center d-flex align-items-center justify-content-center h-100 text-muted small">Bild saknas</div>
        )}
      </div>
      <div className="p-4 d-flex flex-column" style={{ minHeight: '220px' }}>
        <h3 className="h5 fw-bold mb-2" style={{ color: '#9e7e3b' }}>{art.title}</h3>
        <p className="text-secondary small flex-grow-1 mb-3" style={{ lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {art.description || "Ett unikt tillgängligt originalverk skapat med struktur och passion."}
        </p>
        <div className="mt-auto">
          <Link to={`/gallery/original/${art.id}`} className="btn btn-outline-dark btn-sm w-100 rounded-pill fw-semibold">Read More</Link>
        </div>
      </div>
    </div>
  );
};

const StoryCarousel = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);

  return (
    <div className='carousel d-flex align-items-center justify-content-center position-relative my-4' style={{ minHeight: '480px', width: '550px', margin: '0 auto' }}>
      {active > 0 ? (
        <button className='btn btn-light shadow-sm rounded-circle p-2 position-absolute' style={{ zIndex: 11, left: '-20px', top: '50%', transform: 'translateY(-50%)' }} onClick={() => setActive(i => i - 1)}>
          <TiArrowLeftOutline size={28} />
        </button>
      ) : (
        <div style={{ width: '44px', position: 'absolute', left: '-20px' }}></div>
      )}

      <div className="position-relative" style={{ width: '360px', height: '440px' }}>
        {React.Children.map(children, (child, i) => (
          <div 
            className='card-container position-absolute w-100 top-0' 
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--direction': Math.sign(active - i),
              '--abs-offset': Math.abs(active - i) / 3,
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
              transform: `translateX(${(i - active) * 45}px) scale(${1 - Math.abs(i - active) * 0.12})`,
              zIndex: 10 - Math.abs(i - active),
              transition: 'all 0.4s ease'
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {active < count - 1 ? (
        <button className='btn btn-light shadow-sm rounded-circle p-2 position-absolute' style={{ zIndex: 11, right: '-20px', top: '50%', transform: 'translateY(-50%)' }} onClick={() => setActive(i => i + 1)}>
          <TiArrowRightOutline size={28} />
        </button>
      ) : (
        <div style={{ width: '44px', position: 'absolute', right: '-20px' }}></div>
      )}
    </div>
  );
};

// ========================================================
// 2. STARTSIDANS HUVUDKOMPONENT
// ========================================================
export default function Home() {
  const [index, setIndex] = useState(0);
  const [availableArt, setAvailableArt] = useState([]);
  const [loadingArt, setLoadingArt] = useState(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/data/')
      .then(response => {
        const originalOnly = response.data.filter(art => 
          (art.category?.toLowerCase() === 'original' || art.category === 'Original Art') && 
          !art.is_sold
        );
        setAvailableArt(originalOnly);
        setLoadingArt(false);
      })
      .catch(error => {
        console.error("Kunde inte hämta data till startsidan:", error);
        setLoadingArt(false);
      });
  }, []);

  const heroStyle = (imageUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'center'
  });

  return (
    <div>
      {/* HERO CAROUSEL */}
      <CarouselBootstrap activeIndex={index} onSelect={handleSelect} controls={true} indicators={true} fade>
        <CarouselBootstrap.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328723/Anuya/hero_1920x1080/Hero_strong_epug2a.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Strong & Proud</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Powerful art by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </CarouselBootstrap.Item>

        <CarouselBootstrap.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328711/Anuya/hero_1920x1080/hero_embrace_ly1m8e.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Embraced</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Original artwork by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </CarouselBootstrap.Item>

        <CarouselBootstrap.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328715/Anuya/hero_1920x1080/hero_life1_xf8bsi.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Life</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Colorful art by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </CarouselBootstrap.Item>
      </CarouselBootstrap>

      {/* VÄLKOMNANDE TEXT */}
      <Container className="my-5 py-4">
        <div className="row justify-content-start text-start">
          <div className="col-md-8">
            <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome,</h2>
            <p className="text-muted fs-6" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
              This is my colorful corner of art. 
              I hope to inspire you with my story and the art progress from my studio.
              If you are interested in my art, please visit the gallery and feel free to contact me for any inquiries.<br /><br />
              <strong>Camilla Anuya</strong>
            </p>
          </div>
        </div>
      </Container>

      {/* FULLBREDS-BOX: 60% guld-opacitet sträcker sig över hela skärmen */}
      <div style={{ backgroundColor: 'rgba(158, 126, 59, 0.6)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: '60px 0' }} className="mb-5">
        <Container>
          <div className="row justify-content-start text-start">
            <div className="col-md-8">
              <h3 className="fw-bold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Available Artwork</h3>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {loadingArt ? (
              <div className="spinner-border text-white my-4" role="status">
                <span className="visually-hidden">Loading studio artworks...</span>
              </div>
            ) : availableArt.length === 0 ? (
              <Card style={{ width: '18rem' }} className="shadow-sm border-0 text-start">
                <Card.Img variant="top" src="https://cloudinary.com" />
                <Card.Body>
                  <Card.Title className="fw-bold">Autumn Breeze</Card.Title>
                  <Card.Text className="text-secondary small mt-2">
                    When the journey matters more than the destination. ✨ Created in 2022.
                  </Card.Text>
                  <Link to={`/gallery/original/2`} style={{ fontFamily: 'Montserrat, sans-serif' }} className="btn btn-secondary w-100 rounded-pill">More Info</Link>
                </Card.Body>
              </Card>
            ) : (
              <StoryCarousel>
                {availableArt.map(art => (
                  <ArtworkStoryCard key={art.id} art={art} />
                ))}
              </StoryCarousel>
            )}
          </div>   
       </Container>
      </div>
    </div>
  );
}
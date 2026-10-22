import { Link } from 'react-router-dom';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'; // RÄTTAT: Denna rad saknades och orsakade kraschen!

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
      <Carousel activeIndex={index} onSelect={handleSelect} controls={true} indicators={true} fade>
        <Carousel.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328723/Anuya/hero_1920x1080/Hero_strong_epug2a.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-4 fw-bold text-white mb-3">Strong & Proud</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Original artwork by Anuya</p>
              <Link className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-sm" to="/gallery/original">Utforska Galleriet</Link>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328711/Anuya/hero_1920x1080/hero_embrace_ly1m8e.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-4 fw-bold text-white mb-3">Embraced</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Original artwork by Anuya</p>
              <Link className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-sm" to="/gallery/original">Utforska Galleriet</Link>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328715/Anuya/hero_1920x1080/hero_life1_xf8bsi.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-4 fw-bold text-white mb-3">Life</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Original artwork by Anuya</p>
              <Link className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-sm" to="/gallery/original">Utforska Galleriet</Link>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* VÄLKOMNANDE TEXT */}
      <Container className="my-5 py-4">
        <div className="row justify-content-start text-start">
          <div className="col-md-8">
            <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Enter a World of Art</h2>
            <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
              Discover a world of color, emotions, and textures. Here you will find unique original paintings created with passion and care. Click through to the gallery to see available works.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

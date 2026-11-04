import { Link } from 'react-router-dom';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
// RÄTTAT: Importerna för Row, Col och Card lades till här under så att sidan inte kraschar!
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ReactCardFlipModule from "react-card-flip";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const ReactCardFlip = ReactCardFlipModule.default || ReactCardFlipModule;

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
        <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328723/Anuya/hero_1920x1080/Hero_strong_epug2a.jpg')  }>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Strong & Proud</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Powerful art by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328711/Anuya/hero_1920x1080/hero_embrace_ly1m8e.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Embraced</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Original artwork by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={heroStyle('https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328715/Anuya/hero_1920x1080/hero_life1_xf8bsi.jpg')}>
            <div className="container text-center text-white p-5 pb-5">
              <h1 className="display-6 fw-bold text-white mb-2">Life</h1>
              <p className="lead fw-normal text-light mb-4 fs-4">Colorful art by Anuya</p>
              <Link className="btn btn-outline-light" to="/gallery/original"> Visit the gallery </Link>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

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

      {/* THREE CARDS */}
      {/* RÄTTAT: Lagt till en Container runt raden så att korten inte ligger klistrade mot skärmkanterna */}
      <Container className="mb-5">
        <Row className="g-4">
          
          {/* Kort 1: My Story */}
          <Col md={4}>
            <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
              <Card.Img 
                variant="top" 
                src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501561/cad_frame_qrq1yw.png"  
                alt="Artist Camilla Anuya" 
                className="rounded-3 shadow-sm"
              />
              <Card.Body className="p-0 text-start">
                <Card.Title 
                  className="fw-bold fs-5 mt-4 fst-italic" 
                  style={{ color: '#9e7e3b' }}
                >
                  My Story
                </Card.Title>
                <Card.Text className="text-secondary small mb-2 mt-3" style={{ lineHeight: '2' }}>
                  I sold my first painting in 2018. Since then, I have been painting and selling my artworks all over the world.
                  I love painting faces from different cultures, and I often combine them with abstract elements and the power of animals.
                </Card.Text>
                {/* RÄTTAT: Ändrat länk från /camilla till /camilla/story så den matchar din App.jsx-rutt */}
                <Link to="/story" className="text-dark fw-semibold" style={{ fontSize: '15px' }}>My story</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Kort 2: Exhibitions */}
          <Col md={4}>
            <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
              <Card.Img 
                variant="top" 
                src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501561/studuio_frame_dub64s.png"  
                alt="Exhibitions" 
                className="rounded-3 shadow-sm"
              />
              <Card.Body className="p-0 text-start">
                <Card.Title 
                  className="fw-bold fs-5 mt-4 fst-italic" 
                  style={{ color: '#9e7e3b' }}
                >
                  Exhibitions
                </Card.Title>
                <Card.Text className="text-secondary small mb-3 mt-3" style={{ lineHeight: '2' }}>
                  Discover my original artworks at upcoming and previous exhibitions.
                  I will soon open my 3D exhibition so you will be able to see my artworks in a virtual gallery.
                  Sign up for news, exhibitions and upcoming events!
                </Card.Text>
                {/* RÄTTAT: Ändrat rutt från /inspiration/exhibitions till /camilla/exhibitions så den faktiskt fungerar med din App.jsx */}
                <Link to="/exhibitions"  className="text-dark fw-semibold" style={{ fontSize: '15px' }}>
                  Exhibitions →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Kort 3: Studio News */}
          <Col md={4}>
            <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
              <Card.Img 
                variant="top" 
                src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501559/School_nwtpst.png"  
                alt="Studio News" 
                className="rounded-3 shadow-sm"
              />
              <Card.Body className="p-0 text-start">
                <Card.Title 
                  className="fw-bold fs-5 mt-4 fst-italic" 
                  style={{ color: '#9e7e3b' }}
                >
                  Studio News
                </Card.Title>
                <Card.Text className="text-secondary small mb-3 mt-3" style={{ lineHeight: '2' }}>
                  Welcome to my studio, where creativity knows no bounds. Explore my latest artworks, discover the stories behind each piece, and immerse yourself in the vibrant world of art. 
                  You can also find tips and inspiration for your own artistic journey.
                </Card.Text>
                {/* RÄTTAT: Ändrat rutt från /inspiration/studio till /camilla/studio så den stämmer med App.jsx */}
                <Link to="/studio" className="text-dark fw-semibold" style={{ fontSize: '15px' }}>
                  Visit my Studio →
                </Link>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function MyStory() {
  return (
  
   <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>My creative journey</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Welcome behind the scenes to my creative sanctuary. This is where colors splash, ideas come alive, and every artwork begins its story.
          </p>
        </div>
      </div>


      <Row className="g-4">
        <Col md={4}>
  <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
    <Card.Img 
      variant="top" 
      src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501561/cad_frame_qrq1yw.png"  
      alt="Artist Camilla Anuya" 
      className="rounded-3 shadow-sm"
    />
    <Card.Body className="p-0 text-start">
      
      {/*  Ökat avstånd till bilden (mt-4), ändrat färg till guld (#9e7e3b) och gjort den kursiv (fst-italic) */}
      <Card.Title 
        className="fw-bold fs-5 mt-4 fst-italic" 
        style={{ color: '#9e7e3b' }}
      >
        My Story
      </Card.Title>
      
      {/* Ökat avståndet mellan titel och text genom mt-3 (margin-top) */}
      <Card.Text className="text-secondary small mb-3 mt-3" style={{ lineHeight: '2' }}>
        I sold my first painting in 2018. Since then, I have been painting and selling my artworks all over the world.
        I love painting faces from different cultures, and I often combine them with abstract elements and the power of animals.
        
      </Card.Text>
      
      <Link 
        to="/camilla" 
        className="text-dark d-inline-block"
        style={{ fontSize: '15px' }}
      >
        My creative story
      </Link>
    </Card.Body>
  </Card>
</Col>


        <Col md={4}>
  <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
    <Card.Img 
      variant="top" 
      src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501561/studuio_frame_dub64s.png"  
      alt="Artist Camilla Anuya" 
      className="rounded-3 shadow-sm"
    />
    <Card.Body className="p-0 text-start">
      
      {/*  Ökat avstånd till bilden (mt-4), ändrat färg till guld (#9e7e3b) och gjort den kursiv (fst-italic) */}
      <Card.Title 
        className="fw-bold fs-5 mt-4 fst-italic" 
        style={{ color: '#9e7e3b' }}
      >
        Exhibitions
      </Card.Title>
      
      {/* Ökat avståndet mellan titel och text genom mt-3 (margin-top) */}
      <Card.Text className="text-secondary small mb-3 mt-3" style={{ lineHeight: '2' }}>
        Discover my original artworks at upcoming and previous exhibitions.
        I will soon open the my 3D exhibition so you will be able to see my artworks in a virtual gallery.
        Sign up for news, exhibitions and upcoming events!
        </Card.Text>
      
      <Link 
        to="/camilla/exhibitions" 
        className="text-dark d-inline-block"
        style={{ fontSize: '15px' }}
      >
        Exhibitions
      </Link>
    </Card.Body>
  </Card>
  </Col>


          <Col md={4}>
  <Card className="border-0 bg-transparent px-0" style={{ width: '100%' }}>
    <Card.Img 
      variant="top" 
      src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501559/School_nwtpst.png"  
      alt="Artist Camilla Anuya" 
      className="rounded-3 shadow-sm"
    />
    <Card.Body className="p-0 text-start">
      
      {/*  Ökat avstånd till bilden (mt-4), ändrat färg till guld (#9e7e3b) och gjort den kursiv (fst-italic) */}
      <Card.Title 
        className="fw-bold fs-5 mt-4 fst-italic" 
        style={{ color: '#9e7e3b' }}
      >
        Studio News
      </Card.Title>
      
      {/* Ökat avståndet mellan titel och text genom mt-3 (margin-top) */}
      <Card.Text className="text-secondary small mb-3 mt-3" style={{ lineHeight: '2' }}>
        Welcome to my studio, where creativity knows no bounds. Explore my latest artworks, discover the stories behind each piece, and immerse yourself in the vibrant world of art. 
        You can also find tips and inspiration for your own artistic journey.
        </Card.Text>
      
      <Link 
        to="/camilla/studio" 
        className="text-dark d-inline-block"
        style={{ fontSize: '15px' }}
      >
        Visit my Studio
      </Link>
    </Card.Body>
  </Card></Col>
      </Row>
    </Container>


)
}

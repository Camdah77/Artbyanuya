import "./carosel.scss"; 
import Carousel from 'react-bootstrap/Carousel';
import Container from "react-bootstrap/esm/Container";

export default function Media() {
  // Detta skapar en array med siffrorna 1 till 10 utan att använda hakparenteser:
  const items = Array.from(new Array(10), (val, index) => index + 1);


  return (
        <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Relax Studio</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Take a break and try out our memory game! 
          </p>
        </div>
      </div>
      <div id="carousel-wrapper" className="noselect" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Carousel>
          {items.map((item) => (
            <Carousel.Item key={item}>
              <div 
                className="d-flex justify-content-center align-items-center bg-secondary text-white" 
                style={{ height: '300px', fontSize: '2rem' }}
              >
                Item {item}
              </div>
              <Carousel.Caption>
                <h3>Slide {item} label</h3>
                <p>Beskrivning för media-element {item}.</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}

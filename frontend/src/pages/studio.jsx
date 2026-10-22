import Container from 'react-bootstrap/Container';

export default function Studio() {
  return (
    <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>The Studio</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Welcome behind the scenes to my creative sanctuary. This is where colors splash, ideas come alive, and every artwork begins its story.
          </p>
        </div>
      </div>

      {/* Här kan du lägga in dina studiobilder sen */}
      <div className="text-muted">Studiobilder och text...</div>
    </Container>
  );
}

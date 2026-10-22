import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Contact() {
  return (
    // RÄTTAT: Allt är nu insvept i en enda samlande container-div
    <div className="container my-5 justify-content-left py-4">
      
      {/* Rubrik & Beskrivning samma stil alla sidor */}
      <div className="row justify-content-left text-left mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Let's Connect</h2>
          <p className="text-muted fs-5" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
            Discover a world of color, emotions, and textures. Here you will find unique original paintings created with passion and care. Click through to the gallery to see available works.
          </p>
        </div>
      </div>
      
      {/* FORMULÄR-SEKTION */}
      <div className="row justify-content-left text-left">
        <div className="col-md-8">
          <Form>
            
            {/* Namn-fält */}
            <Form.Group as={Row} className="mb-4 align-items-left">
              <Form.Label column sm={3} className="fw-semibold text-dark">
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter your name" className="py-2" />
              </Col>
            </Form.Group>

            {/* Email-fält */}
            <Form.Group as={Row} className="mb-4 align-items-left   ">
              <Form.Label column sm={3} className="fw-semibold text-dark">
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="email" placeholder="Enter your email" className="py-2" />
              </Col>
            </Form.Group>
            
            {/* Intressen / Checkboxar */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-semibold text-dark">
                I am interested in
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  type="checkbox"
                  label="Workshop"
                  id="interest-workshop"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Exhibitions"
                  id="interest-exhibitions"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Buy a painting"
                  id="interest-buy"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Other"
                  id="interest-other"
                  className="mb-2"
                />
              </Col>
            </Form.Group>
            
            {/* Meddelande-fält */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-semibold text-dark">
                Message
              </Form.Label>
              <Col sm={9}>
                {/* RÄTTAT: Ändrat till as="textarea" och rows={4} så man får en stor, fin ruta att skriva i */}
                <Form.Control as="textarea" rows={4} placeholder="Write your message here..." />
              </Col>
            </Form.Group>
            
            {/* Skicka-knapp */}
            <Form.Group as={Row} className="mt-4">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button 
                  type="submit" 
                  className="px-5 py-2.5 fw-bold text-white border-0 shadow-sm" 
                  style={{ backgroundColor: '#9e7e3b', borderRadius: '6px' }}
                >
                  Submit
                </Button>
              </Col>
            </Form.Group>

          </Form>
        </div>
      </div>

    </div>
  );
}

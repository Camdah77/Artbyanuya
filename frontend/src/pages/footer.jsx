import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        <Row className="gy-4 text-start">
          
          {/* Kolumn 1: Om galleriet */}
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-uppercase" style={{ color: '#9e7e3b', letterSpacing: '1px' }}>Art by Anuya</h5>
            <p className="small text-muted" style={{ lineHeight: '160%' }}>
              Unika originalverk, fine art och modern inredningskonst skapad med passion och textur. 
            </p>
            <p className="small text-muted mb-0">© {new Date().getFullYear()} Anuya. All rights reserved.</p>
          </Col>

          {/* Kolumn 2: Snabblänkar */}
          <Col md={4} className="ps-md-5">
            <h5 className="fw-bold mb-3 text-uppercase" style={{ color: '#9e7e3b', letterSpacing: '1px' }}>Galleri</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/gallery/original" className="text-decoration-none text-muted link-light">Originalverk</Link></li>
              <li><Link to="/gallery/fine-art" className="text-decoration-none text-muted link-light">Fine Art</Link></li>
              <li><Link to="/gallery/interior" className="text-decoration-none text-muted link-light">Home Interior</Link></li>
              <li><Link to="/camilla/exhibitions" className="text-decoration-none text-muted link-light">Utställningar</Link></li>
            </ul>
          </Col>

          {/* Kolumn 3: Kontakt */}
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-uppercase" style={{ color: '#9e7e3b', letterSpacing: '1px' }}>Kontakt</h5>
            <p className="small text-muted mb-2">Har du frågor om ett konstverk eller vill boka ett studiobesök?</p>
            <ul className="list-unstyled small text-muted d-flex flex-column gap-2">
              <li><strong>E-post:</strong> info@artbyanuya.com</li>
              <li><strong>Studio:</strong> Stockholm, Sverige</li>
              <li className="mt-2">
                <Link to="/contact" className="btn btn-outline-light btn-sm px-3 rounded-pill" style={{ fontSize: '12px' }}>
                  Skicka meddelande
                </Link>
              </li>
            </ul>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

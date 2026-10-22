import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';       // TILLAGD: Behövs för Bootstraps länkstrukturer
import Navbar from 'react-bootstrap/Navbar'; // TILLAGD: Denna saknades och orsakade kraschen!
import NavDropdown from 'react-bootstrap/NavDropdown'; // TILLAGD: Gör dina menyer mycket säkrare i React

export default function MyNavbar() {
  return (
    // RÄTTAT: Använder rena React-Bootstrap-komponenter som stänger sig själva i rätt ordning
    <Navbar sticky="top" expand="lg" className="navbar-dark shadow-sm" style={{ backgroundColor: '#212529', fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        
        {/* RÄTTAT 1: Loggan ligger nu inuti en helt korrekt stängd Link-komponent */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-0">
          <img 
            src="https://res.cloudinary.com/dj9sie6nl/image/upload/v1792328790/Anuya/logo_300x300_tcxobj.png" 
            alt="Artbyanuya Logo" 
            width="65"  
            height="65" 
            className="me-2 rounded-circle"
          />
        </Navbar.Brand>

        {/* RÄTTAT: Bootstraps inbyggda responsiva hamburgerknapp */}
        <Navbar.Toggle aria-controls="collapsibleNavbar" />

        {/* Menyvalen */}
        <Navbar.Collapse id="collapsibleNavbar">
          <Nav className="me-auto ps-lg-4">
            
            {/* Dropdown: Gallery */}
            <NavDropdown title="Gallery" id="gallery-dropdown" className="px-1">
              <NavDropdown.Item as={Link} to="/gallery/original">Original Art</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gallery/fine-art">Fine Art</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gallery/interior">Home Interior</NavDropdown.Item>
            </NavDropdown>
            
            {/* Dropdown: Camilla */}
            <NavDropdown title="Camilla" id="camilla-dropdown" className="px-1">
              <NavDropdown.Item as={Link} to="/camilla/story">My story</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/camilla/exhibitions">Exhibitions</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/camilla/media">Media</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/camilla/sold">Sold Art</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/camilla/social">Social Media</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/camilla/studio">Studio</NavDropdown.Item>
            </NavDropdown>

            {/* Snabblänkar */}
            <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
            <Nav.Link as={Link} to="/mem" className="px-3">Memory</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

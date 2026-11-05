import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

// 1. SEPARAT KOMPONENT FÖR VARJE TAVELKORT
function ArtworkCard({ art }) {
  const initialImage = art.image_env || art.image_main;
  const [currentImage, setCurrentImage] = useState(initialImage);

  useEffect(() => {
    setCurrentImage(initialImage);
  }, [initialImage]);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0 bg-white" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        
        {art.is_sold && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 fw-bold shadow-sm" style={{ zIndex: 2 }}>
            SOLD
          </span>
        )}

        {/* Hover-bildväxling */}
        <div 
          className="position-relative cursor-pointer"
          style={{ height: '380px', overflow: 'hidden' }}
          onMouseEnter={() => art.image_detail && setCurrentImage(art.image_detail)}
          onMouseLeave={() => setCurrentImage(initialImage)}
        >
          {currentImage ? (
            <img 
              src={currentImage} 
              className="w-100 h-100" 
              alt={art.title} 
              style={{ objectFit: 'cover', transition: 'all 0.4s ease' }}
            />
          ) : (
            <div className="bg-light text-center d-flex align-items-center justify-content-center h-100 text-muted">
              Image missing
            </div>
          )}
        </div>

        {/* Text & Detaljer */}
        <div className="card-body d-flex flex-column p-4 text-start">
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <h3 className="h5 fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.3px', fontFamily: 'Montserrat, sans-serif' }}>{art.title}</h3>
            {art.created_at && (
              <span className="badge bg-light text-dark border p-2 small"> {art.created_at} </span>
            )}
          </div>
          
          {/* RÄTTAT: Lagt till avslutande </p> i slutet av beskrivningen så att inte HTML-strukturen går sönder! */}
          <p className="text-muted small flex-grow-1 mb-3" style={{ lineHeight: '150%', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>
            {art.description || "Unique original artwork created in acrylic and mixed media. Signed by the artist. Certificate included. Pick up in Stockholm or worldwide shipping."}
          </p>
          
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {art.width && art.height && (
              <span className="text-secondary small bg-light px-2 py-1 rounded border" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {Math.round(art.width)} x {Math.round(art.height)} cm
              </span>
            )}
            {art.size && art.size !== 'none' && (
              <span className="text-secondary small bg-light px-2 py-1 rounded border" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {art.size}
              </span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <div>
              <span className="text-muted d-block small" style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>Price</span>
              <span className="fs-5 fw-bold text-dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {art.price ? `${Number(art.price).toLocaleString('sv-SE')} kr` : "Pris på begäran"}
              </span>
            </div>
            <Link className="btn btn-outline-dark btn-sm px-4 py-2 fw-semibold rounded-pill" to={`/gallery/original/${art.id}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Read More
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. HUVUDKOMPONENTEN
export default function OriginalArt() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // STATS FÖR FILTRERING & SORTERING
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [selectedTag, setSelectedTag] = useState('all');   
  const [sortBy, setSortBy] = useState('default');         

  useEffect(() => {
    axios.get('http://localhost:8000/api/data/')
      .then(response => {
        console.log("Hämtad data från Django:", response.data);

        // Felsäkert filter: Matchar både 'original' och 'Original Art'
        const originalOnly = response.data.filter(art => 
          art.category?.toLowerCase() === 'original' || 
          art.category === 'Original Art'
        );
        
        setArtworks(originalOnly);
        setLoading(false);
      })
      .catch(error => {
        console.error("Could not load artwork:", error);
        setLoading(false);
      });
  }, []);

  // 1. EXTRAHERA ALLA UNIKA TAGGAR DYNAMISKT
  const allTags = ['all', ...new Set(artworks.flatMap(art => {
    if (!art.tags) return [];
    return art.tags.map(t => typeof t === 'object' ? t.name : t);
  }))];

  // 2. FILTRERA LISTAN
  const filteredArtworks = artworks.filter(art => {
    const matchesStatus = 
      statusFilter === 'available' ? !art.is_sold : 
      statusFilter === 'sold' ? art.is_sold : true;
    
    const matchesTag = selectedTag === 'all' ? true : art.tags?.some(t => {
      const tagName = typeof t === 'object' ? t.name : t;
      return tagName === selectedTag;
    });

    return matchesStatus && matchesTag;
  });

  // 3. SORTERA DEN FILTRERADE LISTAN
    // 3. SORTERA DEN FILTRERADE LISTAN
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (Number(a.price) || 0) - (Number(b.price) || 0);
    }
    if (sortBy === 'price-high') {
      return (Number(b.price) || 0) - (Number(a.price) || 0);
    }
    if (sortBy === 'size-large') {
      const areaA = (Number(a.width) || 0) * (Number(a.height) || 0);
      const areaB = (Number(b.width) || 0) * (Number(b.height) || 0);
      return areaB - areaA;
    }
    
    // STANDARD-SORTERING (default): Nyast till äldst baserat på skapandedatum
    // Detta hanterar både om created_at är ett rent årtal (t.ex. 2026) eller ett fullt datumsträng
    const dateA = a.created_at ? new Date(a.created_at).getTime() || Number(a.created_at) : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() || Number(b.created_at) : 0;
    
    return dateB - dateA; // Högst värde (nyast) hamnar först
  });


  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* VÄLKOMNANDE TEXT */}
      <div className="row justify-content-start text-start mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Original Art</h2>
          <p className="text-muted fs-6" style={{ lineHeight: '160%', fontFamily: 'Montserrat, sans-serif' }}>
              Original artwork inspired by the beauty of the world around us. <br />
              Feel free to contact me for any inquiries.<br />
          </p>
        </div>
      </div>
      
      {/* FILTERKONTROLLER */}
      <div className="d-flex flex-wrap gap-3 mb-5 justify-content-center bg-light p-4 rounded shadow-sm">
        {/* Status */}
        <div className="d-flex flex-column text-start">
          <label className="form-label small fw-bold text-muted text-uppercase">Status</label>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All artwork</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Taggar */}
        {allTags.length > 1 && (
          <div className="d-flex flex-column text-start">
            <label className="form-label small fw-bold text-muted text-uppercase">category / subject</label>
            <select className="form-select text-capitalize" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag === 'all' ? 'All subjects' : tag}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sortering */}
        <div className="d-flex flex-column text-start">
          <label className="form-label small fw-bold text-muted text-uppercase">Sort by</label>
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="size-large">Size: Large to Small</option>
          </select>
        </div>
      </div>

      {/* RÄTTAT: Hela denna sektion för att visa tavlorna hade klippts bort längst ner i din kod */}
      {sortedArtworks.length === 0 ? (
        <div className="text-center py-5 bg-light rounded border">
          <p className="text-muted mb-0 fs-5">No artwork matches your current filters.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {sortedArtworks.map(art => (
            <ArtworkCard key={art.id} art={art} />
          ))}
        </div>
      )}
    </Container>
  )
}

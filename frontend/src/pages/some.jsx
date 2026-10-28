import { useState } from 'react';
import PopUp from './popup'; // Importerar popup-komponenten
import './popup.css';

function Some() {
  const [showPopUp, setShowPopUp] = useState(false);
  
  const image = { 
    name: "Pop!", 
    src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792501561/cad_frame_qrq1yw.png" 
  };

  return (
    <div>
      <button onClick={() => setShowPopUp(true)}>{image.name}</button>
      
      <PopUp showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        {/* Korrigerat från image.url till image.src */}
        <img className='enlarged' src={image.src} alt={image.name} />
      </PopUp>
    </div>
  );
}

export default Some;

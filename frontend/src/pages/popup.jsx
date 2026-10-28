import './popup.css';

// Komponenten tar emot props som skickas från Some-komponenten
function PopUp({ showPopUp, closePopUp, children }) {
  // Om showPopUp är false, rita inte ut någonting alls
  if (!showPopUp) return null;

  return (
    <div className="popup-overlay" onClick={closePopUp}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={closePopUp}>X</button>
        {children} {/* Här hamnar din <img>-tagg */}
      </div>
    </div>
  );
}

export default PopUp;

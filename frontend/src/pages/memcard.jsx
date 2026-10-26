import React from "react";

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    
    function handleClick() {
        // Om kortet inte redan är vänt, inte är matchat och spelet inte är låst (stopflip)
        if (!toggled && !item.matched && !stopflip) {
            handleSelectedCards(item);
        }
    }

    return (
        // Det är HÄR klasserna 'item' och 'toggled' måste sättas dynamically!
        <div className={`item ${toggled ? "toggled" : ""}`} onClick={handleClick}>
            {/* Framsidan med bilden */}
            <img className="face" src={item.img} alt={item.name} />
            
            {/* Baksidan (mönstret/bilden från Cloudinary via CSS) */}
            <div className="back"></div>
        </div>
    );
}

export default Card;

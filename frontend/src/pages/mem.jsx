import React from "react";
import Data from "./memdata.jsx";
import Card from "./memcard";
import './mem.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function GameBoard() {
    const [cardsArray, setCardsArray] = React.useState([]); 
    const [moves, setMoves] = React.useState(0);
    const [firstCard, setFirstCard] = React.useState(null);
    const [secondCard, setSecondCard] = React.useState(null);
    const [stopFlip, setStopFlip] = React.useState(false); 
    const [won, setWon] = React.useState(0);

    //this function start new Game
    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);
    }

    //this function helps in storing the firstCard and secondCard value
    function handleSelectedCards(item) {
        console.log(typeof item);
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    // if two have been selected then we check if the images are same or not,
    //if they are same then we stop the flipping ability
    // else we turn them back
    React.useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => {
                    return prevArray.map((unit) => {
                        if (unit.name === firstCard.name) {
                            return { ...unit, matched: true };
                        } else {
                            return unit;
                        }
                    });
                });
                setWon((preVal) => preVal + 1);
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    //after the slected images have been checked for 
    //equivalency we empty the firstCard and secondCard component
    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    //starts the game for the first time.
    React.useEffect(() => {
        NewGame();
    }, []);

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

        <div className="memory-page-wrapper">      
             <Row>
                <Col></Col>
                <Col>
                    <div className="board">
                    {
                    // cards component help in coverting the 
                    // data from array to visible data for screen
                        cardsArray.map((item) => (
                            <Card
                             item={item}
                             key={item.id}
                             handleSelectedCards={handleSelectedCards}
                                toggled={
                                item === firstCard ||
                                item === secondCard ||
                                item.matched === true
                               }
                                stopflip={stopFlip}
                        />
                    ))
                }
            </div>
            {won !== 6 ? (
                <div className="comments">Moves : {moves}</div>
            ) : (
                <div className="comments">
                    Congratulations! You won! {moves} moves 
                </div>
            )}
                    </Col>
        
                    <Col>
                        <button className="button" onClick={NewGame}>
                        New Game
                        </button>
                    </Col>
                    </Row>

         </div>
                 </Container>  

    )
          
    
}

export default GameBoard;
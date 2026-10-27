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

    // Startar ett nytt spel och skapar en säker kopia av datan innan den slumpas
    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = [...Data].sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);
    }

    // Hanterar val av kort
    function handleSelectedCards(item) {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    // Kollar om två valda kort matchar varandra
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

    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    // Startar spelet automatiskt första gången sidan laddas
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

               <div className="memory-page-wrapper p-4 rounded-3">      
                <Row className="justify-content-center align-items-center g-4">
                    {/* SPELPLANEN - Får mer uttrymme (8 av 12 kolumner) */}
                    <Col lg={8} md={10} xs={12}>
                        <div className="board">
                            {cardsArray.map((item) => (
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
                            ))}
                        </div>
                        
                        {won !== 6 ? (
                            <div className="comments">Moves : {moves}</div>
                        ) : (
                            <div className="comments fw-bold text-success">
                                Congratulations! You won! {moves} moves 
                            </div>
                        )}
                    </Col>
        
                    {/* KNAPPEN - Centrerad vid sidan om eller under på mindre skärmar */}
                    <Col lg={4} xs={12} className="d-flex justify-content-center">
                        <button className="button" onClick={NewGame}>
                            New Game
                        </button>
                    </Col>
                </Row>
            </div>
         
        </Container>  
    );
}

export default GameBoard;

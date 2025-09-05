import React, { useState, useEffect, use } from "react";
import './App.css';
function App(){
  const basicNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  const shuffleNumbers = ()=>{
    return [...basicNumbers].sort(()=>Math.random()-0.5).map((value,index)=>({
      id:index,
      value,
      flipped:false,
      matched:false
    }));
  }
  const [cards,setCards] = useState(shuffleNumbers());
  const [flipped,setFlipped] = useState([]);
  const cardClicked=(index)=>{
    if(cards[index].matched||cards[index].matched||flipped.length===2){
      return;
    }
    let newCards = [...cards];
    newCards[index].flipped=true;
    setCards(newCards);
    if(flipped.length===0){
      setFlipped([index]);
    }
    else if(flipped.length===1){
      setFlipped([...flipped,index]);
    }
  }
  useEffect(()=>{
    if(flipped.length===2){
      const[first,second] = flipped;
      if(cards[first].value===cards[second].value){
        let newCards = [...cards];
        newCards[first].matched=true;
        newCards[second].matched=true;
        setCards(newCards);
      }else{
        setTimeout(()=>{
        let newCards = [...cards];
        newCards[first].flipped = false;
        newCards[second].flipped = false;
        setCards(newCards);},1000);
      }
      setFlipped([]);
    }
  },[flipped,cards]);
  const restart=()=>{
    setCards(shuffleNumbers());
    setFlipped([]);
  }

  return(
    <>
      <div className="game-container">
        <h1>Memoraizing Game</h1>
        <div className="cards-grid">
          {
            cards.map((card,index)=>
              (<div className={`card ${card.flipped||card.matched?"flipped":""}`} onClick={()=>{cardClicked(index)}}>
                {card.flipped||card.matched?card.value:"?"}
              </div>)
            )
          }
        </div>
        <button id="restart" onClick={restart}>Restart</button>
      </div>
    </>
  )
}
export default App;
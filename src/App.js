import React, { useEffect } from "react"
import Die from "./Die"
import {nanoid} from "nanoid"


function App() {

  const [dice, setDice] = React.useState(randomTen())
  const [final, setFinal] = React.useState(false)
  
  useEffect( () => {
    const reservedAll = dice.every(die => die.reserved)
    const equal = dice.every(die => die.value === dice[0].value)
    if (reservedAll && equal) {
      setFinal(true)
      console.log('U WON!!!')
    }
  }, [dice])  

  function randomOne(){
    
    return {
      value: Math.floor(Math.random()*6)+1,
      reserved: false,
      id: nanoid(),
    }
  }
  
  function randomTen() {
    const randomArr = []
    for (let i=0; i<10; i++) {
      randomArr.push(randomOne())
    }
    return randomArr
    
  }

  function roll () {
    setDice(prevDice => prevDice.map(die => die.reserved===true ? die : randomOne()))
  }

  function reserving(id) { 
    setDice( prevDice => prevDice.map(die => 
      die.id===id ? {...die, reserved: !die.reserved} : die)
    )
    console.log('reserving...')
  }

  function buttonFunc() {
    if (final === true) {
      setDice(randomTen())
      setFinal(false)
    }else {
      roll()
    }
  }

  const diceElements =  dice.map(die => <Die
    value={die.value}
    key={die.id} 
    reserved={die.reserved}
    handleClick={() => reserving(die.id)}
    />)


  const buttonText = final ? "You won!!! Play again?" : "Roll"

  return (
    <div className="App">
      <h1 className="title">DICEEE</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElements}
      </div>      
      <button className="button" onClick= {buttonFunc}>{buttonText} </button>
    </div>
  );
}

export default App;

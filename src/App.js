import './App.css';
import { useState, useEffect, useRef } from 'react';
import React from 'react';


function App() {
  const faceArray = [
    'f0.jpg',
    'f1.jpg',
    'f2.jpg',
    'f3.jpg',
    'f4.jpg',
    'f5.jpg',
    'f6.jpg',
    'f7.jpg',
    'f8.jpg',
    'f9.jpg',
    'f10.jpg',
    'f11.jpg'
  ];
 
  const[faceType, setFaceType] = useState(0); //for changing blue face shape
  const[isHappy, setIsHappy]= useState(false); //is the smile rightside up
  const[continueLoop, setContinueLoop] = useState(false); //is game in progress(button clicked)
  const[noClicked, setNoClicked]= useState(false); //user clicked no button
  const[gameCompleted, setGameCompleted]= useState(false); //did user click redirect button
  const[basicMessage, setBasicMessage]= useState(true);
  const[gameMessage, setGameMessage]= useState(false);
  const[endHintMessage, setEndHintMessage]= useState(false);
  const[initialMessage, setInitialMessage]= useState(false);
  const[displayHint, setDisplayHint]= useState(true);
  let gameStarted;

  const intervalIdRef = useRef(null);

  

  useEffect(() => {
    if (continueLoop) {
      intervalIdRef.current = setInterval(() => {
        if (faceType >= faceArray.length - 1) { //outside of face array index range --> need to reset
          setFaceType(0); //resets to zero
        } else {
          setFaceType((prevFaceType) => prevFaceType + 1); //increments by 1
          if (faceArray[faceType] === 'f5.jpg') {
            setIsHappy(true);
          } else {
            setIsHappy(false);
          }
        }
      }, 120);
    } //end of continueLoop --> paused button
    



    // Cleanup function to clear the timer/interval when continueLoop becomes false
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [continueLoop, faceArray, faceType]);

  function startGame() {
    continueLoop === false? setContinueLoop(true): setContinueLoop(false);
    gameStarted= true;
    setBasicMessage(false);
    setEndHintMessage(false);
    setGameMessage(true); 
  }

  function endGame() {
    setContinueLoop(false);
    gameStarted = false;
    setNoClicked(false);
    setGameMessage(false);
    setGameCompleted(true);

    setTimeout(()=>{
      setGameCompleted(false);
      window.open('https://www.codedex.io');
    }, 2000);
  }

  function noClick(){
    setNoClicked(true); //he's not happy you clicked that...
    setBasicMessage(false); //maybe if he's happy...
    setGameMessage(false); //hit yellow button
    setEndHintMessage(false);
    
    // Set a timeout to reset basicMessage to true after 3 seconds
    setTimeout(() => {
      setNoClicked(false); //for the no thanks button display
      if(continueLoop){
        setGameMessage(true);
        setBasicMessage(false);
      }
      else{
        setBasicMessage(true);
      }
    }, 3000);
  }

  function hintDisplay(){
    
    setContinueLoop(false); //stops game if started
    setBasicMessage(false); //gets rid of maybe if he's happy
    setGameMessage(false); //hit that yellow button
    setInitialMessage(true);
    setTimeout(() => {
      setInitialMessage(false);
      setEndHintMessage(true);
      
    }, 3000);

    setDisplayHint(false);
  }

  return (
    <div className="App">
      <div class="title"></div>
      <div class="main-container">
        <div class="computer">
          <div class="cpu-container">
            <div class="screen-outline">
              <div class="screen" style=
              {{backgroundImage: `url(${faceArray[faceType]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
                
              </div>
            </div>
          </div> 
          <div class="machine-panel">
            <div class="machine-buttons">
              <div class="cd-port"></div>
              <div class="power-button">
                <button class="btn-face" onClick={startGame}></button>
              </div>
            </div>
          </div>
        </div>
        <div class="error-msg">
          <h1 >ERROR</h1>
          <div class="error-img">
              <img src="error.jpg"alt="404 img"></img>
          </div>
          <div class="error-text"style={{display: basicMessage? 'block': 'none'}}>
            If you make him happy, he'll take you to the right place...
          </div>
          <div class="error-text" style={{display: initialMessage?'block':'none'}}>
            You can click the red computer button to start and pause the screen.
          </div>
          <div class="error-text"style={{display: noClicked? 'block': 'none'}}>
            He is definitely NOT happy that you hit that button...
          </div>
          <div class="error-text"style={{display: gameMessage? 'block': 'none'}}>
            Turn that frown upside down!
          </div>
          <div class="error-text" style={{display: endHintMessage? 'block':'none'}}>
            Click the red circle button to continue.
          </div>
          <div class="error-text"style={{display: gameCompleted? 'block': 'none'}}>
            Happy Coding!
          </div>

          <div class="error-buttons">

            <div class="error-button" style={{display: noClicked || gameStarted? 'none':'block'}}>
              <button class="btn-no" onClick={noClick}>No Thanks</button>
            </div>
            <div class="error-btn">
              <button class="btn-hint"style={{display: displayHint? 'block':'none'}} onClick={hintDisplay}>Get a Hint</button>
            </div>
            <div class="error-button"style={{display: isHappy? 'block':'none'}}>
              <button class="btn-codedex" onClick={endGame}>Redirect</button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="suggestions">
          <h2>What is a 404 error?</h2>
          <p>You could be seeing this page for a multitude of reasons:
            <ul>
              <li>URL has a typo</li>
              <li>The page has been moved</li>
              <li>The page has been removed or no longer exists</li>
            </ul>
          </p>
          <p>Please check that the address is correct. 
          <br></br>If you need further assistance, please reach out to our <a href="mailto: help@codedex.io">team</a>
          </p>
        </div>
    </div>

  );
}

export default App;

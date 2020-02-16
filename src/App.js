//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function ButtonRow(props){
  return (
    <section className="buttons">
      <div className="homeButtons">
        {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
        <button onClick={() => {props.clickHandler('Lions', 7)}} className="homeButtons__touchdown">Home Touchdown</button>
        <button onClick={() => {props.clickHandler('Lions', 3)}} className="homeButtons__fieldGoal">Home Field Goal</button>
      </div>
      <div className="quarterButton">
        <button onClick={() => props.setQuarter(props.quarter + 1)}>Next Quarter</button>
      </div>
      <div className="awayButtons">
        <button onClick={() => {props.clickHandler('Tigers', 7)}} className="awayButtons__touchdown">Away Touchdown</button>
        <button onClick={() => {props.clickHandler('Tigers', 3)}} className="awayButtons__fieldGoal">Away Field Goal</button>
      </div>
    </section>
  )
}

function ScoreBoardTopRow(props){
  return(
    <div className="topRow">
      <div className="home">
        <h2 className="home__name">Lions</h2>

        {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

        <div className="home__score">{props.lionsScore}</div>
      </div>
  <div className="timer">{props.tensMinutes % 6}{props.minutes % 10}:{props.tensSeconds % 6}{props.seconds % 10}</div>
      <div className="away">
        <h2 className="away__name">Tigers</h2>
        <div className="away__score">{props.tigersScore}</div>
      </div>
    </div>
  );
}

function ScoreBoard(){
  const [lionsScore, setLionsScore] = useState(0),
        [tigersScore, setTigersScore] = useState(0),
        [quarter, setQuarter] = useState(0),
        [seconds, setSeconds] = useState(8),
        [tensSeconds, setTensSeconds] = useState(5),
        [minutes, setMinutes] = useState(9),
        [tensMinutes, setTensMinutes] = useState(5);
    useEffect(timer);
  
  function timer(){
    setTimeout(() => {
      setSeconds(seconds + 1);
      if(seconds > 0 && (seconds + 1) % 10 === 0){
        setTensSeconds(tensSeconds + 1);

        if(tensSeconds > 0 && (tensSeconds + 1) % 6 === 0){
          setMinutes(minutes + 1);

          if(minutes > 0 && (minutes + 1) % 10 === 0){
            setTensMinutes(tensMinutes + 1);
          }
        }
      }
    },1000)
  }

  function clickHandler(teamName, amount){
    if(teamName === 'Lions'){
      setLionsScore(lionsScore + amount);
    }
    if(teamName === 'Tigers'){
      setTigersScore(tigersScore + amount);
    }
  }

  return (
    <div className="container">
      <section className="scoreboard">
          <ScoreBoardTopRow 
            lionsScore={lionsScore} 
            tigersScore={tigersScore}
            seconds={seconds}
            tensSeconds={tensSeconds}
            minutes={minutes}
            tensMinutes={tensMinutes}
          />
          <BottomRow quarter={quarter} />
        </section>
        <ButtonRow 
          lionsScore={lionsScore}
          tigersScore={tigersScore}
          clickHandler={clickHandler}
          quarter={quarter}
          setQuarter={setQuarter}
        />
      </div>
  );
}

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  return (
    <ScoreBoard />
  );
}

export default App;


import React, { useState } from "react";

const choices = ["rock", "paper", "scizzors"]; // kő, papír, olló

function RPSGame({ onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const play = (choice) => {
    const comp = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(comp);

    if (choice === comp) {
      setResult("Döntetlen");
    } else if (
      (choice === "rock" && comp === "scizzorz") ||
      (choice === "scizzors" && comp === "paper") ||
      (choice === "paper" && comp === "rock")
    ) {
      setResult("Nyertél!");
      setScore(score + 1);
    } else {
      setResult("Vesztettél!");
    }
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore(0);
  };

  return (
    <div>
      <button onClick={onBack}>Vissza</button>
      <h2>Kő - Papír - Olló</h2>
      <div style={{ display: "flex", gap: "10px", fontSize: "30px" }}>
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)}>{c}</button>
        ))}
      </div>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Te: {playerChoice} | Gép: {computerChoice}</p>
          <p>Eredmény: {result}</p>
        </div>
      )}
      <p>Győzelmek száma: {score}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default RPSGame;


import React, { useState, useEffect } from "react";

const images = ["apple", "banana", "grape"];
const cards = [...images, ...images].sort(() => Math.random() - 0.5);

function MemoryGame({ onBack }) {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  const handleClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length < 2) setFlipped([...flipped, index]);
  };

  return (
    <div>
      <button onClick={onBack}>Vissza</button>
      <h2>Kártya kereső játék</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {flipped.includes(i) || matched.includes(i) ? card : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;

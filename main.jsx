
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MemoryGame from "./MemoryGame.jsx";
import RPSGame from "./RPSGame.jsx";

function App() {
  const [page, setPage] = useState("menu");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>React Játékok</h1>
      {page === "menu" && (
        <div>
          <button onClick={() => setPage("memory")}>Kártya kereső játék</button>
          <button onClick={() => setPage("rps")}>Kő-papír-olló</button>
        </div>
      )}
      {page === "memory" && <MemoryGame onBack={() => setPage("menu")} />}
      {page === "rps" && <RPSGame onBack={() => setPage("menu")} />}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

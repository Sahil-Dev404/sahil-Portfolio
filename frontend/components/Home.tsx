"use client";

import { useState } from "react";
import Intro from "./intro/Intro";
import SimplePage from "./SimplePage";

export default function Home() {
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const replay = () => {
    setDone(false);
    setRevealed(false);
    setRunId((n) => n + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={revealed ? "reveal" : ""}>
      {!done && <Intro key={runId} onReveal={() => setRevealed(true)} onDone={() => setDone(true)} />}
      <SimplePage onReplay={replay} />
    </div>
  );
}

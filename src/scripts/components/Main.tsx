import React from "react";
import FinalScores from "./FinalScores";
import Preparing from "./Preparing";
import Question from "./Question";
import Scores from "./Scores";

import { Phases } from "../types";

/**
 * A simple React functional component displaying the voting user interface
 */
export default function ({
  isTeacher,
  phase,
}: {
  isTeacher: boolean;
  phase: Phases;
}) {
  return (
    <div>
      {phase === "preparing" && <Preparing></Preparing>}
      {phase === "question" && <Question></Question>}
      {phase === "review" && <Question></Question>}
      {phase === "scores" && <Scores></Scores>}
      {phase === "finalscores" && <FinalScores></FinalScores>}
    </div>
  );
}

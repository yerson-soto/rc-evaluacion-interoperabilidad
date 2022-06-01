import { Evaluation } from "library/models/Evaluation";
import { useState } from "react";


export function useEvaluationList() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>();

  return { evaluations };
}
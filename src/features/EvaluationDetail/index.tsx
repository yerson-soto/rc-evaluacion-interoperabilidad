import EvaluationDetailInner from "./EvaluationDetail";
import { EvaluationDetailProvider } from "./EvaluationContext";

export function EvaluationDetail() {
  return (
    <EvaluationDetailProvider>
      <EvaluationDetailInner />
    </EvaluationDetailProvider>
  );
}

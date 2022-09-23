export const getScoreColor = (score: number) => {
  const indicators = ["#f54545", "#f39133", "#ffc12a", "#72c141", "#079322"];
  const indicatorIndex = score <= 1 ? 0 : Math.round(score) - 1;
  
  return indicators[indicatorIndex];
}
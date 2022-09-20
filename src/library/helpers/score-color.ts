export const getScoreColor = (score: number) => {
  const indicators = ["#f5ac85", "#ffde8d", "#fcff86", "#aaef80", "#7cbd4c"];
  const indicatorIndex = score <= 1 ? 0 : Math.round(score) - 1;

  return indicators[indicatorIndex];
}
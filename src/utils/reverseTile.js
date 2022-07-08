export function reverseTile(tile) {
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const newCol = [
      tile[i][2],
      tile[i][1],
      tile[i][0],
    ]
    result.push(newCol);
  }

  return result;
}
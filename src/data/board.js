const BOARD = new Array();

for (let i = 0; i < 12; i++) {
  const COLS = [];
  for (let j = 0; j < 9; j++) {
    COLS[j] = undefined;
  }
  BOARD[i] = COLS;
}

export { BOARD };
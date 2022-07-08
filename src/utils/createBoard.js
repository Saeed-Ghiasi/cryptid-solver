import { BOARD } from '../data/board.js';
import { SECTIONS } from '../data/sections.js';
import { reverseTile } from './reverseTile.js';

export function startBoard(first, second, third, fourth, fifth, sixth) {
  const startSections = {};
  startSections[1] = first.dir == 'N' ? SECTIONS[first.value] : reverseTile(SECTIONS[first.value]);
  startSections[2] = second.dir == 'N' ? SECTIONS[second.value] : reverseTile(SECTIONS[second.value]);
  startSections[3] = third.dir == 'N' ? SECTIONS[third.value] : reverseTile(SECTIONS[third.value]);
  startSections[4] = fourth.dir == 'N' ? SECTIONS[fourth.value] : reverseTile(SECTIONS[fourth.value]);
  startSections[5] = fifth.dir == 'N' ? SECTIONS[fifth.value] : reverseTile(SECTIONS[fifth.value]);
  startSections[6] = sixth.dir == 'N' ? SECTIONS[sixth.value] : reverseTile(SECTIONS[sixth.value]);

  const gameBoard = BOARD.map((col, colIndex) => {
    let newCol = [];
    for (let rowIndex in col) {
      const tile = startSections[parseInt(rowIndex/3) + 3*parseInt(colIndex/6) + 1];
      newCol = [...newCol, tile[colIndex%6][rowIndex%3]];
    }
    return newCol;
  })

  return gameBoard;
}



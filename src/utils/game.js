import { startBoard } from '../utils/createBoard.js';
import { adjacents, adjacentsDepth } from './adjacents.js';
import {
  ANSWERS, PLAYERS, CONDITIONS, ANIMALS, STONES, SHACKS, GREENS, BLUES, WHITES
} from '../data/substances.js';

class StartGame {
  constructor(first, second, third, fourth, fifth, sixth, nPlayers) {
    this.availableConditions = {
      [PLAYERS.RED]: CONDITIONS,
      [PLAYERS.BLUE]: CONDITIONS,
      [PLAYERS.GREEN]: CONDITIONS,
      [PLAYERS.PURPLE]: CONDITIONS,
      [PLAYERS.BROWN]: CONDITIONS,
    };
    this.moves = {
      [PLAYERS.RED]: [],
      [PLAYERS.BLUE]: [],
      [PLAYERS.GREEN]: [],
      [PLAYERS.PURPLE]: [],
      [PLAYERS.BROWN]: [],
    };
    this.stones = [];
    this.shacks = [];
    this.greens = [];
    this.blues = [];
    this.whites = [];
    this.bears = [];
    this.cougars = [];

    this.board = startBoard(first, second, third, fourth, fifth, sixth);
  }

  logBoard() {
    console.log(this.board);
  }

  getBoard() {
    return this.board;
  }
  
  getAvailableConditions() {
    return this.availableConditions;
  }

  getMoves() {
    return this.moves;
  }

  getTilesData() {
    return {
      stones: this.stones,
      shacks: this.shacks,
      greens: this.greens,
      blues: this.blues,
      whites: this.whites,
      bears: this.bears,
      cougars: this.cougars,
    };
  }

  checkThisOrThat(currentConditions, coordinate, answer) {
    const arr = currentConditions.thisOrThat;
    
    if (answer === ANSWERS.YES) {
      return arr;
    }

    return arr.filter((item) => item !== this.board[coordinate[0]][coordinate[1]])
  }

  checkOneDistance(currentConditions, coordinate, answer) {
    const x = parseInt(coordinate.slice(0, coordinate.length - 1));
    const y = parseInt(coordinate[coordinate.length - 1]);
    const adjs = adjacents(x, y);
    let arr = currentConditions.oneDistance;
    console.log(adjs)

    if (answer == ANSWERS.NO) {
      for (let adj of adjs) {
        arr = arr.filter((item) => item !== this.board[adj[0]][adj[1]]);
  
        if (this.bears.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(ANIMALS).includes(item));
        }
        if (this.cougars.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(ANIMALS).includes(item));
        }
      }
    } else if (answer == ANSWERS.YES) {
      arr = arr.reduce((acc, curr) => {
        for (let adj of adjs) {
          if (curr === this.board[adj[0]][adj[1]]) {
            return [...acc, curr];
          }
          if (this.bears.includes(`${adj[0]}${adj[1]}`) || this.cougars.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(ANIMALS.BEAR) || acc.includes(ANIMALS.COUGAR) ?
              acc : [...acc, ...Object.values(ANIMALS)];
          }
        }
        return acc;
      }, []);
    }

    return arr;
  }

  checkTwoDistance(currentConditions, coordinate, answer) {
    const x = parseInt(coordinate.slice(0, coordinate.length - 1));
    const y = parseInt(coordinate[coordinate.length - 1]);

    const adjs = adjacentsDepth(x, y, 2);
    let arr = currentConditions.twoDistance;
    if (answer == ANSWERS.NO) {
      for (let adj of adjs) {
        if (this.shacks.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(SHACKS).includes(item));
        }
        if (this.stones.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(STONES).includes(item));
        }
        if (this.bears.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => item !== ANIMALS.BEAR);
        }
        if (this.cougars.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => item !== ANIMALS.COUGAR);
        }
      }
    } else if (answer == ANSWERS.YES) {
      arr = arr.reduce((acc, curr) => {
        for (let adj of adjs) {
          if (this.shacks.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(STONES.BLUE_STONE) ? acc : [...acc, Object.values(SHACKS)];
          }
          if (this.stones.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(STONES.BLUE_STONE) ? acc : [...acc, Object.values(STONES)];
          }
          if (this.bears.includes(`${adj[0]}${adj[1]}`)) {
            return  acc.includes(ANIMALS.BEAR) ?
              acc : [...acc, curr];
          }
          if (this.cougars.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(ANIMALS.COUGAR) ?
              acc : [...acc, curr];
          }
        }

        return acc;
      }, []);
    }
    
    return arr;
  }

  checkThreeDistance(currentConditions, coordinate, answer) {
    const x = parseInt(coordinate.slice(0, coordinate.length - 1));
    const y = parseInt(coordinate[coordinate.length - 1]);

    const adjs = adjacentsDepth(x, y, 3);
    let arr = currentConditions.threeDistance;

    if (answer == ANSWERS.NO) {
      for (let adj of adjs) {
        if (this.blues.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(BLUES).includes(item));
        }
        if (this.greens.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(GREENS).includes(item));
        }
        if (this.whites.includes(`${adj[0]}${adj[1]}`)) {
          arr = arr.filter((item) => !Object.values(WHITES).includes(item));
        }
      }
    } else if (answer == ANSWERS.YES) {
      for (let adj of adjs) {
        arr = arr.reduce((acc, curr) => {
          if (this.greens.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(GREENS.GREEN_SHACK) || acc.includes(GREENS.GREEN_STONE)
              ? acc : [...acc, Object.values(GREENS)];
          }
          if (this.blues.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(BLUES.BLUE_SHACK) || acc.includes(BLUES.BLUE_STONE)
              ? acc : [...acc, Object.values(BLUES)];
          }
          if (this.whites.includes(`${adj[0]}${adj[1]}`)) {
            return acc.includes(WHITES.WHITE_SHACK) || acc.includes(WHITES.WHITE_STONE)
              ? acc : [...acc, Object.values(WHITES)];
          }
  
          return acc;
        }, []);
      }
    }
    

    return arr;
  }

  checkNewAvailables(player, coordinate, answer) {
    const currentConditions = this.availableConditions[player];
    this.availableConditions = {
      ...this.availableConditions,
      [player]: {
        thisOrThat: this.checkThisOrThat(currentConditions, coordinate, answer),
        oneDistance: this.checkOneDistance(currentConditions, coordinate, answer),
        twoDistance: this.checkTwoDistance(currentConditions, coordinate, answer),
        threeDistance: this.checkThreeDistance(currentConditions, coordinate, answer),
      }
    }
    return;
  }

  addAnswer(player, coordinate, answer) {
    this.moves = { ...this.moves,
      [player]: [...this.moves[player], { coordinate, answer }]
    };
    this.checkNewAvailables(player, coordinate, answer);
  }

  addStructure(structure, coordinate) {
    if (Object.values(STONES).includes(structure)) {
      this.stones = [...this.stones, coordinate];
    }
    else if (Object.values(SHACKS).includes(structure)) {
      this.shacks = [...this.shacks, coordinate];
    }

    if (Object.values(GREENS).includes(structure)) {
      this.greens = [...this.greens, coordinate];
    } else if (Object.values(BLUES).includes(structure)) {
      this.blues = [...this.blues, coordinate];
    } else if (Object.values(WHITES).includes(structure)) {
      this.whites = [...this.whites, coordinate];
    }

    console.log('structure added');
  }
  
  addTerritory(type, coordinate) {
    if (type === ANIMALS.BEAR) {
      this.bears = [...this.bears, coordinate]
    } else if (type === ANIMALS.COUGAR) {
      this.cougars = [...this.cougars, coordinate]
    }

    console.log(type, 'added')
  }
}

export { StartGame };
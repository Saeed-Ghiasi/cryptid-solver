const TYPES = {
  WATER: 'water',
  DESERT: 'desert',
  MOUNTAIN: 'mountain',
  SWAMP: 'swamp',
  FOREST: 'forest',
}

const ANIMALS = {
  BEAR: 'bear',
  COUGAR: 'cougar',
};

const STRUCTURES = {
  GREEN_STONE: 'greenStone',
  BLUE_STONE: 'blueStone',
  WHITE_STONE: 'whiteStone',
  GREEN_SHACK: 'greenShack',
  BLUE_SHACK: 'blueShack',
  WHITE_SHACK: 'whiteShack',
}

const { 
  GREEN_STONE,
  BLUE_STONE,
  WHITE_STONE,
  GREEN_SHACK,
  BLUE_SHACK,
  WHITE_SHACK
} = STRUCTURES;

const STONES = {
  GREEN_STONE,
  BLUE_STONE,
  WHITE_STONE,
};
const SHACKS = {
  GREEN_SHACK,
  BLUE_SHACK,
  WHITE_SHACK,
};
const GREENS = { GREEN_SHACK, GREEN_STONE };
const BLUES = { BLUE_SHACK, BLUE_STONE };
const WHITES = { WHITE_SHACK, WHITE_STONE };

const ANSWERS = { NO: 'no', YES: 'yes' };
const PLAYERS = { RED: 'red', BLUE: 'blue', GREEN: 'green', PURPLE: 'purple', BROWN: 'brown' };

const CONDITIONS = {
  thisOrThat: Object.values(TYPES),
  oneDistance: Object.values({ ...TYPES, ...ANIMALS }),
  twoDistance: Object.values({ ...STONES, ...SHACKS, ...ANIMALS }),
  threeDistance: Object.values({ ...GREENS, ...BLUES, ...WHITES }),
};

export {
  TYPES,
  STRUCTURES,
  STONES,
  SHACKS,
  GREENS,
  BLUES,
  WHITES,
  ANIMALS,
  ANSWERS,
  PLAYERS,
  CONDITIONS,
}

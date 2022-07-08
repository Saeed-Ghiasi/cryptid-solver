function inBoard([x, y]) {
  if (x < 0 || x > 11) return false;
  if (y < 0 || y > 11) return false;

  return true;
}

export function adjacents(x, y) {
  let temp = [];
  if (x % 2 === 1) {
    temp = [[x, y], [x-1, y], [x+1, y], [x, y-1], [x, y+1], [x-1,y+1], [x+1, y+1]];
  } else {
    temp = [[x, y], [x-1, y], [x+1, y], [x, y-1], [x, y+1], [x-1,y-1], [x+1, y-1]];;
  }
  const result = []

  for (let crd of temp) {
    if (inBoard(crd)) result.push(crd);
  }

  return result;
}

export function adjacentsDepth(x, y, depth) {
  let adjs = adjacents(x, y);
  for (let i = 1; i < depth; i++) {
    let newAdjs = [];
    for (let adj of adjs) {
      newAdjs = adjacents(adj[0], adj[1]);
      adjs = [...adjs, ...newAdjs];
    }
  };
  return [...new Set(adjs)];
}
function snail(array) {
  let result = [];
  while (array.length > 0) {
    // Right
    for (let i = 0; i < array[0].length; i++) {
      result.push(array[0][i]);
    }
    array = array.slice(1);

    // Down
    for (let i = 0; i < array.length; i++) {
      result.push(array[i][array[i].length - 1]);
      array[i] = array[i].slice(0, -1);
    }

    // Left
    if (array.length > 0) {
      for (let i = array[array.length - 1].length - 1; i >= 0; i--) {
        result.push(array[array.length - 1][i]);
      }
      array = array.slice(0, -1);
    }

    // Up
    for (let i = array.length - 1; i >= 0; i--) {
      result.push(array[i][0]);
      array[i] = array[i].slice(1);
    }
  }
  return result;
}

console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
console.log(
  snail([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ])
);

console.log(
  snail([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ])
);

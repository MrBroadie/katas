// Main driver for this is assuming that random access in an array is fast, then this should be good
// But really we know the impl of an array is probably a tree, so we are likely to see changeable results

class LoopLimits {
  constructor(size) {
    this.minX = 0;
    this.maxX = size - 1;
    this.minY = 0;
    this.maxY = size - 1;
  }
  endOfLimits() {
    return this.minX > this.maxX && this.minY > this.maxY;
  }
}

function solve(arr) {
  const limits = new LoopLimits(arr.length);
  const unwound = [];

  leftToRight(unwound, limits, arr);
  return unwound;
}

// Look at the following set of functions and how repetitive they are
// They look sooo similar, they are screaming to be DRY'd
function leftToRight(unwound, limits, arr) {
  for (let index = limits.minX; index <= limits.maxX; index++) {
    unwound.push(arr[limits.minY][index]);
  }

  limits.minY++;
  if (!limits.endOfLimits()) {
    topToBottom(unwound, limits, arr);
  }
}

function topToBottom(unwound, limits, arr) {
  for (let index = limits.minY; index <= limits.maxY; index++) {
    unwound.push(arr[index][limits.maxX]);
  }

  limits.maxX--;

  if (!limits.endOfLimits()) {
    rightToLeft(unwound, limits, arr);
  }
}

function rightToLeft(unwound, limits, arr) {
  for (let index = limits.maxX; index >= limits.minX; index--) {
    unwound.push(arr[limits.maxY][index]);
  }

  limits.maxY--;

  if (!limits.endOfLimits()) {
    bottomToTop(unwound, limits, arr);
  }
}

function bottomToTop(unwound, limits, arr) {
  for (let index = limits.maxY; index >= limits.minY; index--) {
    unwound.push(arr[index][limits.minX]);
  }

  limits.minX++;

  if (!limits.endOfLimits()) {
    leftToRight(unwound, limits, arr);
  }
}

const arr = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9],
];

console.log(solve(arr));

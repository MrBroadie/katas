class LoopLimits {
  constructor(size) {
    this.minX = 0;
    this.maxX = size - 1;
    this.minY = 0;
    this.maxY = size - 1;
  }

  endOfLimits() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
}

// Here we go, a whole class hierarchy to stop other parts from repeating
// But at what cost?!
class BaseTraversal {
  constructor(limits) {
    this.limits = limits;
    this.init();
  }
  endOfLimits() {
    return this.limits.endOfLimits();
  }
  X() {
    return this.index;
  }
  Y() {
    return this.index;
  }

  get next() {
    this.nextTraversal.init();
    return this.nextTraversal;
  }
  getNextPosition() {
    if (this.compareAgainstLimit()) {
      this.changeIndex();
      return true;
    } else {
      return false;
    }
  }
}
class LeftToRightTraversal extends BaseTraversal {
  constructor(limits) {
    super(limits);
  }
  init() {
    this.index = this.limits.minX;
  }
  compareAgainstLimit = () => this.index < this.limits.maxX;
  changeIndex = () => this.index++;
  Y() {
    return this.limits.minY;
  }
  updateLimits() {
    this.limits.minY++;
  }
}
class RightToLeftTraversal extends BaseTraversal {
  constructor(limits) {
    super(limits);
  }
  init() {
    this.index = this.limits.maxX;
  }
  compareAgainstLimit = () => this.index > this.limits.minX;
  changeIndex = () => this.index--;

  Y() {
    return this.limits.maxY;
  }
  updateLimits() {
    this.limits.maxY--;
  }
}
class TopToBottomTraversal extends BaseTraversal {
  constructor(limits) {
    super(limits);
  }
  init() {
    this.index = this.limits.minY;
  }

  compareAgainstLimit = () => this.index < this.limits.maxY;
  changeIndex = () => this.index++;

  X() {
    return this.limits.maxX;
  }
  updateLimits() {
    this.limits.maxX--;
  }
}
class BottomToTopTraversal extends BaseTraversal {
  constructor(limits) {
    super(limits);
  }
  init() {
    this.index = this.limits.maxY;
  }

  compareAgainstLimit = () => this.index > this.limits.minY;
  changeIndex = () => this.index--;

  X() {
    return this.limits.minX;
  }
  updateLimits() {
    this.limits.minX++;
  }
}

function solve(arr) {
  const limits = new LoopLimits(arr.length);

  const ltr = new LeftToRightTraversal(limits);
  const rtl = new RightToLeftTraversal(limits);
  const ttb = new TopToBottomTraversal(limits);
  const btt = new BottomToTopTraversal(limits);

  ltr.nextTraversal = ttb;
  ttb.nextTraversal = rtl;
  rtl.nextTraversal = btt;
  btt.nextTraversal = ltr;

  const unwound = [];

  traverse(unwound, ltr, arr);

  return unwound;
}

function traverse(unwound, limits, arr) {
  do {
    unwound.push(arr[limits.Y()][limits.X()]);
  } while (limits.getNextPosition());

  limits.updateLimits();

  if (!limits.endOfLimits()) {
    traverse(unwound, limits.next, arr);
  }
}

const arr = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7],
];

console.log(solve(arr));

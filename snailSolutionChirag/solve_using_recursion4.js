// Actually this does not do recursion, but is an evolution from that code so gave the file this name to show the history

class Limits {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.val = min;
  }

  end = () => this.min == this.max;
}

class LoopLimits {
  constructor(size) {
    this.x = new Limits(-1, size - 1);
    this.y = new Limits(0, size);
  }

  // these are here for example.  A tenant of encapsulation is that you should not directly expose members
  get X() {
    return this.x.val;
  }
  get Y() {
    return this.y.val;
  }

  getNextPosition() {
    if (!this._endOfLimits()) {
      this._movePosition();
      return true;
    }

    return false;
  }

  _matchMin = (limit) => limit.val == limit.min;
  _matchMax = (limit) => limit.val == limit.max;
  _lessThanMax = (limit) => limit.val < limit.max;
  _moreThanMin = (limit) => limit.val > limit.min;
  _incrementMin = (limit) => limit.min++;
  _decrementMax = (limit) => limit.max--;

  _travelAlongTop = () =>
    this._hasMoved(
      this.y,
      this._matchMin,
      this.x,
      this._lessThanMax,
      this._matchMin,
      this._decrementMax,
      1
    );
  _travelDownRight = () =>
    this._hasMoved(
      this.x,
      this._matchMax,
      this.y,
      this._lessThanMax,
      this._matchMin,
      this._incrementMin,
      1
    );
  _travelAlongBottom = () =>
    this._hasMoved(
      this.y,
      this._matchMax,
      this.x,
      this._moreThanMin,
      this._matchMax,
      this._incrementMin,
      -1
    );
  _travelUpLeft = () =>
    this._hasMoved(
      this.x,
      this._matchMin,
      this.y,
      this._moreThanMin,
      this._matchMax,
      this._decrementMax,
      -1
    );
  // Trying to be DRY, so moved all that common code into a function that is parameterized
  _hasMoved(
    a,
    matchForA,
    b,
    limitForB,
    matchForB,
    changeToLimitOnA,
    changeToApplyToB
  ) {
    if (
      matchForA(a) && // check traveling along given edge
      limitForB(b)
    ) {
      // check it is not the last cell on that edge
      if (matchForB(b)) {
        // if the first cell on the edge,
        changeToLimitOnA(a); //  change the opposite limit, have to do this here, other conditions are not unique
      }
      b.val += changeToApplyToB; // change current cell
      return true;
    }

    return false;
  }

  _movePosition() {
    if (this._travelAlongTop()) {
    } else if (this._travelDownRight()) {
    } else if (this._travelAlongBottom()) {
    } else if (this._travelUpLeft()) {
    }
  }

  _endOfLimits() {
    return this.x.end() || this.y.end();
  }
}

function solve(arr) {
  const limits = new LoopLimits(arr.length);

  const unwound = [];

  while (limits.getNextPosition()) {
    unwound.push(arr[limits.Y][limits.X]);
  }

  return unwound;
}

const arr = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7],
];

console.log(solve(arr));

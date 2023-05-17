// Actually this does not do recursion, but is an evolution from that code so gave the file this name to show the history
class LoopLimits {
  constructor(size) {
    this.minX = -1;
    this.maxX = size - 1;
    this.minY = 0;
    this.maxY = size;

    this.x = -1;
    this.y = 0;
  }

  // these are here for example.  A tenant of encapsulation is that you should not directly expose members
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }

  getNextPosition() {
    if (!this._endOfLimits()) {
      this._movePosition();
      return true;
    }

    return false;
  }

  _canTravelAlongTop() {
    return this.y == this.minY && this.x < this.maxX;
  }
  _canTravelDownRight() {
    return this.x == this.maxX && this.y < this.maxY;
  }
  _canTravelAlongBottom() {
    return this.y == this.maxY && this.x > this.minX;
  }
  _canTravelUpLeft() {
    return this.x == this.minX && this.y > this.minY;
  }

  _movePosition() {
    // Hate this, look at how repetitive the following code is, yuk!
    // It is not DRY at all
    if (this._canTravelAlongTop()) {
      if (this.x == this.minX) {
        this.maxY--;
      }
      this.x++;
    } else if (this._canTravelDownRight()) {
      if (this.y == this.minY) {
        this.minX++;
      }
      this.y++;
    } else if (this._canTravelAlongBottom()) {
      if (this.x == this.maxX) {
        this.minY++;
      }
      this.x--;
    } else if (this._canTravelUpLeft()) {
      if (this.y == this.maxY) {
        this.maxX--;
      }
      this.y--;
    }
  }

  _endOfLimits() {
    return this.minX == this.maxX || this.minY == this.maxY;
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
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9],
];

console.log(solve(arr));

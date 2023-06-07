class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }
  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }
  getLength() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
//Which is better
console.log(new Vec(2, 3).getLength());
console.log(new Vec(2, 3).length);

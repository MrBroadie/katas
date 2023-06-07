class Group {
  constructor(arr) {
    this.arr = arr;
  }
  add(num) {
    !this.arr.includes(num) && this.arr.push(num);
  }
  delete(num) {
    const index = this.arr.indexOf(num);
    index !== -1 && this.arr.splice(index, 1);
  }
  has(num) {
    return this.arr.includes(num);
  }
  static from(iterableObject) {
    return new Group([...iterableObject]);
  }

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        while (i < this.arr.length) {
          return { value: this.arr[i++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

//which is better
const group = Group.from(["a", "b", "c"]);
for (let value of group.arr) {
  console.log(value);
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

let okIterator = "OK"[Symbol.iterator]();

console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

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
}

//which is better?
const group = new Group([10, 20]);
const otherGroup = Group.from([12, 11]);
console.log(group.has(10));
console.log(group.has(30));
group.add(20);
console.log(group.has(20));
group.delete(20);
console.log(group.has(20));

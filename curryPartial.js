function add(a, b, c) {
  return a + b + c;
}

const a = 1;
const b = 2;
const c = 4;

function curry(fn) {
  return function (x) {
    return function (y) {
      return function (z) {
        return fn(x, y, z);
      };
    };
  };
}

function partial(fn) {
  return function (x, y) {
    return function (z) {
      return fn(x, y, z);
    };
  };
}

function curryPartial(fn) {
  const hangingArgs = Array.from(arguments).slice(1);
  if (hangingArgs.length >= fn.length) return fn(...hangingArgs);
  return function () {
    const args = hangingArgs.concat(Array.from(arguments));
    return curryPartial(fn, ...args);
  };
}

function oldCurryPartial(fn) {
  const hangingArgs = Array.from(arguments).slice(1, fn.length + 1);
  const func = Array.from(arguments).slice(0, 1);
  let check = 0;
  if (hangingArgs.length >= fn.length) return func[0](...hangingArgs);

  return function recurFunction(...args) {
    if (hangingArgs.length && check === 0) {
      args = hangingArgs.concat(args);
      check++;
    }
    if (args.length >= fn.length) return fn(...args);
    return function (...newArgs) {
      return recurFunction(...args, ...newArgs);
    };
  };
}

console.log("test 1", curryPartial(add)(a)(b)(c) );
console.log("test 2", curryPartial(add, a)(b)(c));
console.log("test 3", curryPartial(add, a)(b, c));
console.log("test 4", curryPartial(add, a, b, c));
console.log("test 5", curryPartial(add, a, b, c, 20));
console.log("test 6", curryPartial(add)(a, b, c));
console.log("test 7", curryPartial(add)()(a, b, c));
console.log("test 8", curryPartial(add)()(a)()()(b, c));
console.log("test 9", curryPartial(add)()(a)()()(b, c, 5, 6, 7));
console.log("test 10", curryPartial(curryPartial(curryPartial(add, a), b), c));
console.log("test 11", curryPartial(curryPartial(add, a, b), c));
console.log("test 12", curryPartial(curryPartial(add, a), b, c));
// FIRST SOLUTION
// Manual definition -> 3 solutions
const user1 = {
  name: "Tom",
  score: 1,
  increment: function () {
    user1.score++;
  },
};

//dot notation
const user2 = {};
user2.name = "Richard";
user2.score = 2;
user2.increment = function () {
  user2.score++;
};

//Object.create
const user3 = Object.create(null);
user3.name = "Harry";
user3.score = 3;
user3.increment = function () {
  user3.score++;
};
//issue with the above is that we have to write out a user everytime you want to create a new one.

//SECOND SOLUTION
//Generate objects using a function
function userCreator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function () {
    newUser.score++;
  };
  return newUser;
}
const user4 = userCreator("Tom", 4);
const user5 = userCreator("Richard", 5);
//fundementally this would would work but a function is being created on each object taking up space

//THIRD SOLUTION
//Store functions in seperate object
function createNewUser(name, score) {
  const newUser = Object.create(functionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const functionStore = {
  increment: function () {
    this.score++;
  },
  login: function () {
    console.log("you're logged in");
  },
};

const user6 = createNewUser("Tom", 6);
const user7 = createNewUser("Richard", 7);
//This solution is great becuase it uses the prototype chain to access the function store from each user __proto__

//FORTH SOLUTION
//The new keyword
function CreateUser(name, score) {
  this.name = name;
  this.score = score;
}

CreateUser.prototype.increment = function () {
  this.store++;
};

CreateUser.prototype.login = function () {
  console.log("logged in ");
};

const user8 = new CreateUser("Tom", 8);
user8.increment;

//FITH SOLUTION
//Syntactic Sugar -> Classes
class SyntacticUser {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment() {
    this.score++;
  }
  login() {
    console.log("logged in");
  }
}

const user9 = new SyntacticUser("Tom", 9);

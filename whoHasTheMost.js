class Student {
  constructor(name, fives, tens, twenties) {
    this.name = name;
    this.fives = fives;
    this.tens = tens;
    this.twenties = twenties;
  }
}

const andy = new Student("Andy", 0, 0, 2);
const stephen = new Student("Stephen", 0, 4, 0);
const eric = new Student("Eric", 8, 1, 0);
const david = new Student("David", 2, 0, 1);
const phil = new Student("Phil", 0, 2, 1);
const cam = new Student("Cameron", 2, 2, 0);
const geoff = new Student("Geoff", 0, 3, 0);

console.log(mostMoney([andy]));

function mostMoney(students) {
  function sumOfAllNumbers(student) {
    const sum = (student.fives + student.twenties * 4 + student.tens * 2) * 5;
    student.sum = sum;
    return student;
  }

  const newStudents = students
    .map((student) => (student = sumOfAllNumbers(student)))
    .sort((a, b) => b.sum - a.sum);

  const filteredStudents = newStudents.filter(
    (el) => el.sum === newStudents[0].sum
  );

  if (
    filteredStudents.length === newStudents.length &&
    filteredStudents.length > 1
  )
    return "all";
  else return filteredStudents[0].name;
}

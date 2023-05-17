function humanReadable(seconds) {
  //hashmaps and binary trees red black tree

  let remainingTime = seconds;

  if (seconds > 359999 || seconds < 0) {
    return "";
  }

  const hours = Math.floor(remainingTime / 3600);
  remainingTime %= 3600;
  const minutes = Math.floor(remainingTime / 60);
  remainingTime %= 60;

  return `${hours
    .toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingTime.toString().padStart(2, "0")}`;
}

console.log(humanReadable(0));
console.log(humanReadable(59));
console.log(humanReadable(60));
console.log(humanReadable(90));
console.log(humanReadable(3599));
console.log(humanReadable(3600));
console.log(humanReadable(45296));
console.log(humanReadable(86399));
console.log(humanReadable(86400));
console.log(humanReadable(359999));

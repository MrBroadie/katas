function oldOrderWeight(strng) {
  
    if(!strng) return strng
    
    const arr = strng.split(' ').sort()
    
    for(let i = 0; i < arr.length; i++) {
      arr[i] = {strValue: arr[i], numValue: reduceStrToNum(arr[i])}
    }
    
    sortArr(arr);
  
    for(let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].strValue
    }
  
    function reduceStrToNum(num) {
      num = num.split('').reduce((accumulator, currentValue) => +accumulator + +currentValue)
      return num
    }
  
    function sortArr(arr) {
      for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
          if(arr[j + 1].numValue < arr[j].numValue) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
          }
        }
      }
      return arr;
    }
    
    return arr.join(' ')
  }

console.time('Execution Time');
console.log(oldOrderWeight('11 2000 432 152 5 12 51 8 9 2'))
console.timeEnd('Execution Time');

function orderWeight(strng) {
  if(!strng) return strng
  
  const sortByNumThenASCII = (a, b) => 
      a.numValue > b.numValue ?  (1) : 
      a.numValue < b.numValue ? (-1) : 
      a.strValue < b.strValue ? (-1) : (0)
    
  return strng
      .split(' ')
      .map(str => str = {strValue: str, numValue: reduceStrToNum(str)})
      .sort(sortByNumThenASCII)
      .map(obj => obj = obj.strValue) 
      .join(' ')
    
  function reduceStrToNum(num) {
      num = num.split('').reduce((accumulator, currentValue) => +accumulator + +currentValue)
      return num
  }
}
console.time('Second Time');
console.log(orderWeight('11 2000 432 152 3 5 12 51 8 9 2'))
console.timeEnd('Second Time');
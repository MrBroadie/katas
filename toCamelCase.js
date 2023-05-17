function oldCamelCase(str){
  
    let newStr = ''
    let checkAfter = false;
    
    for (let i = 0; i < str.length; i++) {
      if(str[i].match(/[-_]/)){ checkAfter = true }
      
      if(str[i].match(/[a-zA-Z]/)){
       if(!newStr.length) {
            newStr += str[i]
        } 
        else if(checkAfter) {
            newStr += str[i].toUpperCase()
            checkAfter = false
         }  else {
            newStr += str[i].toLowerCase()
        }
        }
    }
    return newStr;
}

console.log('\nOld code... bad')
console.log("the-stealth-warrior ->", oldCamelCase("the-stealth-warrior"))
console.log("The_stealth_Warrior ->", oldCamelCase("The_stealth_Warrior"))
console.log("The_Stealth-warrior ->", oldCamelCase("The_Stealth-warrior"))

function toCamelCase(str){

    let isAfter = false;
    let isFirstLetterProcessed = false;

    return str
    .split('')
    .filter(letter => letter.match(/[-_a-zA-Z]/))
    .map((letter) => !isFirstLetterProcessed && letter.match(/[a-zA-Z]/) ? (isFirstLetterProcessed = true, letter) :
                    !isFirstLetterProcessed ? null :
                    letter.match(/[-_]/) ? (isAfter = true, null) :
                    isAfter ? (isAfter = false, letter.toUpperCase()) : 
                    letter.toLowerCase())
    .join('')
}

console.log('\nNew code... good')
console.log("-the-stealth-wa!rrior ->", toCamelCase("-the-stealth-wa!rrior"))
console.log("_The_st.ealth_Warrior ->", toCamelCase("_The_st.ealth_Warrior"))
console.log("The_Stealth-war?rior ->", toCamelCase("The_Stealth-war?rior"))
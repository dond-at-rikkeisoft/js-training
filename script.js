//-----------------------------------------------------------------
// Bài tập 1:
function isprime(n){
    let flag = 1;
    if (n <2) return flag = 0;
    let i = 2;
    while(i <n){
        if( n%i==0 ) {
            flag = 0;
            break; 
        }
        i++;
    }
    return flag;
}

let n= 1000;

let i = 0, check=0, result ="";
   while ( i < n){
    check = isprime(i);
    if( check == 1 ) result += i + " ";
    ++i;
}
console.log(result); 

//-----------------------------------------------------------------
//Bài tập 2:

var arr1 = [1,2,3,4,5,6,7]

var arr2 = [1,2,3,9]

var arr3 = new Set()

arr1.forEach(x => {

    arr3.add(x)

});
let results = []
arr2.forEach(x => {
    if (arr3.has(x)) results.push(x)

});
console.log(results)

//-----------------------------------------------------------------
//Bài tập 3:

function palindrome(str) {

    var len = str.length;
    var mid = Math.floor(len/2);
    for ( var i = 0; i < mid; i++ ) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
}
  console.log(palindrome("121"))
 

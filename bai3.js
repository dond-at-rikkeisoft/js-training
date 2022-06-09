const number = (a) => {
    return a.toString()
}

const revNumber = (b) => {
    let length = b.length
    var arr = [];
    for (var i= length-1; i >= 0 ; i --){
        arr.push(b.charAt(i))
    }
    return arr.join("")
}

function result (x){
    let num = number(x)
    if(num == revNumber(num)){
        console.log("Palindrome Number!")
    }else{
        console.log("Not Palindrome Number!")
    }
}

result(1221)
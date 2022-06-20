const prime = (number) => {
    if (number < 2){
        return false
    }
    else{
        let count = 0;
        for (var i = 2 ; i <= Math.sqrt(number); i++){
            if (number % i == 0){
                count ++
            }
        }
        if(count == 0){
            return true
        }else{
            return false
        }
    }
    
}
var result = [] 
for (let i = 0 ; i <= 100000 ; i++){
    if (prime(i) == true){
        result.push(i)
    }
}

console.log(result)
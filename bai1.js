const snt = (a) => {
    if (a < 2){
        return false
    }
    else{
        let count = 0;
        for (var i = 2 ; i <= Math.sqrt(a); i++){
            if (a % i == 0){
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

var result = [] // mảng lưu kết quả
for (let i = 0 ; i <= 100000 ; i++){
    if (snt(i) == true){
        result.push(i)
    }
}

console.log(result)
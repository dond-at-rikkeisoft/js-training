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
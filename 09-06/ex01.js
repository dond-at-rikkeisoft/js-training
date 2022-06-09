const endPoint = 100;

const primeNumbers = (number) => {
  const results = [];
  const array = new Array(number + 1);
  for (let i = 2; i < array.length; i++) {
    if (!array[i]) {
      results.push(i);
      for (let j = 2 * i; j < array.length; j += i) {
        array[j] = true;
      }
    }
  }
  return results;
};

console.log(primeNumbers(endPoint));

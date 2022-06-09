const input = 12321;

const isPalindromeNumber = (number) => {
  const array = number.toString().split('');
  const length = array.length;
  const middle = Math.trunc(length / 2);
  for (let i = 0; i <= middle; i++) {
    if (array[i] !== array[length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindromeNumber(input));

const firstNumbers = [1, 2, 3, 4, 5, 6, 7];
const secondNumbers = [1, 2, 3, 7];

const commonArray = (firstList, secondList) => {
  firstList.sort();
  secondList.sort();
  let firstPoint = 0;
  let secondPoint = 0;
  let firstLength = firstList.length;
  let secondLength = secondList.length;
  const results = [];

  while (true) {
    if (firstPoint >= firstLength || secondPoint >= secondLength) break;
    if (firstList[firstPoint] < secondList[secondPoint]) {
      firstPoint++;
      continue;
    }
    if (firstList[firstPoint] > secondList[secondPoint]) {
      secondPoint++;
      continue;
    }
    results.push(firstList[firstPoint]);
    firstPoint++;
    secondPoint++;
  }
  return results;
};

console.log(commonArray(firstNumbers, secondNumbers));

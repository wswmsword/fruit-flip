
export function shuffle(array) {
  // const copyArray = array.map(e => e)
  const copyArray = [...array];
  for (let i = copyArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
}

export function randomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
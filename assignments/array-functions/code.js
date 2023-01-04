const countTens = (array) => {
  let num = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 10) {
      num++;
    }
  }
  return num;
}

const sum = (array) => {
  let num = 0;
  for (let i = 0; i < array.length; i++) {
    num += array[i]
  }
  return num;
}

const evens = (array) => {
  let arraydos = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      arraydos.push(array[i])
    }
  }
  return arraydos;
}

const anyOverOneHundred = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 100) {
      return true
    }
  }
  return false
}

const pyramid = (num) => {
  let i = 0;
  let array = [];
  for (i = 0; i <= num; i++) {
    for (let oi = 0; oi < i; oi++) {
      array.push(i);
    }
  }
  return array;
}






function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

let sudostart = [
  ['','7','','9','','5','','',''],
  ['2','8','1','','4','','','9',''],
  ['','','','','','','','','7'],
  ['','','','','','','6','','5'],
  ['9','','6','','','','4','','2'],
  ['','','','4','','','','',''],
  ['','','','2','','8','','',''],
  ['','5','4','','','3','','',''],
  ['','','','','','','','8','3'],
]

const canBePlaced = (ay, ax, sudostart1, placement) => {
  const box_x = Math.floor(ax/3)
  const box_y = Math.floor(ay/3)
  for(let y = box_y*3;  y < box_y*3+3; y++){
    for(let x = box_x*3;  x < box_x*3+3; x++){
      if((sudostart1[x][y]+"")===(placement+"")&&!((ay===y)&&(ax===x))){
        return false
      }
    }
  }

  for(let i = 0; i<sudostart1[0].length; i++){
    if((sudostart1[i][ay]+"")===(placement+"")&&i!=ax){
      return false
    }
  }
  for(let i = 0; i<sudostart1[0].length; i++){
    if((sudostart1[ax][i]+"")===(placement+"")&&i!=ay){
      return false
    }
  }
  return true
}


const drawSudo = (array) => {
  let thickness = 1;
  const spacing = height < width ? height / 9 : width / 9;
  for (let i = 0; i < 10; i++) {
    thickness = i % 3 === 0 ? 3 : 1;
    drawLine(0, spacing * (i), height, spacing * (i), 'black', thickness)
  }
  for (let i = 0; i < 10; i++) {
    thickness = i % 3 === 0 ? 3 : 1;
    drawLine(spacing * (i), 0, spacing * (i), width, 'black', thickness)
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (array[y][x] != undefined) {
        drawText(array[y][x], (x * spacing)+spacing/4, (y * spacing) + spacing-spacing/4, 'black', spacing*5/6)
      }
    }
  }
}

const printSudo = (array) => {
  let str = "";
  let line = "-----------------"

  for (let y = 0; y < 9; y++) {

    if (y % 3 === 0 && y != 0) {
      str += line + "\n"
    }

    for (let x = 0; x < 9; x++) {

      if ((x) % 3 === 0) {
        str += "|"
      }
      else {
        str += " "
      }
      if (array[y][x][0] === "") {
        str = (str + "-")
      }
      else {
        str = (str + array[y][x])
      }
    }
    str = (str + "|" + "\n")
  }
  console.log(str)
}


const filled = (array) => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (array[y][x]=== "") {
        return [x, y]
      }
    }
  }
  return 'fill'
}

async function solve (array){

  const find = filled(array)
  let x;
  let y;
  if (find === 'fill') {
    return true
  }
  else {

    x = find[0]
    y = find[1]
  }

  for (let i = 1; i <= 9; i++) {
    let canbeplaced = canBePlaced(x, y, array, i)
    if (canbeplaced) {
      array[y][x] = i
      clear();
      drawSudo(array)
      
      if (await solve(array)) {
        return true
      }
      
      array[y][x] = ''
      clear();
      drawSudo(array)
  
    }

  }
  return false
}
solve(sudostart)
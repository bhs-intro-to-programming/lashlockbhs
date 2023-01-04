// For a change of pace, I'm providing you with all the function skeletons. This
// should save you some time.

const area = (rect) => {
  return rect.width * rect.height;
};

const higherPaid = (e1, e2) => {
  return e1.salary > e2.salary ? e1 : e2;
};

const isSamePoint = (p1, p2) => {
  return (p1.x === p2.x) && (p1.y === p2.y);
};

const totalWithTip = (bill, tipPercentage) => {
  return {"subtotal" : bill.subtotal, "tip" : bill.subtotal*tipPercentage, "total" : bill.subtotal+bill.subtotal*tipPercentage}
};

const isWinner = (player) => {
  return player.score > 100
};

const updateWins = (players) => {
  players.map(player => isWinner(player) ? player.wins++ : "")
};

const bigWinners = (players) => {
  const bigWinners = []
  players.map(player => player.wins > 10 ? bigWinners.push(player) : "")
  return bigWinners
};

const fillTimesTable = (table) => {
  for(let y = 1; y<=table.length; y++){
    for(let x = 1; x<=table.length; x++){
      table[y-1][x-1] = y*x
    }
  }
};

const sums = (n) => {
  const array = [0]
  for(let i = 1; i<n+1; i++){
    array.push(i+array[i-1])
  }
  return array;
};

const rule110 = (cells) => {
  const newCells = []
  for(let i = 0; i<cells.length; i++){
    if(i === 0 ? 0 : cells[i-1] + cells[i] + i === cells.length-1 ? 0 : cells[i+1]=== 0){
      newCells.push()
    }
  }
};

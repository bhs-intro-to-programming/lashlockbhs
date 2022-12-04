// Write your code here. To run a function on a given test file you need to
// create a file in your github repo in the advent-of-code branch and in the
// advent-of-code directory. Then you can use a function `run` to run a
// particular function on the contents of the file, which will be passed to your
// function as a string.
//
// For example, if I've created a file 'day_01.test' to contain the test data
// from day 1, and a function, day01Part1, I can run the function with this
// call:
//
//   run('day_01.test', day01Part1)
//
// Which will load the file and pass them to your function and then print the
// return value in the REPL.


//opponite       you
//A = rock = 1, X  
//B = paper = 2, Y
//C = scissors = 3, Z

//A, X tie correct
//A, Y win correct
//A, Z loss correct

//B, X loss correct
//B, Y tie correct
//B, Z win correct

//C, X win correct
//C, Y loss correct
//C, Z tie correct

// 1-3 = -2 rock vs scissors, loss
// 3-1 = 2 scissors vs rock, win

//1-2 = -1
//2-1 = 1

//index of there play -1 corresponds to our play in our play array
//them = [A, B, C]

//us = [X, Y, Z]
//if(us[them.indexOf(play)-1]===play)
const day01Part1 = (str) => {
  const numbers = str.split('\n');
  let currelfnum = 0;
  let max = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] != "") {
      currelfnum += parseInt(numbers[i]);
    }
    else {
      if (currelfnum > max) {
        max = currelfnum;
      }
      currelfnum = 0;
    }
  }
  return max;
}

const day02Part1 = (str) => {
  const games = str.split("\n");
  let score = 0;
  const them = ["A", "B", "C"]
  const us = ["X", "Y", "Z"]
  
  for (let i = 0; i < games.length-1; i++) {
    let thereplay = games[i].substring(0, 1)
    //console.log(thereplay)
    let ourplay = games[i].substring(2, 3)
    console.log((them.indexOf(thereplay)-1 === -1 ? 2 : them.indexOf(thereplay)-1) + " " + us.indexOf(ourplay))
    if ((them.indexOf(thereplay)-1 === -1 ? 2 : them.indexOf(thereplay)-1) === us.indexOf(ourplay)) {
      score+=us.indexOf(ourplay)+1
      console.log("Loss " + thereplay + ", " + ourplay)
    }
    else if (us.indexOf(ourplay) === them.indexOf(thereplay)) {
      score+=3+us.indexOf(ourplay)+1
      console.log("Tie " + thereplay + ", " + ourplay)
    }
    else{
      score+=6+us.indexOf(ourplay)+1
      console.log("Win " + thereplay + ", " + ourplay)
    }
  }
  return score

}

const day02Part2 = (str) =>{
  const games = str.split("\n");
  let score = 0;
  //A, X loss: A, C1: index : 0, 2, is -1
  //A, Y tie: A, A1: index : 0, 0 is +0
  //A, Z win: A, B1: index : 0, 1 is +1

  //B, X loss: B, A1: index : 1, 0 : for loss index +2 : X index : 0 - 1 = -1
  //B, Y tie: B, B1: index : 1, 1 : for tie index +0 : Y index : 1 - 1 = 0
  //B, Z win: B, C1: 1, 2 : for win index +1 : Z index : 2 - 1 = 1
  const them = ["A", "B", "C"]
  const us = ["A1", "B1", "C1"]
  const goals = ["X", "Y", "Z"]
  for (let i = 0; i < games.length-1; i++) {
    let goal = games[i].substring(2, 3)

    let thereplay = games[i].substring(0, 1)
    let indexofourplay = them.indexOf(thereplay) - (goals.indexOf(goal)-1)
    console.log("indexofourplay math: "  + them.indexOf(thereplay) + " - " + (goals.indexOf(goal)-1))
    let ourplay = indexofourplay === -1 ? us[2] : us[indexofourplay]

    console.log("thereplay: " + thereplay + ", goal: " + goal + ", ourplay " + ourplay + ", index of ourplay: " + indexofourplay)

    if ((them.indexOf(thereplay)-1 === -1 ? 2 : them.indexOf(thereplay)-1) === us.indexOf(ourplay)) {
      score+=us.indexOf(ourplay)+1
      console.log("Loss " + thereplay + ", " + ourplay)
    }
    else if (us.indexOf(ourplay) === them.indexOf(thereplay)) {
      score+=3+us.indexOf(ourplay)+1
      console.log("Tie " + thereplay + ", " + ourplay)
    }
    else{
      score+=6+us.indexOf(ourplay)+1
      console.log("Win " + thereplay + ", " + ourplay)
    }
  }
  return score
}
run('day_02.test', day02Part2)
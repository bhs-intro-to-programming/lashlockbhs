
let shapeCordsSquare = [
  { "xAdd": 0, "yAdd": 50 },
  { "xAdd": 50, "yAdd": 0 },
  { "xAdd": 0, "yAdd": -50 },
  { "xAdd": -50, "yAdd": 0 },
]

let trinaglesides = [
  { "xAdd": 15, "yAdd": -30 },
  { "xAdd": 15, "yAdd": 30 },
  { "xAdd": -30, "yAdd": 0 },
]

const rotate = (cx, cy, x, y, angle) => {
  let radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

const vector = (angle, magnitude) => {
  return ({ angle: angle * Math.PI / 180, magnitude })
}

const add2Vectors = (a) => {
  const x1 = Math.cos(a[0].angle) * a[0].magnitude
  const x2 = Math.cos(a[1].angle) * a[1].magnitude
  const y1 = Math.sin(a[0].angle) * a[0].magnitude
  const y2 = Math.sin(a[1].angle) * a[1].magnitude
  const angle = Math.atan2(y1 + y2, x1 + x2)
  const mag = Math.sqrt((x1 + x2) ** 2 + (y1 + y2) ** 2)
  return ({ angle, magnitude: mag })
}

const vectorMultiply = (o, n) => {
  if (n >= 0) {
    return ({ angle: o.angle, magnitude: o.magnitude * n })
  } else {
    return ({ angle: o.angle + Math.PI, magnitude: o.magnitude * -n })
  }
}

const addNumVectors = (a, mode) => {
  if (mode === 'degrees') {
    const r = a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))
    r.angle = r.angle * 180 / Math.PI
    return r
  } else {
    return a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))
  }
}

const EARTH_GRAVITY = 9.8
const G = 6.6743e-11
class Shape {
  constructor(sidesCords, x, y, rotation, centerX, centerY, mass, actingForces) {
    this.sidesCords = sidesCords;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.centerX = this.x + centerX; //offset from x
    this.centerY = this.y + centerY; //offset from y
    //this.force = addNumVectors(actingForces);
  }

  drawShape() {
    let currX = this.x;
    let currY = this.y;

    for (let i = 0; i < this.sidesCords.length; i++) {
      let cordSetStart = rotate(this.centerX, this.centerY, currX, currY, this.rotation)
      let cordSetEnd = rotate(this.centerX, this.centerY, currX + this.sidesCords[i].xAdd, currY + this.sidesCords[i].yAdd, this.rotation)
      drawLine(cordSetStart[0], cordSetStart[1], cordSetEnd[0], cordSetEnd[1], 'black', ctx);
      currX = currX + this.sidesCords[i].xAdd;
      currY = currY + this.sidesCords[i].yAdd;
    }
  }
  getBoundOfObject() {
    let currX = this.x; //inverse this because x and y were switced for some reason to lazy to figure out its 1am
    let currY = this.y;
    let array = []
    let n;
    for (let i = 0; i < this.sidesCords.length; i++) {
      let cordSetStart = rotate(this.centerX, this.centerY, currX, currY, this.rotation)
      let cordSetEnd = rotate(this.centerX, this.centerY, currX + this.sidesCords[i].xAdd, currY + this.sidesCords[i].yAdd, this.rotation);
      let numOfSidePixels = Math.round(Math.sqrt(((cordSetStart[0] - cordSetEnd[0]) ** 2) + ((cordSetStart[1] - cordSetEnd[1]) ** 2)));


      let xAddPerPix = (cordSetEnd[0] - cordSetStart[0]) / numOfSidePixels
      let yAddPerPix = (cordSetEnd[1] - cordSetStart[1]) / numOfSidePixels



      for (n = 0; n < numOfSidePixels; n++) {
        array.push({ "x": cordSetStart[0] + n * xAddPerPix, "y": cordSetStart[1] + n * yAddPerPix })
      }

      currX = currX + this.sidesCords[i].xAdd;
      currY = currY + this.sidesCords[i].yAdd;
    }
    return array
  }
}




const gravAttraction = (o1, o2) => {
  const distance = Math.hypot(Math.abs(o1.position.x - o2.position.x), Math.abs(o1.position.y - o2.position.y))
  return (o1.mass * o2.mass * G) / distance ** 2
}

const drawPoints = (array, color) => {
  for (let i = 0; i < array.length; i++) {
    drawLine(array[i].x, array[i].y, array[i].x + 0.5, array[i].y + 0.5, color, ctx)
  }
}

const collisions = (shapes) => {
  const collisionPoints = []

  for (let shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    for (let shapeNumCheck = shapeNum; shapeNumCheck < shapes.length; shapeNumCheck++) {
      if (shapeNum != shapeNumCheck) {
        const currShapeBounds = shapes[shapeNum].getBoundOfObject()
        const currShapeBoundsCheck = shapes[shapeNumCheck].getBoundOfObject()

        for (let currShapeBoundsIndex = 0; currShapeBoundsIndex < currShapeBounds.length; currShapeBoundsIndex++) {
          for (let currShapeBoundsCheckIndex = 0; currShapeBoundsCheckIndex < currShapeBoundsCheck.length; currShapeBoundsCheckIndex++) {

            if (Math.sqrt((currShapeBounds[currShapeBoundsIndex].x - currShapeBoundsCheck[currShapeBoundsCheckIndex].x) ** 2 + (currShapeBounds[currShapeBoundsIndex].y - currShapeBoundsCheck[currShapeBoundsCheckIndex].y) ** 2) <= 1) {

              collisionPoints.push({ "x": currShapeBounds[currShapeBoundsIndex].x, "y": currShapeBounds[currShapeBoundsIndex].y, "shape1": shapes[shapeNum], "shape2": shapes[shapeNumCheck] })
            }
          }
        }
      }
    }
  }
  return collisionPoints;
}

const square1 = new Shape(shapeCordsSquare, 50, 88, 0, 5, 5, 5, []);
const triangle1 = new Shape(trinaglesides, 300, 100, 25, 5, 5, 5, []);


let next = 0;
let countFrame = 0;
let timetilupdate = 20 //milaseconds between each frame
const drawFrame = (time) => {
  if (time > next) {

    clear();

    const collisionPoints = collisions([square1, triangle1])

    

    //sample collison code
    if (collisionPoints.length >= 1) {
    }
    else {
      square1.x += 1;
    }

    const squareObjectBound = square1.getBoundOfObject();
    const triangleObjectBound = triangle1.getBoundOfObject();

    drawPoints(squareObjectBound, "red")
    drawPoints(triangleObjectBound, "red")





    next += timetilupdate;
    countFrame++;
  }
}

animate(drawFrame);



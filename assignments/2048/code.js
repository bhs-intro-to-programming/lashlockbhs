
//rotational acceleration???
const detectSelfIntersection = (shape) => shape.getBoundOfObject


drawFilledRect(0, 0, width, height, 'black')

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
              //object add
              collisionPoints.push({ "x": currShapeBounds[currShapeBoundsIndex].x, "y": currShapeBounds[currShapeBoundsIndex].y, "shape1": shapes[shapeNum], "shape2": shapes[shapeNumCheck] })
            }
          }
        }
      }
    }
  }
  //returns an array of objects that have a x, y point of collison and the shapes involoved
  return collisionPoints;
}

const getBoundCenter = (arr) => {
  const sigma = (start, end, funct) => {
    let sum = 0
    for (let n = start; n <= end; n++) {
      sum += funct(n)
    }
    return sum
  }
  const findCentroid = (points) => {
    const pts = points.concat(points[0])
    const area = (sigma(0, pts.length - 2, i => (pts[i].x * pts[i + 1].y) - (pts[i + 1].x * pts[i].y))) / 2
    const x = (sigma(0, pts.length - 2, i => (pts[i].x + pts[i + 1].x) * ((pts[i].x * pts[i + 1].y) - (pts[i + 1].x * pts[i].y)))) / (6 * area)
    const y = (sigma(0, pts.length - 2, i => (pts[i].y + pts[i + 1].y) * ((pts[i].x * pts[i + 1].y) - (pts[i + 1].x * pts[i].y)))) / (6 * area)
    return ({ x, y })
  }
  const returner = findCentroid(arr)
  return returner

  /* let xMinMax = {min: arr[0].x, max: arr[0].x}
   let yMinMax =  {min: arr[0].y, max: arr[0].y}
   for (const e of arr){
     if (e.x < xMinMax.min) xMinMax.min = e.x
     if (e.x > xMinMax.max) xMinMax.max = e.x
     if (e.y < yMinMax.min) yMinMax.min = e.y
     if (e.y > yMinMax.max) yMinMax.max = e.y
   }*/

  //return {x: (xMinMax.min + xMinMax.max)/2 , y: (yMinMax.min + yMinMax.max)/2 }
}
//from web
const rotate = (cx, cy, x, y, angle) => {
  let radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

//vector manipulation
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

class Shape {
  constructor(mass, actingForces, vertices) {
    this.startingX = vertices[0].x //for draw
    this.startingY = vertices[0].y //for draw
    this.sides = createSides(vertices)
    this.vertices = vertices
    this.mass = mass
    this.centerX = getBoundCenter(vertices).x
    this.centerY = getBoundCenter(vertices).y
    this.rotation = 0
    this.actingForce = [addNumVectors(actingForces)]
  }
  drawShape() {
    let currX = this.startingX;
    let currY = this.startingY;

    for (let i = 0; i < this.sides.length; i++) {
      let coordSetStart = rotate(this.centerX, this.centerY, currX, currY, this.rotation)
      let coordSetEnd = rotate(this.centerX, this.centerY, currX + this.sides[i].xAdd, currY + this.sides[i].yAdd, this.rotation)
      drawLine(coordSetStart[0], coordSetStart[1], coordSetEnd[0], coordSetEnd[1], 'white', ctx);
      currX = currX + this.sides[i].xAdd;
      currY = currY + this.sides[i].yAdd;
    }
  }
  getBoundOfObject() {
    let currX = this.startingY;
    let currY = this.startingX;
    let array = []
    for (let i = 0; i < this.sides.length; i++) {
      let coordSetStart = rotate(this.centerX, this.centerY, currX, currY, this.rotation)
      let coordSetEnd = rotate(this.centerX, this.centerY, currX + this.sides[i].xAdd, currY + this.sides[i].yAdd, this.rotation);
      let numOfSidePixels = Math.round(Math.sqrt(((coordSetStart[0] - coordSetEnd[0]) ** 2) + ((coordSetStart[1] - coordSetEnd[1]) ** 2)));

      drawLine(coordSetStart[0], coordSetStart[1], coordSetEnd[0], coordSetEnd[1])

      let xAddPerPix = (coordSetEnd[0] - coordSetStart[0]) / numOfSidePixels
      let yAddPerPix = (coordSetEnd[1] - coordSetStart[1]) / numOfSidePixels

      for (let n = 0; n < numOfSidePixels; n++) {
        array.push({ "x": coordSetStart[0] + n * xAddPerPix, "y": coordSetStart[1] + n * yAddPerPix })
      }

      currX = currX + this.sides[i].xAdd;
      currY = currY + this.sides[i].yAdd;
    }
    return array
  }
}


const createSides = (array) => {
  const returnArray = []
  for (let v = 0; v < array.length - 1; v++) {
    returnArray.push({ xAdd: array[v + 1].x - array[v].x, yAdd: array[v + 1].y - array[v].y })
  }
  returnArray.push({ xAdd: array[0].x - array[array.length - 1].x, yAdd: array[0].y - array[array.length - 1].y })
  return returnArray
}


const ObjArray = []
let vertices = []
/*
registerOnclick((x, y) => {
  drawFilledCircle(x, y, 1.7, 'white')
  vertices.push({ x, y })
})


registerOnKeyDown((Space) => {
  ObjArray.push(new Shape(10, [vector(0, 0)], vertices))
  ObjArray[ObjArray.length - 1].drawShape()
  drawFilledCircle(ObjArray[ObjArray.length - 1].centerX, ObjArray[ObjArray.length - 1].centerY, 2.5, "red")
  vertices = []
})

console.log("3")
//animate(drawFrame)

const drawFrame = (time) => {
  if (time > next) {

    clear();
    for (const element of ObjArray) {
      addGravity(element, ObjArray)
      addNumVectors(element.actingForce)
      const objectBound = element.getBoundOfObject();

      element.drawShape();
      element.rotation = countFrame * 1;
      next += 10;
      countFrame++;
    }
  }
}

animate(drawFrame)
*/

const twoPointXYDif = (p1, p2) =>{ 
  return { xDif: (p1.x - p2.x), yDif: (p1.y - p2.y) }; 
};

const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y)//math func

const closePoints = (ar1, ar2) => ar1.filter(e => ar2.find(e2 => distance(e, e2) <= 1) != undefined ? true : false)
const vertC = (n) => {
  const ar = []
  for (let i = 0; i < n; i++) {
    ar.push({ x: Math.round(Math.random() * 10), y: Math.round(Math.random() * 10) })
  }
  return ar
}

const centerX = 10
const centerY = 20
vertices = vertC(3)
const vertDifs = []

for (const vert of vertices) {
  vertDifs.push(twoPointXYDif(vert, { x: centerX, y: centerY }))
}

vertices.forEach((e, i) => e = { x: centerX + vertDifs[i].xDif, y: centerY + vertDifs[i].yDif })
console.log(vertices[0].x)

const centerX = 43
const centerY = 32

vertices.forEach((e, i) => e = { x: centerX + vertDifs[i].xDif, y: centerY + vertDifs[i].yDif })
console.log(vertices[0].x)

//code physics here    
//use draw and helper funtions
let next = 0;
let countFrame = 0
let shapeCordsSquare = [
    { "xAdd": 0, "yAdd": 10 },
    { "xAdd": 10, "yAdd": 0 },
    { "xAdd": 0, "yAdd": -10 },
    { "xAdd": -10, "yAdd": 0 },
]

let trinaglesides = [
    { "xAdd": 5, "yAdd": -10 },
    { "xAdd": 5, "yAdd": 10 },
    { "xAdd": -10, "yAdd": 0},
]

//from web
const drawCoordinates = (x, y) => {
    let pointSize = 0.5;

    ctx.fillStyle = "#ff2626";

    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);

    ctx.fill();

}


//center cords 0,0 are shape x, y cords 
const shape = (sidesCords, x, y, rotation, centerX, centerY, mass) => {
    const shapeProperties = {
        "x": x,
        "y": y,
        "sidesCords": sidesCords,
        "rotation": rotation,
        "centerX": centerX,
        "centerY": centerY,
        "mass" : mass,
    }
    //redefining because can't refer to x,y in object
    shapeProperties.centerX = shapeProperties.centerX + shapeProperties.x
    shapeProperties.centerY = shapeProperties.centerY + shapeProperties.y
    return shapeProperties;
}

const drawShape = (shape) => {
    console.log(shape.x)
    let currX = shape.x;
    let currY = shape.y;

    for (let i = 0; i < shape.sidesCords.length; i++) {
        let cordSetStart = rotate(shape.centerX, shape.centerY, currX, currY, shape.rotation)
        let cordSetEnd = rotate(shape.centerX, shape.centerY, currX + shape.sidesCords[i].xAdd, currY + shape.sidesCords[i].yAdd, shape.rotation)
        drawLine(cordSetStart[0], cordSetStart[1], cordSetEnd[0], cordSetEnd[1], 'black', ctx);
        currX = currX + shape.sidesCords[i].xAdd;
        currY = currY + shape.sidesCords[i].yAdd;
    }
}
const collisons = (objects) => {
    for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
        for (let checkIndex = 0; checkIndex < objects.length; checkIndex++) {

        }
    }
}

const getBoundOfObject = (shape) => {
    let currX = 0;
    let currY = 0;
    let array = []
    let n;
    for (let i = 0; i < shape.sidesCords.length; i++) {
        let rotatedSideCords = rotate(shape.centerX, shape.centerY, shape.centerX + shape.sidesCords[i].xAdd, shape.centerY + shape.sidesCords[i].yAdd, shape.rotation)
        console.log("rotate point: " + shape.centerX + ", " + shape.centerY + " Xadd, Yadd: " + shape.sidesCords[i].xAdd + ", " + shape.sidesCords[i].yAdd + " rotation: " + shape.rotation + " new Xadd, Yadd: " + (rotatedSideCords[0] - shape.centerX) + ", " + (rotatedSideCords[1] - shape.centerY))
        let numOfSidePixels = Math.floor(Math.sqrt(shape.sidesCords[i].xAdd ** 2 + shape.sidesCords[i].yAdd ** 2))
        let xAddperpix = (rotatedSideCords[0] - shape.centerX) / numOfSidePixels
        let yAddperpix = (rotatedSideCords[1] - shape.centerY) / numOfSidePixels

        for (n = 0; n < numOfSidePixels; n++) {
            array.push({ "x": shape.centerX + (currX + (xAddperpix * n)), "y": shape.centerY + (currY + (yAddperpix * n)) })

        }
        currX = currX + (xAddperpix * n);
        currY = currY + (yAddperpix * n);
    }
    return array;
}
//math from web
const rotate = (cx, cy, x, y, angle) => {
    let radians = (Math.PI / 180) * angle;
    cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}


//used to debug by visulizing array of points
const drawPoints = (array) => {
    for (let i = 0; i < array.length; i++) {
        drawCoordinates(array[i].x, array[i].y)
    }
}

const square1 = shape(shapeCordsSquare, 100, 100, 10, 5, 5, 5)
const triangle1 = shape(trinaglesides, x = 100, y = 150, 0, 5, 5, 5)

//const objectBound = getBoundOfObject(square1)
//console.log(objectBound)
//drawPoints(objectBound)
drawShape(triangle1)
drawShape(square1)

/*
const drawFrame = (time) => {
  if (time > next) {
    
    clear(ctx, c);

    const objectBound = getBoundOfObject(square1)
    console.log(objectBound)

    drawPoints(objectBound)
    drawShape(square1)
    
    square1.rotation = countFrame*1;
    next += 10
    countFrame++
  }
}

animate(drawFrame)
*/



/*
 * This code is running in an environment the same as simple-draw. Thus you have
 * two variables that will be helpful.
 *
 *  width - the width of the drawing area.
 *  height - the height of the drawing area.
 *
 * And these methods which do the same thing as in simple-draw.
 *
 *  drawLine(x1, y1, x2, y2, color, lineWidth)
 *
 *  drawCircle(x, y, radius, color, lineWidth=1)
 *
 *  drawRect(x, y, w, h, color, lineWidth=1)
 *
 *  drawTriangle(x1, y1, x2, y2, x3, y3, color, lineWidth=1)
 *
 *  drawFilledCircle(x, y, r, color)
 *
 *  drawFilledRect(x, y, width, height, color)
 *
 *  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color)
 *
 *  clear()
 * 
 *
 */


const notreallycurved =(num, base, rside)=>{
  for(let linesD = 0; linesD!=num; linesD++){
    drawLine(rside/num*linesD, base, 0, base/num*linesD, "black", 0.5)
  }

}
const lineOfCircles = (size) =>{
  const num = (width-size*3)/size
  for(let i = 0; num!=i+1; i++){
    drawFilledCircle(size*1.5+i*size*2, height/2, size)
  }

}
lineOfCircles(20)



//20 = 1.348 
//-100
//30 = 1.179
//-100
//40 = 1.084
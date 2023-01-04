const z_sqr = (x, y) => {
  return [x ** 2 - y ** 2, 2 * x * y];
}
const f = (z, c) => {
  return [z_sqr(z[0], z[1])[0] + c[0], z_sqr(z[0], z[1])[1] + c[1]]
}
const isPixelInSet = (c, iterations) => {
  let z = [0, 0]
  let i = 0
  for (i; i < iterations; i++) {
    z = f(z, c);
    if (!isFinite(z[0]) || !isFinite(z[1])) {
      return i
    }
  }
  return 0
}
const drawmandel = (iterations, bx, by, centerx, centery, zoom, c) => {
  const ofx = -((centerx / (width / bx)) * zoom);
  const ofy = ((centery / (height / by)) * zoom);
  drawLine(by / 2, 0, bx / 2, by, 'black')
  drawLine(0, by / 2, bx, by / 2, 'black')
  for (let y = -ofy; y <= by - ofy; y++) {
    for (let x = -ofx; x <= bx - ofx; x++) {
      const xm = (-2 - (ofx / bx)) / zoom + ((4 / zoom) / bx) * x
      const ym = (2 + (ofy / by)) / zoom - ((4 / zoom) / by) * y
      let pixelinset = isPixelInSet([xm, ym], iterations)
      pixelinset === 0 ? drawLine(x + ofx, y + ofy, x + 1 + ofx, y + ofy, c) : drawLine(x + ofx, y + ofy, x + 1 + ofx, y + ofy, 'hsl(' + (pixelinset * 2) + ', 100%, 50%)')
    }
  }
}
const x = -85
const y = 0
const maxiterations = 10000
const zoom = 5
drawmandel(maxiterations, height, height, x, y, zoom, 'black')



var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(50, 50, window.innerWidth - 100, window.innerHeight - 100)

// c.beginPath()

// for (let index = 1; index < 15; index++) {
//   c.moveTo(
//     Math.random() * window.innerWidth,
//     Math.random() * window.innerHeight
//   )
//   c.lineTo(
//     Math.random() * window.innerWidth,
//     Math.random() * window.innerHeight
//   )

//   let posXarc = Math.random() * window.innerWidth
//   let posYarc = Math.random() * window.innerHeight

//   c.arc(posXarc, posYarc, 15, 0, Math.PI * 2, false)

//   for (let index = 0; index < 3; index++) {
//     c.arc(posXarc + 2, posYarc + 2, 15, 0, Math.PI * 2, false)
//   }
// }

// c.stroke()

// https://youtu.be/vxljFhP2krI?t=1071

var mouse = {
  x: undefined,
  y: undefined
}

var maxLimit = 40
// var minLimit = 2
var colorArray = ['#0D0106', '#3626A7', '#657ED4', '#FF331F', '#FBFBFF']

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('mouseup', function (event) {
  // this.raioCirculo = 35 * Math.random()
  console.log('click')
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})

function Circle(x, y, xVel, yVel, raioCirculo) {
  this.x = x
  this.y = y
  this.xVel = xVel
  this.yVel = yVel
  this.raioCirculo = raioCirculo
  this.minRadius = raioCirculo
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.raioCirculo, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function () {
    if (
      this.x + this.raioCirculo > window.innerWidth ||
      this.x < this.raioCirculo
    ) {
      this.xVel = this.xVel * -1
    }

    if (
      this.y + this.raioCirculo > window.innerHeight ||
      this.y < this.raioCirculo
    ) {
      this.yVel = this.yVel * -1
    }

    this.x += this.xVel
    this.y += this.yVel

    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      if (this.raioCirculo < maxLimit) {
        this.raioCirculo += 1
      }
    } else if (this.raioCirculo > this.minRadius) {
      this.raioCirculo -= 1
    }

    this.draw()
  }
}

let circleArray = []

function init() {
  circleArray = []

  for (let index = 0; index < 400; index++) {
    let raioCirculo = Math.random() * 3 + 1
    let x = Math.random() * (window.innerWidth - raioCirculo * 2) + raioCirculo
    let y = Math.random() * (window.innerHeight - raioCirculo * 2) + raioCirculo
    let xVel = Math.random() * -1
    let yVel = Math.random() * -1
    circleArray.push(new Circle(x, y, xVel, yVel, raioCirculo))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].update()
  }
}

init()
animate()

const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100;
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
  }

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

class Bubble {
    constructor (canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }
    getCanvasSize() {
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
    }
    init() {
        this.color = Math.floor(Math.random()*COLORS.length-1);
        this.size = generateDecimalBetween(1,3);
        this.alpha = (generateDecimalBetween(5,10))/10;
        this.translateX = generateDecimalBetween(0,this.canvasWidth);
        this.translateY = generateDecimalBetween(0,this.canvasHeight);
        this.velocity = generateDecimalBetween(20, 40);
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }
    move() {
        this.translateX = this.translateX-this.movementX;
        this.translateY = this.translateY-this.movementY;
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth)
         {
            this.init();
            //this.translateY = this.canvasHeight;
          }
    }
}

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }
    canvasSize() {
        this.canvas.width = this.canvas.offsetWidth*this.dpr;
        this.canvas.height = this.canvas.offsetHeight*this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }
    generateBubbles() {
            this.bubbleList = [];
            let count = 0;
            do {
                this.bubbleList.push(new Bubble(this.canvas));
                count++;
            } while (count < BUBBLE_DENSITY);
    }
    animate() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.bubbleList.forEach(element => {
            element.move();
            this.ctx.translate(element.translateX, element.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0,0,element.size, 0, 2*Math.PI);
            this.ctx.fillStyle = "green"; // ?
            this.ctx.alpha = element.alpha;
            this.ctx.fill();
            this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
            window.requestAnimationFrame(this.animate.bind(this));
        });
    }
    start() {
        this.canvasSize();
        this.generateBubbles(); 
        this.animate();
    }
  }

  const nadya = new CanvasBackground("canvas");
  nadya.start();

// const bubbles = [];
// bubbles.push(new Bubble(canvas));
// bubbles.push(new Bubble(canvas));
// bubbles.push(new Bubble(canvas));
// console.log(bubbles);
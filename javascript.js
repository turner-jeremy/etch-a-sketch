let gridSize = 16;
let trailLength = 201;
let currentColor = "black";
let isMouseDown = false;
const gridContainer = document.querySelector(".grid-container");
const gridSizeUI = document.getElementById("grid-size-display");
const gridSizeSlider = document.getElementById("grid-size");
const trailLengthSlider = document.getElementById("trail-length");
const trailLengthUI = document.getElementById("trail-length-display");
const colorPicker = document.querySelector('.color-buttons');
const colorChoice = colorPicker.querySelectorAll('input');
const clearGridBtn = document.getElementById('clear-grid');
const squareClass = document.querySelector('.square');

gridSizeSlider.oninput = function() {
    gridSize = this.value;
    gridSizeUI.textContent = this.value;
    createGrid();
    watchMouse();
}

trailLengthSlider.oninput = function() {
    trailLength = this.value;
    if (this.value === "0") {
        trailLengthUI.textContent = "Off";
    } else if (this.value === "201") {
        trailLengthUI.textContent = "∞"
    } else {
        trailLengthUI.textContent = (Math.round((this.value * 0.05) * 10) / 10).toFixed(1);
    }
}

const instructionsBtn = document.getElementById("instructions-btn");
var instructionsWindow = document.getElementById("instructions-popup");
var closeButton = document.getElementById("close-btn");

instructionsBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (instructionsWindow.style.display === "block") {
    instructionsWindow.style.opacity = 0;
   setTimeout(function () {
    instructionsWindow.style.display = 'none'
   }, 400);
  } else {
    instructionsWindow.style.display = "block";
    setTimeout(function () {
        instructionsWindow.style.opacity = 1;
      }, 40);
  }
});

closeButton.addEventListener("click", function() {
    instructionsWindow.style.opacity = 0;
    setTimeout(function () {
     instructionsWindow.style.display = 'none'
    }, 400);
});

colorChoice.forEach((radio) => {
    radio.addEventListener('click', () => {
        changeColor(radio.value);
    });
});

clearGridBtn.addEventListener('click', () => {
    createGrid();
    watchMouse();
});

gridContainer.addEventListener("mousedown", () => {
    isMouseDown = true;
});

gridContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function createGrid() {
    let currentSquare = gridContainer.querySelectorAll('div');

    if (currentSquare.length > 0) {
        currentSquare.forEach((element) => element.remove());
    }

    for (let r = 1; r <= gridSize; r++) {
        rowID = "row" + r;
        const div = document.createElement('div');
        div.setAttribute('id', rowID);
        // div.classList.add("square");
        div.classList.add("row");
        gridContainer.appendChild(div);
        let cRow = document.getElementById(rowID);
        for (let c = 1; c <= gridSize; c++) {
            colID = r + "-" + c;
            const div = document.createElement('div');
            div.setAttribute('id', colID);
            div.classList.add("square");
            cRow.appendChild(div);
        }
    }
}

function watchMouse() {
    let gridSquare = gridContainer.querySelectorAll('.square');
    gridSquare.forEach((div) => {
        div.addEventListener('mouseenter', () => {
            if (isMouseDown === true) {
                if (currentColor === 'party') {
                    div.style.backgroundColor = randomColor();
                } else {
                div.style.backgroundColor = currentColor;
                }
                fade(div);
            }
            });
            div.addEventListener('mouseleave', () => {
                if (trailLength == "0" && isMouseDown === true) {div.style.backgroundColor = "white"};
            });
    });
}

function changeColor(color) {
if (color === 'random') {
    currentColor = randomColor();
} else {
    currentColor = color;
}
}

function randomColor() {
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`
}

function fade(element) {
    if (trailLength == "0" || trailLength == "201") {return};
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.backgroundColor = 'white';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, trailLength);
}

createGrid();
watchMouse();
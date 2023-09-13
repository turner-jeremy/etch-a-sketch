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
        trailLengthUI.textContent = this.value;
    }
}

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
    console.log("Mouse Down!");
});

gridContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
    console.log("Mouse Up!");
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
            // div.classList.add("col");
            cRow.appendChild(div);
        }
    }
}

function changeGridSize() {
    let newGridSize = parseInt(prompt("Enter a value between 2 to 100"));
    if (newGridSize >= 2 && newGridSize <= 100) {
        gridSize = newGridSize;
        createGrid();
    } else {
        alert("Must be a whole number between 2 and 100!");
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
randomColor();
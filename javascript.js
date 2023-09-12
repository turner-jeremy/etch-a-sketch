let gridSize = 16;
var gridCounter = 0;
const gridContainer = document.querySelector(".grid-container");
const gridSizeUI = document.getElementById("grid-size-display");
var gridSizeSlider = document.getElementById("grid-size");

gridSizeSlider.oninput = function() {
    gridSize = this.value;
    gridSizeUI.textContent = this.value;
    createGrid();
    watchMouse();
}

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
createGrid();

watchMouse();

const gridSizeBtn = document.getElementById('grid-size-btn');

// gridSizeBtn.addEventListener('click', () => {
//         changeGridSize()   
//         watchMouse();
//     });

    function watchMouse() {
        let gridSquare = gridContainer.querySelectorAll('.square');
        gridSquare.forEach((div) => {
            div.addEventListener('mouseenter', () => {
                div.style.backgroundColor = "blue";
            });
            div.addEventListener('mouseleave', () => {
                div.style.backgroundColor = "white";
            });
    })
}




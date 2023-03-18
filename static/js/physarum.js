document.addEventListener("DOMContentLoaded", () => {
  function setCanvasSize() {
    const canvas = document.getElementById("grid-canvas");
    const gridContainer = document.querySelector(".grid-container");
    const canvasSize = Math.min(
      gridContainer.clientWidth,
      gridContainer.clientHeight
    );
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    return canvasSize;
  }
  canvasSize = setCanvasSize();

  window.addEventListener("resize", () => {
    canvasSize = setCanvasSize();
  });

  function drawGrid(canvasSize) {
    const canvas = document.getElementById("grid-canvas");
    const canvasContext = canvas.getContext("2d");
    const gridSize = 10;
    const cellSize = canvasSize / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        canvasContext.strokeStyle = "rgba(200, 200, 200, 0.5)";
        canvasContext.strokeRect(
          j * cellSize,
          i * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
  drawGrid(canvasSize);
});

//function createGrid(rows, cols) {
//const container = document.getElementById("grid-container");
//const cellSize = container.offsetWidth / cols;
//const grid = document.createElement("div");
//grid.className = "grid";
//grid.style.gridTemplateRows = rows;
//grid.style.gridTemplateColumns = cols;

//for (let i = 0; i < rows; i++) {
//for (let j = 0; j < cols; j++) {
//const dot = document.createElement("div");
//dot.className = "dot";
//dot.style.width = `${cellSize}px`;
//dot.style.height = `${cellSize}px`;
//dot.style.top = `${i * cellSize}px`;
//dot.style.left = `${j * cellSize}px`;
//container.appendChild(dot);
//}
//}
//}

//function setupInteraction() {
//const dots = document.getElementById("dot");
//let selectedDot = null;
//let foodDot = null;

//for (const dot of dots) {
//dot.addEventListener("click", function () {
//if (selectedDot) {
//selectedDot.classList.remove("selected");
//}
//if (foodDot && foodDot === dot) {
//foodDot.classList.remove("food");
//foodDot = null;
//}
//selectedDot = dot;
//dot.classList.add("selected");
//});

//dot.addEventListener("contextmenu", function (e) {
//e.preventDefault();
//if (foodDot) {
//foodDot.classList.remove("food");
//}
//if (selectedDot && selectedDot == dot) {
//selectedDot.classList.remove("selected");
//selectedDot = null;
//}
//foodDot = dot;
//dot.classList.add("food");
//});
//}
//}

//function runPhysarumSimulation() {}

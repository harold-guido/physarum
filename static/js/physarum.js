function createGrid(rows, cols) {
  const container = document.getElementById("grid-container");
  const cellSize = container.offsetWidth / cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.width = `${cellSize}px`;
      dot.style.height = `${cellSize}px`;
      dot.style.top = `${i * cellSize}px`;
      dot.style.left = `${j * cellSize}px`;
      container.appendChild(dot);
    }
  }
}

function setupInteraction() {
  const dots = document.getElementById("dot");
  let selectedDot = null;
  let foodDot = null;

  for (const dot of dots) {
    dot.addEventListener("click", function () {
      if (selectedDot) {
        selectedDot.classList.remove("selected");
      }
      if (foodDot && foodDot === dot) {
        foodDot.classList.remove("food");
        footDot = null;
      }
      selectedDot = dot;
      dot.classList.add("selected");
    });

    dot.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      if (foodDot) {
        foodDot.classList.remove("food");
      }
      if (selectedDot && selectedDot == dot) {
        selectedDot.classList.remove("selected");
        selectedDot = null;
      }
      foodDot = dot;
      dot.classList.add("food");
    });
  }
}

function runPhysarumSimulation() {}

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

document.addEventListener("DOMContentLoaded", () => {
  // Reusable constants
  const canvas = document.getElementById("grid-canvas");
  const canvasContext = canvas.getContext("2d");
  const gridSize = 25;

  let hoveredCell = { row: null, col: null };

  // Functions

  // Function to set size of canvas
  function setCanvasSize() {
    const gridContainer = document.querySelector(".grid-container");
    const canvasSize = Math.min(
      gridContainer.clientWidth,
      gridContainer.clientHeight
    );
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    return canvasSize;
  }
  let canvasSize = setCanvasSize();

  // Function to draw square grid on canvas
  function drawGrid(canvasSize) {
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

  // Helper function to debounce events
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Helper function to get grid cell coordinates
  function getGridCellCoordinates(x, y, canvasSize, gridSize) {
    const cellSize = canvasSize / gridSize;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    return { row, col };
  }

  // Helper function to keep track of hovered cell
  function trackHoveredCell(row, col) {
    if (hoveredCell.row == null && hoveredCell.col == null) {
      hoveredCell.row = row;
      hoveredCell.col = col;

      check = true;

      return { check, row, col };
    } else {
      if (hoveredCell.row != row || hoveredCell.col != col) {
        prevRow = hoveredCell.row;
        prevCol = hoveredCell.col;

        hoveredCell.row = row;
        hoveredCell.col = col;

        check = true;

        return { check, prevRow, prevCol };
      } else {
        check = false;

        return { check, row, col };
      }
    }
  }

  // Function to update hover effect
  function updateHoverEffect(x, y, canvasSize, gridSize, canvasContext) {
    const { row, col } = getGridCellCoordinates(x, y, canvasSize, gridSize);
    const { check, prevRow, prevCol } = trackHoveredCell(row, col);

    if (check) {
      // Clear previously drawn cell
      canvasContext.clearRect(
        (prevCol * canvasSize) / gridSize,
        (prevRow * canvasSize) / gridSize,
        canvasSize / gridSize,
        canvasSize / gridSize
      );

      // Redraw grid lines
      canvasContext.strokeStyle = "rgba(200, 200, 200, 0.5)";
      canvasContext.strokeRect(
        (prevCol * canvasSize) / gridSize,
        (prevRow * canvasSize) / gridSize,
        canvasSize / gridSize,
        canvasSize / gridSize
      );

      // Draw hover effect
      canvasContext.fillStyle = "rgba(200, 200, 200, 0.5)";
      canvasContext.fillRect(
        (col * canvasSize) / gridSize,
        (row * canvasSize) / gridSize,
        canvasSize / gridSize,
        canvasSize / gridSize
      );
    }
  }

  // Further listeners

  //Mouse moves
  canvas.addEventListener(
    "mousemove",
    debounce((event) => {
      const canvasRect = canvas.getBoundingClientRect();
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;

      updateHoverEffect(x, y, canvasSize, gridSize, canvasContext);
    }, 10)
  );

  //Click

  //Window resize listener
  window.addEventListener("resize", () => {
    canvasSize = setCanvasSize();
    drawGrid(canvasSize);
  });
});

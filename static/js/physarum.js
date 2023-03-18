document.addEventListener("DOMContentLoaded", () => {
  // Reusable constants
  const canvas = document.getElementById("grid-canvas");
  const canvasContext = canvas.getContext("2d");
  const gridSize = 25;

  // Colors
  const borderColor = "rgba(200, 200, 200, 0.5)";
  const selectedColor = "rgba(80, 175, 80, 0.5)";

  let hoveredCell = { row: null, col: null };
  let selectedCells = { rows: [], cols: [] };

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
        canvasContext.strokeStyle = borderColor;
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

  // Helper function to draw grid cell color
  function drawCell(row, col, color) {
    if (row != null && col != null) {
      // Clear previous color
      canvasContext.clearRect(
        (col * canvasSize) / gridSize,
        (row * canvasSize) / gridSize,
        canvasSize / gridSize,
        canvasSize / gridSize
      );

      if (color) {
        // Draw cell color
        canvasContext.fillStyle = color;
        canvasContext.fillRect(
          (col * canvasSize) / gridSize,
          (row * canvasSize) / gridSize,
          canvasSize / gridSize,
          canvasSize / gridSize
        );
      }

      // Draw grid as border
      canvasContext.strokeStyle = borderColor;
      canvasContext.strokeRect(
        (col * canvasSize) / gridSize,
        (row * canvasSize) / gridSize,
        canvasSize / gridSize,
        canvasSize / gridSize
      );
    }
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
      drawCell(prevRow, prevCol, "");

      // Draw hover effect
      drawCell(row, col, borderColor);
      // Redraw selected effect
      drawCell(row, col, selectedColor);

      // Clear previously drawn cell
      drawCell(prevRow, prevCol, "");
      //
      // If previously drawn cell was selected:
      if (checkSelected(prevRow, prevCol)) {
        drawCell(prevRow, prevCol, selectedColor);
      } else {
        drawCell(prevRow, prevCol, "");
      }
      if (!checkSelected(row, col)) {
        drawCell(row, col, borderColor);
      }
    }
  }

  function checkSelected(row, col) {
    for (let i = 0; i < selectedCells.rows.length; i++) {
      if (selectedCells.rows[i] == row && selectedCells.cols[i] == col) {
        return true;
      }
    }
    return false;
  }

  // Helper function to keep track of selected cells
  function trackSelectedCells(row, col) {
    for (i = 0; i < selectedCells.rows.length; i++) {
      if (selectedCells.rows[i] == row && selectedCells.cols[i] == col) {
        selectedCells.rows.splice(i, 1);
        selectedCells.cols.splice(i, 1);
        return "";
      }
    }
    selectedCells.rows.push(row);
    selectedCells.cols.push(col);

    if (selectedCells.rows.length > 2) {
      prevRow = selectedCells.rows.shift();
      prevCol = selectedCells.cols.shift();

      // Update hover effect for automatically unselected cell
      drawCell(prevRow, prevCol, "");

      return selectedColor;
    } else {
      return selectedColor;
    }
  }

  // Function to update selected effect
  function updateSelectEffect(row, col) {
    drawCell(row, col, trackSelectedCells(row, col));
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
  canvas.addEventListener("click", () => {
    const canvasRect = canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;
    const { row, col } = getGridCellCoordinates(x, y, canvasSize, gridSize);

    updateSelectEffect(row, col);
  });

  //Window resize listener
  window.addEventListener("resize", () => {
    canvasSize = setCanvasSize();
    drawGrid(canvasSize);
  });
});

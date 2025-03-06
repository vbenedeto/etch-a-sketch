const gridContainer = document.getElementById("grid-container");
console.log();

function createGrid(size) {
  const squaresCount = size * size;
  const squareSize = 500 / size;
  for (let i = 0; i < squaresCount; i++) {
    console.log(squaresCount);
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.cssText = `width: ${squareSize}px; height: ${squareSize}px`;
    gridContainer.appendChild(square);
  }
}

createGrid(16);

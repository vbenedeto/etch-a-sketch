let isMouseDown = false;

const gridContainer = document.getElementById("grid-container");
console.log();

function createGrid(size) {
  const squaresCount = size * size;
  const squareSize = 500 / size;
  for (let i = 0; i < squaresCount; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.cssText = `width: ${squareSize}px; height: ${squareSize}px`;
    gridContainer.appendChild(square);
  }
}

createGrid(16);

function handleMouseEvents(event) {
  if (event.type === "mousedown" && event.target.classList.contains("grid-square")) {
    event.target.style.backgroundColor = "black";
    isMouseDown = true;
  }

  if (event.type === "mousemove" && isMouseDown && event.target.classList.contains("grid-square")) {
    event.target.style.backgroundColor = "black";
  }

  if (event.type === "mouseup") {
    isMouseDown = false;
  }
}

gridContainer.addEventListener("mousedown", handleMouseEvents);
gridContainer.addEventListener("mousemove", handleMouseEvents);
document.addEventListener("mouseup", handleMouseEvents);

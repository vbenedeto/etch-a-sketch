let isMouseDown = false;
let isEraserActive = false;

const gridContainer = document.getElementById("grid-container");

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
    event.target.style.backgroundColor = isEraserActive ? "#ebe6f3" : "black";
    isMouseDown = true;
  }

  if (event.type === "mousemove" && isMouseDown && event.target.classList.contains("grid-square")) {
    event.target.style.backgroundColor = isEraserActive ? "#ebe6f3" : "black";
  }

  if (event.type === "mouseup") {
    isMouseDown = false;
  }
}

gridContainer.addEventListener("mousedown", handleMouseEvents);
gridContainer.addEventListener("mousemove", handleMouseEvents);
document.addEventListener("mouseup", handleMouseEvents);

const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");

gridSizeInput.addEventListener("input", () => {
  const newSize =  gridSizeInput.value;
  gridSizeValue.textContent = `${newSize}x${newSize}`;
  updateGrid(newSize);
})

function updateGrid(size) {
  if (size < 1 || size > 100) {
    alert("Grid size must be between 1 and 100.")
    return;
  }

  gridContainer.innerHTML = "";

  createGrid(size);
}

const eraserBtn = document.getElementById("eraser-btn");

eraserBtn.addEventListener("click", () => {
  isEraserActive = !isEraserActive;
  eraserBtn.classList.toggle("active", isEraserActive);
})
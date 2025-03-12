let isMouseDown = false;
// let isEraserBtnActive = false;
// let isColorBtnActive = true;

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

gridContainer.addEventListener("mousedown", handleMouseEvents);
gridContainer.addEventListener("mousemove", handleMouseEvents);
document.addEventListener("mouseup", handleMouseEvents);

const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");

gridSizeInput.addEventListener("input", () => {
  const newSize =  gridSizeInput.value;
  gridSizeValue.textContent = `${newSize}x${newSize}`;
  updateGrid(newSize);
});

function updateGrid(size) {
  if (size < 1 || size > 100) {
    alert("Grid size must be between 1 and 100.")
    return;
  }
  gridContainer.innerHTML = "";
  createGrid(size);
}

const buttons = document.querySelectorAll("button[data-mode]");
let activeMode = "color";

document.querySelector(`button[data-mode="${activeMode}"]`).classList.add("active");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const mode = button.getAttribute("data-mode");

    // Only update if the clicked button is not already active
    if (activeMode !== mode) {
      document.querySelector(`button[data-mode="${activeMode}"]`).classList.remove("active");
      // Activate the clicked button
      button.classList.add("active");
      // Update the active mode
      activeMode = mode;
    }
  })
})


function applyColor(square) {
  switch (activeMode) {
    case "color":
      square.style.backgroundColor = "black";
      break;
    case "eraser":
      square.style.backgroundColor = "#ebe6f3";
      break;
    default:
      square.style.backgroundColor = "#ebe6f3";
  }
}

// Handle mouse events based on the active mode
function handleMouseEvents(event) {
  if (event.type === "mousedown" && event.target.classList.contains("grid-square")) {
    applyColor(event.target);
    isMouseDown = true;
  }

  if (event.type === "mousemove" && isMouseDown && event.target.classList.contains("grid-square")) {
    applyColor(event.target);
  }

  if (event.type === "mouseup") {
    isMouseDown = false;
  }
}




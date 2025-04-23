let isMouseDown = false;
let activeMode = "color";

const gridContainer = document.getElementById("grid-container");
const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");
const colorPicker =  document.getElementById("color-picker");
const buttons = document.querySelectorAll("button[data-mode]");

//Event Listeners Setup
gridContainer.addEventListener("mousedown", handleMouseEvents);
gridContainer.addEventListener("mousemove", handleMouseEvents);
document.addEventListener("mouseup", handleMouseEvents);

colorPicker.addEventListener("mousedown", () => {
  //Switch to Custom Color mode if not already active
  if (activeMode !== "color") {
    document.querySelector(`button[data-mode="${activeMode}"]`).classList.remove("active");

    //Add the active class to the Custom Color button
    document.querySelector(`button[data-mode="color"]`).classList.add("active");

    activeMode = "color";
  }
});

gridSizeInput.addEventListener("input", () => {
  const newSize =  gridSizeInput.value;
  gridSizeValue.textContent = `${newSize}x${newSize}`;
  updateGrid(newSize);
});

buttons.forEach(button => button.addEventListener("click", changeMode));

// Initial instructions setup
function addInitialInstructions() {
  const instructions = document.createElement("p");
  instructions.id = "instructions";
  instructions.innerHTML = `Click anywhere inside this grid to start drawing ✏️<br>Click in the colored ball to choose your color 🎨<br>Change the grid size by sliding the range!<br>Switch modes with the buttons:<br>🌈 Rainbow - random colors!<br>🧽 Eraser - remove color!`;
  instructions.style.cssText = `
    position: absolute;
    color: var(--bg-color);
    text-align: center;
    top: 15%;
    width: 100%;
    font-size: 1.6rem;
    pointer-events: none;
    line-height: 48px;
  `
  gridContainer.appendChild(instructions);
}

// Grid Functions
function createGrid(size) {
  gridContainer.innerHTML = "";

  const squaresCount = size * size;
  const squareSize = 500 / size;
  for (let i = 0; i < squaresCount; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.cssText = `width: ${squareSize}px; height: ${squareSize}px`;
    gridContainer.appendChild(square);
  }
}

function updateGrid(size) {
  if (size < 1 || size > 100) {
    alert("Grid size must be between 1 and 100.")
    return;
  }
  gridContainer.innerHTML = "";
  createGrid(size);
}

// Mode & Color Functions
function changeMode(event) {
  const mode = event.target.getAttribute("data-mode");
  
  if (activeMode !== mode) {
    document.querySelector(`button[data-mode="${activeMode}"]`).classList.remove("active");
    event.target.classList.add("active");
    activeMode = mode;
  }
}

function applyColor(square) {
  switch (activeMode) {
    case "color":
      square.style.backgroundColor = getCustomColor();
      break;
    case "eraser":
      square.style.backgroundColor = "#ebe6f3";
      break;
    case "rainbow":
      square.style.backgroundColor = getRandomColor();
      break;
    default:
      square.style.backgroundColor = "#ebe6f3";
  }
}

// Mouse Event Handdling
function handleMouseEvents(event) {
  if (event.type === "mousedown" && event.target.classList.contains("grid-square")) {
    const instructions = document.getElementById("instructions");
    if (instructions) {
      instructions.remove();
    }
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

// Helper Functions
function getRandomColor() {
  const r =  Math.floor(Math.random() * 256);
  const g =  Math.floor(Math.random() * 256);
  const b =  Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function getCustomColor() {
  return colorPicker.value;
}

// Initialize Grid on Page Load
createGrid(16);
addInitialInstructions();
document.querySelector(`button[data-mode="${activeMode}"]`).classList.add("active");

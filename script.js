let inputNums = document.getElementById("inputNums");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let numbers = [];
let isSorting = false;
let isPaused = false;
let speed = 1500;


canvas.width = window.innerWidth * 0.9;
canvas.height = 500;

function draw() {
  // Clear the canvas
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the bars
  let barWidth = canvas.width / numbers.length;
  let maxValue = Math.max(...numbers);
  let scaleFactor = canvas.height / maxValue;
  for (let i = 0; i < numbers.length; i++) {
    let barHeight = numbers[i] * scaleFactor;
    let x = i * barWidth;
    let y = canvas.height - barHeight;
    ctx.fillStyle = "#3A1078";
    if (i == currentTop || i == currentBottom) {
      ctx.fillStyle = "#CD104D";
    }
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(numbers[i], x + barWidth / 2, y - 10);
  }
}

function bubbleSort(ascending) {
  isSorting = true;
  let i = 0;
  let j = numbers.length - 1;
  let swapped = false;

  let intervalId = setInterval(() => {
    if (!isPaused) {
      if (i < j) {
        currentTop = i;
        currentBottom = i + 1;
        if (
          ascending ? numbers[i] > numbers[i + 1] : numbers[i] < numbers[i + 1]
        ) {
          let temp = numbers[i];
          numbers[i] = numbers[i + 1];
          numbers[i + 1] = temp;
          swapped = true;
        }
        i++;
      } else {
        if (swapped) {
          swapped = false;
          j--;
        } else {
          clearInterval(intervalId);
          isSorting = false;
          inputNums.value = numbers.join(", ");
          currentTop = null;
          currentBottom = null;
        }
        i = 0;
      }

      draw();
    }
  }, speed);
}

function sortAscending() {
  if (!isSorting) {
    numbers = inputNums.value.split(",").map((x) => parseInt(x.trim()));
    currentTop = null;
    currentBottom = null;
    bubbleSort(true);
  }
}

function sortDescending() {
  if (!isSorting) {
    numbers = inputNums.value.split(",").map((x) => parseInt(x.trim()));
    currentTop = null;
    currentBottom = null;
    bubbleSort(false);
  }
}

document.getElementById("sortAsc").addEventListener("click", sortAscending);
document.getElementById("sortDesc").addEventListener("click", sortDescending);

draw();

let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart-btn");
let h1 = document.querySelector("h1");

let clickO = new Audio("Assets/clickO.mp3");
let clickX = new Audio("Assets/clickX.mp3");
let drawSound = new Audio("Assets/draw.mp3");
let winSound = new Audio("Assets/win.mp3");

let turnO = true; //suggests -> O turn
let drawCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

//Restart Logic
function restartGame() {
    turnO = true;
    drawCount = 0;
    enableBoxes();
    h1.innerHTML = "";

    //remove bg color
    for(let pattern of winPatterns) { 
        boxes[pattern[0]].classList.remove("winningBoxes");
        boxes[pattern[1]].classList.remove("winningBoxes");
        boxes[pattern[2]].classList.remove("winningBoxes");
    }
};

restartBtn.addEventListener("click", restartGame);

//Alternate display of O & X
boxes.forEach((box) => {
    box.addEventListener("click", function() {
        if(turnO) {
            box.innerHTML = "O";
            clickO.play();
            turnO = false;
        } else {
            box.innerHTML = "X";
            clickX.play();
            turnO = true;
        }
        box.disabled = true;

        drawCount++;
        checkWinner();
    });
});

//Disable boxes
function disableBoxes() {
    for(box of boxes) {
        box.disabled = true;
    }
};

//Enable boxes
function enableBoxes() {
    for(box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

// Function to launch the fireworks effect
function launchFireworks() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
  
      var particleCount = 50 * (timeLeft / duration);
  
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
};

//winning logic
function checkWinner() {
    let winnerFound = false;

    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                h1.innerHTML = `${pos1Val} Winner!`;

                //add bg color
                boxes[pattern[0]].classList.add("winningBoxes");
                boxes[pattern[1]].classList.add("winningBoxes");
                boxes[pattern[2]].classList.add("winningBoxes");
                
                winSound.play();
                winnerFound = true;
                disableBoxes();
                // Trigger confetti
                launchFireworks();
                break;
            }
            
        }
    }
    if(!winnerFound && drawCount >= 9) {
        h1.innerHTML = "Draw!";
        drawSound.play();
    }
};
let canvas = document.getElementById("marco");
let context = canvas.getContext("2d");
let score = 0;
let scoreP2 = 0;
let multiplier = 1;
let multiplierP2 = 1;
let streak = 0;
let streakP2 = 0;
let maxStreak = 0;
let maxStreakP2 = 0;
let once = 1; // functional condition 
let idCounter = 0; // generated tiles id
let isPlaying = true;
let isPaused = false;
let isGameOver = false;
let colorsList = [];
let colorsListP2 = [];

//Game variables
let difficultySpeed = 420; //Dificulty
let time = 5     // duration

let buttons = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
let buttonsP2 = ["D", "S", "W", "A"]
let playerScore = [{score: 0, streak: 0, maxStreak: 0, multiplier:1}, 
    {score: 0, streak: 0, maxStreak: 0, multiplier:1}]
//Images
red_dot = new Image()
red_dot.src = "../images/red_dot.png"
green_dot = new Image()
green_dot.src = "../images/green_dot.png"
orange_dot = new Image()
orange_dot.src = "../images/orange_dot.png"
blue_dot = new Image()
blue_dot.src = "../images/blue_dot.png"

//Game functions
setInterval(generateNewColors,difficultySpeed); //120 bpm

setInterval(moveRandomTiles,10)

//Frame generation
function delCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function createEmptyFrame() {
    context.fillStyle = "#4B4C4C";
    context.fillRect(0, 0, 1100, 900);

    context.fillStyle = "black";
    context.fillRect(0, 670, 1100, 130);

    context.fillStyle = "white";
   
  
    
    context.font = "bold 30px sans-serif";

    if (time <10) {
        context.fillText("00:0"+time, 505,50)
    }else
    context.fillText("00:"+time, 505,50)

    context.font = "bold 28px sans-serif";
    context.fillStyle = "red";
    context.fillText("X" + playerScore[0].multiplier, 50,840)
    context.fillText("Score:" + playerScore[0].score, 140,840)
    context.fillText("Max Streak:" + playerScore[0].maxStreak, 280,840)
    context.fillText("Streak:" + playerScore[0].streak, 480,840)
    context.fillStyle = "blue";

    context.fillText("X" + playerScore[1].multiplier, 50,880)
    context.fillText("Score:" + playerScore[1].score, 140,880)
    context.fillText("Max Streak:" + playerScore[1].maxStreak, 280,880)
    context.fillText("Streak:" + playerScore[1].streak, 480,880)
    
}
function createGenFrame() {
    createEmptyFrame()
    printTiles(colorsList,buttons)
    printTiles(colorsListP2, buttonsP2)

    context.fillStyle = "red";

     context.fillRect(100, 0, 1, 800);
     context.fillRect(200, 0, 1, 800);
     context.fillRect(300, 0, 1, 800);
     context.fillRect(400, 0, 1, 800);
     context.fillRect(499, 0, 1, 800);
     context.fillStyle = "blue";

     context.fillRect(599, 0, 1, 800);
     context.fillRect(700, 0, 1, 800);
     context.fillRect(800, 0, 1, 800);
     context.fillRect(900, 0, 1, 800);
     context.fillRect(1000, 0, 1, 800);


}
function printTiles(playerTiles, btns) {
    for (let i = 0; i < playerTiles.length; i++) {
        if (playerTiles[i].color == "red") {
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(red_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            
            context.fillText(checkArrows(btns[0]), playerTiles[i].axisX + 20, playerTiles[i].axisY +60)
        }else if(playerTiles[i].color == "green"){
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(green_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(btns[1]), playerTiles[i].axisX + 37, playerTiles[i].axisY +60)
        }else if(playerTiles[i].color == "orange"){
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(orange_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(btns[2]), playerTiles[i].axisX + 37, playerTiles[i].axisY + 60)
        }else {context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(blue_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(btns[3]), playerTiles[i].axisX + 20, playerTiles[i].axisY +60)
        // else{
        // context.fillStyle = colorsList[i].color;
        // context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
        // context.strokeRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
         }
    }
}

function checkArrows(key){
    if(key === "ArrowUp"){
        return "↑"
    }else if(key === "ArrowLeft"){
        return "←"
    }else if(key === "ArrowRight"){
        return "→"
    }else if(key === "ArrowDown"){
        return "↓"
    }else{
        return key
    }
}

//Generate colors 
function generateNewColors() {
    let ranColorGen = Math.floor(Math.random() * 4);
    let numToColor = "";
    let xByColor = 0;
    switch (ranColorGen) {
        case 0:
            numToColor = "red"
            xByColor = 100;
            break;
        case 1:
            numToColor = "green"
            xByColor = 200;
            break;
        case 2:
            numToColor = "orange"
            xByColor = 300;
            break;
        case 3:
            numToColor = "blue"
            xByColor = 400;
            break;
        default:
            //empty
            break;
    }
    colorsList.push({color: numToColor, axisX: xByColor, axisY: 0, id: idCounter})
    colorsListP2.push({color: numToColor, axisX: 1000-xByColor, axisY: 0, id: idCounter})
    idCounter++;
    console.log(colorsList);
    console.log(colorsListP2);
}

//Move tiles
function fill(playerTiles){
    let t = 0;
    playerTiles.forEach(element => {
            if(element.axisY < 800){
                let pos = playerTiles.indexOf(element)
                moveX(pos,playerTiles)
            }else{
                playerTiles.shift()
            }
        });
    }
    function moveX(id, playerTiles){
        delCanvas()
        if(playerTiles[id] ){
            playerTiles[id].axisY += 5;
        }
        createGenFrame()
    }

    function moveRandomTiles(){
            setTimeout(function(){fill(colorsList)
                fill(colorsListP2)})
    }

    //Player input

    document.onkeyup = (e) => {
        console.log('BUTTON PRESSED ' + e.key);
        once = 1;
        if (e.key === buttons[0]) {
            buttonPressed(1);
        } else if (e.key === buttons[1]) {
            buttonPressed(2);
        } else if (e.key === buttons[2]) {
            buttonPressed(3);
        } else if (e.key === buttons[3]) {
            buttonPressed(4);
        } else if (e.key.toUpperCase() === buttonsP2[0]) {
            buttonPressed(5)
        } else if (e.key.toUpperCase() === buttonsP2[1]) {
            buttonPressed(6);
        } else if (e.key.toUpperCase() === buttonsP2[2]) {
            buttonPressed(7);
        } else if (e.key.toUpperCase() === buttonsP2[3]) {
            buttonPressed(8);
        }
        else if (e.key ==='Escape'&& (!isPlaying || isPaused) ) {
            buttonPressed(9);
        }else if(e.key === 'p' || e.key === 'P')
        {
            console.log('PAUSA');
            buttonPressed(10);
        }else if((e.key === 'r' || e.key === 'R') && (!isPlaying || isPaused)){
            buttonPressed(11);
        }
    }
    function buttonPressed(button){
        switch (button) {
            case 1:
                    let condition = colorsList.some(function(element){
                        return element.axisY > 570 && element.color ==='red'
                      })
                      console.log(condition);
                      condition? scoreUp(0, colorsList): scoreDown(0)
                break;
            case 2:
                    let condition2 = colorsList.some(function(element){
                        return element.axisY > 570 && element.color ==='green'
                      })
                      condition2? scoreUp(0,colorsList): scoreDown(0)
                break;
            case 3:
                     let condition3 = colorsList.some(function(element){
                        return element.axisY > 570 && element.color ==='orange'
                      })
                      condition3? scoreUp(0,colorsList): scoreDown(0)
                break;
            case 4:
                    let condition4 = colorsList.some(function(element){
                        return element.axisY > 570 && element.color ==='blue'
                      })
                      condition4? scoreUp(0,colorsList): scoreDown(0)
                break;
            case 5:
                    let condition5 = colorsListP2.some(function(element){
                        return element.axisY > 570 && element.color ==='red'
                      })
                      condition5? scoreUp(1,colorsListP2): scoreDown(1)
                break;
            case 6:
                    let condition6 = colorsListP2.some(function(element){
                        return element.axisY > 570 && element.color ==='green'
                      })
                      condition6? scoreUp(1,colorsListP2): scoreDown(1)
                break;
            case 7:
                     let condition7 = colorsListP2.some(function(element){
                        return element.axisY > 570 && element.color ==='orange'
                      })
                      condition7? scoreUp(1,colorsListP2): scoreDown(1)
                break;
            case 8:
                    let condition8 = colorsListP2.some(function(element){
                        return element.axisY > 570 && element.color ==='blue'
                      })
                      condition8? scoreUp(1,colorsListP2): scoreDown(1)
                break;
            case 9:
                document.location.href= '../html/tempIndex.html'
                break;
            case 10:
                !isPaused? stopPlaying() : resumePlaying()
                break;
            case 11:
                location.reload()
                break;
            default:
                //empty
                break;
        }
    }
    
    //Scores
    function scoreUp(player, playerTiles) { 
        playerScore[player]
        if (isPlaying) {
            if(once == 1) {
                playerScore[player].streak ++
                if (playerScore[player].streak > playerScore[player].maxStreak) playerScore[player].maxStreak = playerScore[player].streak;
                if (playerScore[player].streak <10) {
                    playerScore[player].multiplier = 1;
                }else if(playerScore[player].streak >=10 && playerScore[player].streak <20){
                    playerScore[player].multiplier = 2;
        
                }else if (playerScore[player].streak >=20 && playerScore[player].streak <40) {
                    playerScore[player].multiplier = 4;
                    console.log('Multi ->'+multiplier);
                    
                
                }else if (playerScore[player].streak >=40) {
                    playerScore[player].multiplier = 8;
                    console.log('Multi ->'+multiplier);
                    
                }
                playerScore[player].score+= 1 * playerScore[player].multiplier;
                once ++;
                playerTiles.shift()
            }
            // document.getElementById('score').innerHTML= 'Score: '+score
            // document.getElementById('multiplier').innerHTML= 'Multiplier: x'+multiplier
            // document.getElementById('streak').innerHTML= 'Streak: '+streak
            // document.getElementById('maxStreak').innerHTML= 'Max Streak: '+maxStreak
            
        }
        
    }
    function scoreDown(player) {
        if(isPlaying){
            if(once == 1) {
                playerScore[player].score-= 1;
                playerScore[player].streak = 0;
                playerScore[player].multiplier = 1
                once ++;
            }
            // document.getElementById('score').innerHTML= 'Score: '+score
            // document.getElementById('streak').innerHTML= 'Streak: '+streak
            // document.getElementById('multiplier').innerHTML= 'Multiplier: x'+multiplier
        
        }
        
    }
    
function timer() {
    
    if(time == 0) {
        // isGameOver = true;
        stopPlaying()
        isPlaying = false;
        
        endScreen()
    }
    time--

}
setInterval(timer,1000)

function stopPlaying() {
    
    pauseScreen()
    isPaused = true

    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}
function resumePlaying() {

    if(isPlaying){
    isPaused = false

        setInterval(generateNewColors,difficultySpeed);
        setInterval(moveRandomTiles,10)
        setInterval(timer,1000)
    }
    
}
function endScreen() {
    delCanvas()
    createEmptyFrame()
    context.fillStyle = "plum";
    context.strokeStyle = "white";

    context.fillRect(350, 200, 400, 400);
    context.fillStyle = "white";
    if(playerScore[0].score != playerScore[1].score){
        playerScore[0].score > playerScore[1].score? 
        context.fillText("PLAYER 1 WON", 440,352):
        context.fillText("PLAYER 2 WON", 440,352)
    }else {
        context.fillText("IT'S A TIE!", 480,352)

    }
    context.fillRect(450, 480, 80, 50);
    context.fillRect(550, 480, 80, 50);
    context.fillStyle = "plum";
    context.font = "bold 24px sans-serif";

    context.fillText("ESC", 465,512)
    context.fillText("R", 580,512)

    context.fillText("ESC - Return to home Screen", 250,710)
    context.fillText("R - Restart Game", 250,735)
}
function pauseScreen() {
    delCanvas()
    createEmptyFrame()
    context.fillStyle = "plum";
    context.strokeStyle = "white";

    context.fillRect(350, 200, 400, 300);
    context.fillStyle = "white";
    context.fillRect(410, 400, 80, 50);
    context.fillRect(510, 400, 80, 50);
    context.fillRect(610, 400, 80, 50);
    context.font = "bold 48px sans-serif";
    context.fillText("PAUSE", 470,270)
    context.fillStyle = "white";
    context.fillStyle = "plum";
    context.font = "bold 24px sans-serif";

    context.fillText("P", 442,432)
    context.fillText("R", 542,432)
    context.fillText("ESC", 625,432)

    context.fillText("P - Resume Game", 250,710)
    context.fillText("R - Restart Game", 250,735)
    context.fillText("ESC - Return to home Screen", 250,760)

    context.fillStyle = "white";
    context.font = "bold 22px sans-serif";

    context.fillText("X" + multiplier, 50,840)
    context.fillText("Score:" + score, 120,840)

    context.fillText("Max Streak: " + maxStreak, 580,840)
    context.fillText("Streak: " + streak, 760,840)

}
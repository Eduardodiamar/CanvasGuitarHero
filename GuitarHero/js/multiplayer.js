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
let isGameOver = false;
let colorsList = [];
let colorsListP2 = [];

let difficultySpeed = 400;
let buttons = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
let buttonsP2 = ["A", "W", "S", "D"]
let playerScore = [{score: 0, maxStreak: 0, multiplier:1}, 
    {score: 0, maxStreak: 0, multiplier:1}]
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
    context.font = "bold 20px sans-serif";
    if (multiplier === 2) {
        context.fillStyle = "black";
    context.font = "bold 22px sans-serif";
    }else if (multiplier === 4) {
        context.fillStyle = "MediumVioletRed";
    context.font = "bold 24px sans-serif";
    }else if(multiplier === 8){
        context.fillStyle = "red";
        context.font = "bold 26px sans-serif";
    }
    context.fillText("X" + multiplier, 50,840)
    context.fillStyle = "white";
    
    context.font = "bold 30px sans-serif";

    // if (time <10) {
    //     context.fillText("00:0"+time, 410,50)
    // }else
    // context.fillText("00:"+time, 410,50)

    // context.font = "bold 22px sans-serif";
    // context.fillText("Score:" + score, 120,840)
    // context.fillText("Max Streak: " + maxStreak, 580,840)
    // context.fillText("Streak: " + streak, 760,840)
    // context.fillText("Controllers: ", 50,880)
    // context.fillStyle = "red";
    // context.fillText(checkArrows(buttons[0]).toUpperCase(), 200,880)
    // context.fillStyle = "green";
    // context.fillText(checkArrows(buttons[1]), 250,880)
    // context.fillStyle = "orange";
    // context.fillText(checkArrows(buttons[2]), 300,880)
    // context.fillStyle = "blue";
    // context.fillText(checkArrows(buttons[3]), 350,880)
}
function createGenFrame() {
    createEmptyFrame()
    context.fillStyle = "white";
    printTiles(colorsList)
    printTiles(colorsListP2)
    // context.fillRect(100, 0, 1, 800);
    // context.fillRect(200, 0, 1, 800);
    // context.fillRect(300, 0, 1, 800);
    // context.fillRect(400, 0, 1, 800);
    // context.fillRect(500, 0, 1, 800);
    // context.fillRect(600, 0, 1, 800);
    // context.fillRect(700, 0, 1, 800);
    // context.fillRect(800, 0, 1, 800);

   
    
}
function printTiles(playerTiles) {
    for (let i = 0; i < playerTiles.length; i++) {

        if (playerTiles[i].color == "red") {
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(red_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            
            context.fillText(checkArrows(buttons[0]), playerTiles[i].axisX + 20, playerTiles[i].axisY +60)
        }else if(playerTiles[i].color == "green"){
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(green_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(buttons[1]), playerTiles[i].axisX + 37, playerTiles[i].axisY +60)
        }else if(playerTiles[i].color == "orange"){
            context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(orange_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(buttons[2]), playerTiles[i].axisX + 37, playerTiles[i].axisY + 60)
        }else {context.fillStyle = 'transparent'
            context.fillRect(playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.drawImage(blue_dot, playerTiles[i].axisX, playerTiles[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText(checkArrows(buttons[3]), playerTiles[i].axisX + 20, playerTiles[i].axisY +60)
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
        // else if (e.key ==='Escape'&& (!isPlaying || isPaused) ) {
        //     buttonPressed(5);
        // }else if(e.key === 'p' || e.key === 'P')
        // {
        //     buttonPressed(6);
        // }else if((e.key === 'r' || e.key === 'R') && (!isPlaying || isPaused)){
        //     buttonPressed(7);
        // }
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
            // case 5:
            //     document.location.href= '../html/tempIndex.html'
            //     break;
            // case 6:
            //     !isPaused? stopPlaying() : resumePlaying()
            //     break;
            // case 7:
            //     location.reload()
            //     break;
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
    function scoreUpP2() { 
        if (isPlaying) {
            if(once == 1) {
                streak++
                if (streak > maxStreak) maxStreak = streak;
                if (streak <10) {
                    multiplier = 1;
                }else if(streak >=10 && streak <20){
                    multiplier = 2;
                    console.log('Multi ->'+multiplier);
        
                }else if (streak >=20 && streak <40) {
                    multiplier = 4;
                    console.log('Multi ->'+multiplier);
                    
                
                }else if (streak >=40) {
                    multiplier = 8;
                    console.log('Multi ->'+multiplier);
                    
                }
                score+= 1 * multiplier;
                once ++;
                colorsList.shift()
            }
            // document.getElementById('score').innerHTML= 'Score: '+score
            // document.getElementById('multiplier').innerHTML= 'Multiplier: x'+multiplier
            // document.getElementById('streak').innerHTML= 'Streak: '+streak
            // document.getElementById('maxStreak').innerHTML= 'Max Streak: '+maxStreak
            
        }
        
    }
    function scoreDownP2() {
        if(isPlaying){
            if(once == 1) {
                score-= 1;
                streak = 0;
                multiplier = 1
                once ++;
            }
            document.getElementById('score').innerHTML= 'Score: '+score
            document.getElementById('streak').innerHTML= 'Streak: '+streak
            document.getElementById('multiplier').innerHTML= 'Multiplier: x'+multiplier
        
        }
        
    }
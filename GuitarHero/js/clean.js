//Controllers
let buttons = []
let defaultButtons = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
console.log(defaultButtons);
localStorage.setItem('defaultControllers', defaultButtons);
let customControllers = localStorage.getItem('customControllers');
if(customControllers != null || customControllers != undefined){
    console.log(customControllers);
    buttons = customControllers.split(',')
    console.log(buttons);
}else{
    buttons = defaultButtons
}

//test add imaged

red_dot = new Image()
red_dot.src = "../images/red_dot.png"
green_dot = new Image()
green_dot.src = "../images/green_dot.png"
orange_dot = new Image()
orange_dot.src = "../images/orange_dot.png"
blue_dot = new Image()
blue_dot.src = "../images/blue_dot.png"


//Get Set Difficulty
let difficulty = localStorage.getItem("difficulty")
let playerName = localStorage.getItem("playerName")
let difficultySpeed = 0;
switch (difficulty) {
    case '0':
        difficultySpeed = 1000
        break;
    case '1':
        difficultySpeed = 700
        break;
    case '2':
        difficultySpeed = 450
        break;
    case '3':
        difficultySpeed = 200
        break;

    default:
        break;
}
setInterval(generateNewColors,difficultySpeed); //120 bpm

// setInterval(generateNewColors,666);
setInterval(moveRandomTiles,10)


let colorsList = [
    // { color: 'color', axisX: 0, axisY: 0 id: 0}
]
let randomColorCounter = 0;
let canvas = document.getElementById("marco");
let context = canvas.getContext("2d");
let score = 0;
let multiplier = 1;
let streak = 0;
let maxStreak = 0;
let once = 1; // functional condition 
let idCounter = 0; // generated tiles id
let isPlaying = true;

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
                xByColor = 300;
                
                break;
            case 2:
                numToColor = "orange"
                xByColor = 500;

                break;
            case 3:
                numToColor = "blue"
                xByColor = 700;

                break;
        
            default:
                //empty
                break;
        }
        colorsList.push({color: numToColor, axisX: xByColor, axisY: 0, id: idCounter})
        idCounter++;
        console.log(colorsList);
    // console.log(colorsList);
}
function createGenFrame() {
    context.fillStyle = "darkgrey";
    context.fillRect(0, 0, 900, 800);

    context.fillStyle = "black";
    context.fillRect(0, 670, 900, 130);
    // context.fillRect(0, 0, 100, 900);
    context.fillRect(100, 0, 1, 900);
    context.fillRect(200, 0, 1, 900);
    context.fillRect(300, 0, 1, 900);
    context.fillRect(400, 0, 1, 900);
    context.fillRect(500, 0, 1, 900);
    context.fillRect(600, 0, 1, 900);
    context.fillRect(700, 0, 1, 900);
    context.fillRect(800, 0, 1, 900);

    for (let i = 0; i < colorsList.length; i++) {

        if (colorsList[i].color == "red") {
            context.fillStyle = 'transparent'
            context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.drawImage(red_dot, colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText("←", colorsList[i].axisX + 20, colorsList[i].axisY +60)
        }else if(colorsList[i].color == "green"){
            context.fillStyle = 'transparent'
            context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.drawImage(green_dot, colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText("↑", colorsList[i].axisX + 37, colorsList[i].axisY +60)
        }else if(colorsList[i].color == "orange"){
            context.fillStyle = 'transparent'
            context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.drawImage(orange_dot, colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText("↓", colorsList[i].axisX + 37, colorsList[i].axisY + 60)
        }else {context.fillStyle = 'transparent'
            context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.drawImage(blue_dot, colorsList[i].axisX, colorsList[i].axisY, 100, 100)
            context.fillStyle = "white";
            context.font = "bold 50px sans-serif";
            context.fillText("→", colorsList[i].axisX + 20, colorsList[i].axisY +60)
        // else{
        // context.fillStyle = colorsList[i].color;
        // context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
        // context.strokeRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
     }
    }
}

function delCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function moveX(id){
    delCanvas()
    if(colorsList[id] ){
        colorsList[id].axisY += 5;
    }
    createGenFrame()
}

function fill(){
let t = 0;
    colorsList.forEach(element => {
        if(element.axisY < 800){
            let pos = colorsList.indexOf(element)
            moveX(pos)
        }else{
            colorsList.shift()
        }
    });
}
function moveRandomTiles(){
        setTimeout(fill)
}
let isPaused = false;
// ++ CONTROLERS ++
document.onkeyup = (e) => {
    console.log('BUTTON PRESSED' + e.key);
    once = 1;
    if (e.key === buttons[0]) {
        buttonPressed(1);
    } else if (e.key === buttons[1]) {
        buttonPressed(2);
    } else if (e.key === buttons[2]) {
        buttonPressed(3);
    } else if (e.key === buttons[3]) {
        buttonPressed(4);
    }
    else if (!isPlaying && e.key ==='Escape') {
        buttonPressed(5);
    }else if(e.key === 'p' || e.key === 'P')
    {
        console.log('PAUSA');
        !isPaused? stopPlaying() : resumePlaying()
    }
}
function buttonPressed(button){
    switch (button) {
        case 1:
            
                let condition = colorsList.some(function(element){
                    return element.axisY > 670 && element.color ==='red'
                  })
                  console.log(condition);

                  condition? scoreUp(): scoreDown()
            
            break;
        case 2:
            
                let condition2 = colorsList.some(function(element){
                    return element.axisY > 670 && element.color ==='green'
                  })
                  condition2? scoreUp(): scoreDown()
            
            break;
        case 3:
                 let condition3 = colorsList.some(function(element){
                    return element.axisY > 670 && element.color ==='orange'
                  })
                  condition3? scoreUp(): scoreDown()
            break;
        case 4:
                let condition4 = colorsList.some(function(element){
                    return element.axisY > 670 && element.color ==='blue'
                  })
                  condition4? scoreUp(): scoreDown()
            break;
        case 5:
            document.location.href= '/tempIndex.html'
            
            break;
    
        default:
            //empty
            break;
    }
}

// 'once' condition is set because of multiple setInterval calls are happening simultaneously
function scoreUp() { 
    if (isPlaying) {
        if(once == 1) {
            streak++
            if (streak > maxStreak) maxStreak = streak;
            if (streak <10) {
                multiplier = 1;
            }else if(streak >=10 && streak <20){
                multiplier = 2;
                console.log('Multi ->'+multiplier);
    
            }else if (streak >=20) {
                multiplier = 4;
                console.log('Multi ->'+multiplier);
                
            }
            score+= 1 * multiplier;
            once ++;
            colorsList.shift()
        }
        document.getElementById('score').innerHTML= 'Score: '+score
        document.getElementById('multiplier').innerHTML= 'Multiplier: x'+multiplier
        document.getElementById('streak').innerHTML= 'Streak: '+streak
        document.getElementById('maxStreak').innerHTML= 'Max Streak: '+maxStreak
        
    }
    
}
function scoreDown() {
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

//Stop Intervals
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
    isPaused = false

    //Check don't allow more than 1 click
    setInterval(generateNewColors,difficultySpeed);
    setInterval(moveRandomTiles,10)
    setInterval(timer,1000)
}
let time = 20
function timer() {
    if (time <10){
        document.getElementById('timer').innerHTML = '00:0'+time
    }else{
    document.getElementById('timer').innerHTML = '00:'+time
    }
    if(time == 0) {
        stopPlaying()
        isPlaying = false;
        if(score > 0) saveResults()
        endScreen()
    }
    time--

}
setInterval(timer,1000)
let isLeaderboard = false

checkLeaderboard();

function checkLeaderboard(){
    leaderboardData = localStorage.getItem("localLeaderboard")
    console.log(leaderboardData);
    if(leaderboardData != null){
        isLeaderboard = true
    }
}
function saveResults() {

    if(isLeaderboard){
        localStorage.setItem('score', score)
        localStorage.setItem('maxStreak', maxStreak)
        let playerScore2 = { playerName: playerName, score: score, maxStreak: maxStreak, difficulty: difficulty}
    
        console.log(JSON.stringify(playerScore2));
        playerScore2 = '['+ JSON.stringify(playerScore2) + ','+ leaderboardData+']'
        console.log(playerScore2);
        localStorage.setItem("localLeaderboard", playerScore2);

    }else{ 
        localStorage.setItem('score', score)
        localStorage.setItem('maxStreak', maxStreak)
        let playerScore = { playerName: playerName, score: score, maxStreak: maxStreak, difficulty: difficulty}
        localStorage.setItem("localLeaderboard", JSON.stringify(playerScore));
    }
    
}
function endScreen() {
    context.fillStyle = "plum";
    context.strokeStyle = "white";

    context.fillRect(250, 200, 400, 400);
    context.fillStyle = "white";

    context.font = "bold 24px sans-serif";
    context.fillText("PLAYER: " + playerName, 350,300)
    context.fillText("Score: " + score, 350,350)
    context.fillText("Max streak: " + maxStreak, 350,400)
    context.fillStyle = "white";
    
    context.fillRect(350, 500, 200, 50);
    context.fillStyle = "plum";

    context.fillText("Home", 414,530)
}
function pauseScreen() {
    context.fillStyle = "plum";
    context.strokeStyle = "white";

    context.fillRect(250, 200, 400, 200);
    context.fillStyle = "white";

    context.font = "bold 48px sans-serif";
    context.fillText("PAUSE", 370,270)
    context.fillStyle = "white";
    context.fillRect(400, 315, 100, 50);
    context.fillStyle = "plum";
    context.font = "bold 24px sans-serif";

    context.fillText("P", 445,350)
}
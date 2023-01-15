let redX = 100;
let redY = 0;
let red2X = 100;
let red2Y = 0;

let greenX = 300;
let greenY = 0;
let green2X = 300;
let green2Y = 0;

let orangeX = 500;
let orangeY = 0;
let orangeX2 = 500;
let orangeY2 = 0;

let blueX = 700;
let blueY = 0;
let blueX2 = 700;
let blueY2 = 0;

let colorsList = [
    // { color: 'color', axisY: 0, id: 0}
]
let colorsListCopy = [
    // { color: 'color', axisY: 0, id: 0}
]


let randomColorCounter = 0;
let canvas = document.getElementById("marco");
let context = canvas.getContext("2d");
let score = 0;
let idCounter = 0; // generated tiles id
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
    // generateX(colorsList[0].color, colorsList[0].id,)
    colorsListCopy = colorsList;
    // stopPlaying()
}
function createFrame() {

    context.fillStyle = "darkgrey";
    context.fillRect(0, 0, 900, 800);

    context.fillStyle = "black";
    context.fillRect(0, 700, 900, 100);

    context.fillStyle = "red";
    context.fillRect(redX, redY, 100, 100);
    context.strokeRect(redX, redY, 100, 100);

    context.fillStyle = "lightgreen";
    context.fillRect(greenX, greenY, 100, 100);
    context.strokeRect(greenX, greenY, 100, 100);

    context.fillStyle = "orange";
    context.fillRect(orangeX, orangeY, 100, 100);
    context.strokeRect(orangeX, orangeY, 100, 100);

    context.fillStyle = "cyan";
    context.fillRect(blueX, blueY, 100, 100);
    context.strokeRect(blueX, blueY, 100, 100);


}
function createGenFrame() {
    for (let i = 0; i < colorsList.length; i++) {
        context.fillStyle = colorsList[i].color;
        context.fillRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
        context.strokeRect(colorsList[i].axisX, colorsList[i].axisY, 100, 100);
        
    }
}

function delCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
// function generateX(color, id){
//     context.fillStyle = color;
//     context.fillRect(colorsList[id].axisX, colorsList[id].axisY, 100, 100);
//     context.strokeRect(colorsList[id].axisX, colorsList[id].axisY, 100, 100);
//     setInterval( function() { moveX(id); }, 100 );
// }
function moveX(id){
    delCanvas()
    // if (colorsList[id].axisY < 800) {colorsList[id].axisY += 5;
    // }else{
    //     console.log('DEL '+colorsList);
    //     colorsList.splice(0,1);
    // }
    colorsList[id].axisY +=5;
    createGenFrame()
}

function fill(){
let t = 0;

    for (let i = 0; i < colorsList.length; i++) {
        if(colorsList[i].axisY <800){
        moveX(colorsList[t].id)
        }else{colorsList.shift()}
        t++
    }
}
function moveRandomTiles(){
    // console.log(colorsList);
    
    // let selectedColor = colorsListCopy.splice(0,1);
    
        setTimeout(fill)
    

    

    // console.log(selectedColor);
    // console.log(colorsListCopy);
    // setInterval( function() { moveX(selectedColor.id); }, 100 );

}
setInterval(generateNewColors,2000);
setInterval(moveRandomTiles,100)
// function moveRed() {
//     delCanvas()
//     if (redY < 800) redY += 5;
//     if (redY == 800) redY = 0;
//     createFrame()
// }
// function moveGreen() {
//     delCanvas()
//     if (greenY < 800) greenY += 10;
//     if (greenY == 800) greenY = 0;
//     createFrame()
// }
// function moveOrange() {
//     delCanvas()
//     if (orangeY < 800) orangeY += 10;
//     if (orangeY == 800) orangeY = 0;
//     createFrame()
// }
// function moveBlue() {
//     delCanvas()
//     if (blueY < 800) blueY += 10;
//     if (blueY == 800) blueY = 0;
//     createFrame()
// }
// setInterval(moveRed, 1)
// createFrame()

// document.onkeyup = (e) => {
//     if (e.key === "ArrowLeft") {
//         buttonPressed(1);
//     } else if (e.key === "ArrowUp") {
//         buttonPressed(2);
//     } else if (e.key === "ArrowDown") {
//         buttonPressed(3);
//     } else if (e.key === "ArrowRight") {
//         buttonPressed(4);
//     }
// }
// function buttonPressed(button) {
//     switch (button) {
//         case 1:
//             redY >= 600 && redY <= 800 ? scoreUp():scoreDown()
//             break;
//         case 2:
//             greenY >= 700 && greenY <= 800 ? scoreUp():scoreDown()
//             break;
//         case 3:
//             orangeY >= 700 && orangeY <= 800 ? scoreUp():scoreDown()
//             break;
//         case 4:
//             blueY >= 700 && blueY <= 800 ? scoreUp():scoreDown()
//             break;
//             // empty
//         default:
//             break;
//     }

// }

// function scoreUp() {
//     score += 2;
//     document.getElementById('score').innerHTML = 'Score: ' + score;
// }
// function scoreDown() {
//     score -= 1;
//     document.getElementById('score').innerHTML = 'Score: ' + score;
// }
// function randomColor(){
//     if(randomColorCounter == 4) clearInterval(randomColor);
//     randomColorCounter ++;
//     let selectedColor = colors.splice(Math.floor(Math.random()*colors.length),1)[0];
//     switch (selectedColor) {
//         case 'red':
//             setInterval(moveRed,50)
//             break;
        
//         case 'green':
//             setInterval(moveGreen,20)
//             break;
        
//         case 'orange':
//             setInterval(moveOrange,20)
//             break;
        
//         case 'blue':
//             setInterval(moveBlue,20)
//             break;
        
//         default:
//             break;
//     }
// }
// let colors = ['red','green','orange','blue'];

// setInterval(randomColor,1000);


function stopPlaying() {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }


}
// function testClear() {
//     clearInterval(moveRed)
//     console.log('stop');
// }
function resumePlaying() {
    setInterval(moveRed,50)
    setInterval(moveGreen,10)
    setInterval(moveOrange,10)
    setInterval(moveBlue,10)
}



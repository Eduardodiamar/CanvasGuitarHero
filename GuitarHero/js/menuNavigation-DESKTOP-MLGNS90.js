let menu0Selector = ['menu0Option0', 'menu0Option1', 'menu0Option2', 'menu0Option3',] // MAIN
let menu3Selector = ['menu3Option1', 'menu3Option2', 'menu3Option3', 'menu3Option4','menu3Option5','menu3Option6'] // OPTIONS
let difficultyLevels = ['EASY', 'NORMAL', 'HARD', 'INSANE']
let playerName;
let currentDifficulty = 1;
let selectedOption = 0;
let optionMenuSelectOptions = 0;
let previousOptionMenuSelectOptions = 0;
let previousSelection = 0;
let isMenuEnabled0 = true;
let isNameSelected = false;
let isDificulty = false;
let isGameSet = false;
let isOptions = false;
let ttest1 = false

// Hiden Elements 
document.getElementById('menu1').style.display = 'none'
document.getElementById('menu2').style.display = 'none'
document.getElementById('menu3').style.display = 'none'
document.getElementById('startGame').style.display = 'none'
switchMenu0Option(selectedOption, previousSelection, menu0Selector)
switchMenu0Option(optionMenuSelectOptions, previousOptionMenuSelectOptions, menu3Selector)

function switchMenu0Option(newSelect, oldSelect, menuSelector) {
    // new color
    document.getElementById(menuSelector[newSelect]).style.backgroundColor = "plum"
    document.getElementById(menuSelector[newSelect]).style.color = "white"
    document.getElementById(menuSelector[newSelect]).style.border = "solid 2px white"

    // back to default color 
    if (newSelect != oldSelect) {
        document.getElementById(menuSelector[oldSelect]).style.backgroundColor = "whitesmoke"
        document.getElementById(menuSelector[oldSelect]).style.color = "thistle"
        document.getElementById(menuSelector[oldSelect]).style.border = "solid 2px plum"
    }


}
//Menu controller
//Main menu
document.onkeyup = (k) => {
    previousSelection = selectedOption;
    if (isMenuEnabled0) {
        if (k.key === 'ArrowDown') {
            selectedOption < 3 ? selectedOption++ : selectedOption = 0;
        }
        if (k.key === 'ArrowUp') {
            selectedOption < 1 ? selectedOption = 3 : selectedOption--;
        }
        if (k.key == ' ') {
            console.log(selectedOption);
            if (selectedOption == 0) {
                isMenuEnabled0 = false;
                document.getElementById('menu0').style.display = 'none'
                document.getElementById('menu1').style.display = 'block'
                document.getElementById('playerName').focus()
            }else if(selectedOption == 2){
                isOptions = true
                ttest1 = true
                console.log(ttest1);
                selectTT()
                document.getElementById('menu0').style.display = 'none'
                document.getElementById('menu3').style.display = 'block'
            }
        }

        switchMenu0Option(selectedOption, previousSelection, menu0Selector)
    }

    //Single Player Menu
    if (!isNameSelected && !isMenuEnabled0) {

        if (k.key === 'Enter') {
            playerName = document.getElementById('playerName').value.toUpperCase();
            if(checkPlayerName(playerName)){
                document.getElementById('playerName').disabled = "true"
            document.getElementById("nameConfirmation").innerHTML = "Player " + playerName;
            console.log(playerName);
            isNameSelected = true;
            document.getElementById('difficultySelectorHelp').innerHTML = '*use left or right to set the difficulty'
            }else{

                document.getElementById("nameConfirmation").innerHTML = "*Insert a correct name"

            }
            
        }
        if (k.key === 'Escape') {
            isMenuEnabled0 = true;
            document.getElementById('menu0').style.display = 'block'
            document.getElementById('menu1').style.display = 'none'
            console.log('esc');

        }
    } if(isGameSet){
        if(k.key === 'Enter'){
            dificultySelector('startGame')
            console.log('start game');
            document.location.href= '/game.html'
        }

    }
    if (isNameSelected && !isDificulty) {
        document.getElementById('startGame').style.display = 'block'

        if (k.key === 'ArrowLeft') {
            console.log('left');
            setInterval
            dificultySelector('lowerDifficulty')
            currentDifficulty < 1 ? currentDifficulty = 3 : currentDifficulty--
            document.getElementById('dificultySelectorDisplay').innerHTML = difficultyLevels[currentDifficulty]

        }
        if (k.key === 'ArrowRight') {
            console.log('right');
            dificultySelector('higherDifficulty')
            currentDifficulty == 3 ? currentDifficulty = 0 : currentDifficulty++
            document.getElementById('dificultySelectorDisplay').innerHTML = difficultyLevels[currentDifficulty]
        }
        if(k.key === 'Enter'){
            isGameSet = true
            saveData()
        }
        if (k.key === 'Escape') {
            isNameSelected = false;
            isGameSet = false
            document.getElementById('playerName').disabled = false;
            document.getElementById('playerName').focus()
            document.getElementById("nameConfirmation").innerHTML = "*Insert Player Name"
            console.log('esc2');
            // document.getElementById('difficultySelectorHelp').innerHTML='PRESS ENTER TO START THE GAME'
        }
    }
   
    //MULTIPLAYER

    //OPTIONS 
    

    // if(isOptions){
    //     previousOptionMenuSelectOptions = optionMenuSelectOptions
    //     isMenuEnabled0 = false;
        
    //     console.log('in OPTIONS');
    //     if (k.key === 'Escape') {
    //         isMenuEnabled0 = true;
    //         isOptions = false;
    //         document.getElementById('menu0').style.display = 'block'
    //         document.getElementById('menu3').style.display = 'none'
    //         console.log('esc');

    //     }
    //     if (k.key === 'ArrowDown') {
    //         optionMenuSelectOptions < 5 ? optionMenuSelectOptions++ : optionMenuSelectOptions = 0;
    //         console.log(optionMenuSelectOptions);
    //     }
    //     if (k.key === 'ArrowUp') {
    //         optionMenuSelectOptions < 1 ? optionMenuSelectOptions = 5 : optionMenuSelectOptions--;
    //     }
        
        

    //     switchMenu0Option(optionMenuSelectOptions, previousOptionMenuSelectOptions, menu3Selector)

    // }



}
let tk = "";
let bolT = false
let keyController = "";

function selectTT() {
    if (isOptions && ttest1) {
        isMenuEnabled0 = false;
        optionMenuSelectOptions = 0
        console.log('in OPTIONS');
        document.onkeyup = (k) => {
            previousOptionMenuSelectOptions = optionMenuSelectOptions

            if (k.key === 'Escape') {
                isMenuEnabled0 = true;
                isOptions = false;
                
                document.getElementById('menu0').style.display = 'block'
                document.getElementById('menu3').style.display = 'none'
                console.log('esc');

            }
            console.log('AAA');
            if (k.key === 'ArrowDown') {
                optionMenuSelectOptions < 5 ? optionMenuSelectOptions++ : optionMenuSelectOptions = 0;
                console.log(optionMenuSelectOptions);

            }
            if (k.key === 'ArrowUp') {
                optionMenuSelectOptions < 1 ? optionMenuSelectOptions = 5 : optionMenuSelectOptions--;

            }

            
    
           
            if (k.key == ' ') {
                console.log('still inside this menu ffs');
                key(optionMenuSelectOptions)
                bolT = false;
                // switch (optionMenuSelectOptions) {
                //     case 0:
                //         if(!bolT){
                //             key()
                //         }
                //         bolT = false
                //         break;
                
                //     default:
                //         break;
                // }
                
            }
    switchMenu0Option(optionMenuSelectOptions, previousOptionMenuSelectOptions, menu3Selector)

        }
        
    }
}
function key(botonQueLePasoxd) {

    document.addEventListener('keydown', function(event){
        if(!bolT){
            console.log(event.key);
            console.log(botonQueLePasoxd);
            event.stopPropagation();
            event.preventDefault();
            switch (botonQueLePasoxd) {
                case 0:
                     document.getElementById('controllerButton1').innerHTML = event.key
                    break;
                case 1:
                     document.getElementById('controllerButton2').innerHTML = event.key
                    break;
                case 2:
                     document.getElementById('controllerButton3').innerHTML = event.key
                    break;
                case 3:
                     document.getElementById('controllerButton4').innerHTML = event.key
                    break;
                case 4:
                     console.log('DEFAULT');
                    break;
                case 5:
                     console.log('SAVE');
                    break;
            
                default:
                    //empty
                    break;
            }
            document.getElementById('controllerButton1').innerHTML = event.key
            bolT = true
            

        }
        return
      });
}

function dificultySelector(key) {
    document.getElementById(key).style.backgroundColor = "plum"
    document.getElementById(key).style.color = "white"
    document.getElementById(key).style.border = "solid 2px white"

    // back to default color 
    setTimeout(function () {
        document.getElementById(key).style.backgroundColor = "whitesmoke"
        document.getElementById(key).style.color = "thistle"
        document.getElementById(key).style.border = "solid 2px plum"
    }, 100);
}

function checkPlayerName(inputtxt) {
    let regex = /^[a-zA-Z0-9_]+$/;
    if (inputtxt.match(regex)) {
        return true;
    }
    else {
        return false;
    }

}
//Save settings for the game
function saveData(){
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("difficulty", currentDifficulty);
}


// Leaderboard

let isLeaderboard = false
let leaderboard;

checkLeaderboard();

function checkLeaderboard(){
    localStorageLeaderboard = localStorage.getItem("testerino")
    localStorageLeaderboard = localStorageLeaderboard.replaceAll("[" , "").replaceAll("]","")
    console.log(localStorageLeaderboard);
    if(localStorageLeaderboard!= null){
        localStorageLeaderboard = "["+localStorageLeaderboard+"]"
        leaderboard = JSON.parse(localStorageLeaderboard)
        console.log(leaderboard);
        isLeaderboard = true
    }
}


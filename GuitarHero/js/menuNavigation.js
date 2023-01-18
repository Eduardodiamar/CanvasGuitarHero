let menu0Selector = ['menu0Option0', 'menu0Option1', 'menu0Option2', 'menu0Option3',] // MAIN
let menu3Selector = ['menu3Option1', 'menu3Option2', 'menu3Option3', 'menu3Option4','menu3Option5','menu3Option6'] // OPTIONS
let controllersIds = ['controllerButton1', 'controllerButton2', 'controllerButton3', 'controllerButton4']
let difficultyLevels = ['EASY', 'NORMAL', 'HARD', 'INSANE']

//User controllers (Gameplay)

let defaultButtons = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
let buttons = defaultButtons;
console.log(buttons);
// localStorage.setItem('defaultControllers', defaultButtons);
let customControllers = localStorage.getItem('customControllers');
console.log(customControllers);

if(customControllers != null || customControllers != undefined){
    console.log(customControllers);
    console.log('empty');
    buttons = customControllers.split(',')
}
console.log(buttons[1]);
document.getElementById('controllerButton1').innerHTML = buttons[0]
document.getElementById('controllerButton2').innerHTML = buttons[1]
document.getElementById('controllerButton3').innerHTML = buttons[2]
document.getElementById('controllerButton4').innerHTML = buttons[3]
//
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
let keyLimitState = false;
let isInLeaderboard = false;
let isTableGenerated = false;
// Hiden Elements 
document.getElementById('menu1').style.display = 'none'
document.getElementById('menu2').style.display = 'none'
document.getElementById('menu3').style.display = 'none'
document.getElementById('menu4').style.display = 'none'
document.getElementById('startGame').style.display = 'none'
document.getElementById('controllerTipsSingle').style.display = 'none'

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
                document.getElementById('controllerTips').style.display = 'none'
                document.getElementById('controllerTipsSingle').style.display = 'block'
                
                document.getElementById('playerName').focus()
            }else if(selectedOption === 1){
                document.location.href= '../html/multiplayer.html'
            }else if(selectedOption == 2){
                isOptions = true
                keyLimitState = true
                console.log(keyLimitState);
                selectTT()
                document.getElementById('menu0').style.display = 'none'
                document.getElementById('menu3').style.display = 'block'
                selectedOption = 2
            }else if(selectedOption == 3){
                document.getElementById('menu0').style.display = 'none'
                document.getElementById('menu4').style.display = 'block'
                isMenuEnabled0 = false
                if(isLeaderboard){
                // Select the table container element
                    var container = document.getElementById("table-container");
                    // Generate the table
                    generateTable(leaderboard);
                    // Get the table element
                    var table = document.getElementsByTagName("table")[0];
                    // Append the table to the container
                    container.appendChild(table);
                }else{
                    document.getElementById('emptyLeaderboard').innerHTML = 'There are no valid scores yet. Play a game to be the first one to appear in the leaderboard!'
                }
        }
        }

        switchMenu0Option(selectedOption, previousSelection, menu0Selector)
    }

    //Single Player Menu
    if (!isNameSelected && !isMenuEnabled0) {

        if (k.key === 'Enter') {
            playerName = document.getElementById('playerName').value.toUpperCase();
            if (checkPlayerName(playerName)) {
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
            document.getElementById('menu4').style.display = 'none'
            if (isTableGenerated) {
                deleteTable()
            }
            console.log('esc');

        }
    } if(isGameSet){
        if(k.key === 'Enter'){
            dificultySelector('startGame')
            console.log('start game');
            document.location.href= '../html/game.html'
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
    
}
let tk = "";
let bolT = false
let keyController = "";

function selectTT() {
    
    if (isOptions && keyLimitState) {
        isMenuEnabled0 = false;
        optionMenuSelectOptions =  previousOptionMenuSelectOptions
        console.log('in OPTIONS');
        document.addEventListener('keydown', function (k){
            previousOptionMenuSelectOptions = optionMenuSelectOptions
            if (k.key === 'Escape') {
                isMenuEnabled0 = true;
                isOptions = false;
                keyLimitState = false
                
                document.getElementById('menu0').style.display = 'block'
                document.getElementById('menu3').style.display = 'none'
                this.removeEventListener('keydown',arguments.callee,false);
                
            }
            if (k.key === 'ArrowDown') {
                optionMenuSelectOptions < 5 ? optionMenuSelectOptions++ : optionMenuSelectOptions = 0;
                console.log(optionMenuSelectOptions);

            }
            if (k.key === 'ArrowUp') {
                optionMenuSelectOptions < 1 ? optionMenuSelectOptions = 5 : optionMenuSelectOptions--;
            }
            if (k.key == ' ') {
                if(optionMenuSelectOptions == 4){
                    buttons = defaultButtons;
                    localStorage.removeItem('customControllers')
                    
                    for (let i = 0; i < controllersIds.length; i++) {
                        document.getElementById(controllersIds[i]).innerHTML = defaultButtons[i]
                    }

                    document.getElementById('controllerTip').innerHTML = 'Controllers back to default'
                    setInterval(function() {
                        document.getElementById('controllerTip').innerHTML = ''}, 5000)

                }else if(optionMenuSelectOptions == 5){
                    defaultButtons = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
                    if(buttons != defaultButtons){
                        localStorage.setItem('customControllers', buttons);
                        document.getElementById('controllerTip').innerHTML = 'New Controllers Saved!'
                        setInterval(function() {
                        document.getElementById('controllerTip').innerHTML = ''}, 5000)
                    }
                }else{
                    k.stopPropagation();
                    k.preventDefault();
                    key(optionMenuSelectOptions)
                    bolT = false;
                    console.log('--->'+optionMenuSelectOptions);
                    
                }
            }
    switchMenu0Option(optionMenuSelectOptions, previousOptionMenuSelectOptions, menu3Selector)
        })
    }
}

function key( newButton) {
    document.addEventListener('keydown', function (event){
        
        console.log(event.key);
        console.log(optionMenuSelectOptions);
        if(!bolT){
            
            switch (newButton) {
                
                case 0:
                    
                     document.getElementById('controllerButton1').innerHTML = event.key
                     buttons[0] = event.key
                    break;
                case 1:
                     document.getElementById('controllerButton2').innerHTML = event.key
                     buttons[1] = event.key
                    console.log(buttons[1]);
                    break;
                case 2:
                     document.getElementById('controllerButton3').innerHTML = event.key
                     buttons[2] = event.key

                    break;
                case 3:
                     document.getElementById('controllerButton4').innerHTML = event.key
                     buttons[3] = event.key
                    break;
                default:
                    //empty
                    break;
            }
            this.removeEventListener('keydown',arguments.callee,false);
            bolT = true
            

        }
      return

      });
      return
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

checkLeaderboard()
function checkLeaderboard(){
    leaderboardData = localStorage.getItem("localLeaderboard")
    console.log(leaderboardData);
    if(leaderboardData != null){
        isLeaderboard = true
        setLeaderboard()
    }
}

function setLeaderboard(){
    localStorageLeaderboard = localStorage.getItem("localLeaderboard")
    localStorageLeaderboard = localStorageLeaderboard.replaceAll("[" , "").replaceAll("]","")
    if(localStorageLeaderboard!= null){
        localStorageLeaderboard = "["+localStorageLeaderboard+"]"
        leaderboard = JSON.parse(localStorageLeaderboard)
        isLeaderboard = true
    }

    leaderboard.sort(function(a, b) {
        if (b.score === a.score) {
          return b.difficulty.localeCompare(a.difficulty);
        } else {
          return b.score - a.score;
        }
      });
      console.log(leaderboard);
}
//IA STUFF XD
function generateTable(data) {
    isTableGenerated = true
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
  
    // Create table headings
    for (var key in data[0]) {
      var th = document.createElement("th");
      th.innerHTML = key;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);
  
    // Create table rows
    for (var i = 0; i < data.length; i++) {
      var row = document.createElement("tr");
      for (var key in data[i]) {
        var cell = document.createElement("td");
        cell.innerHTML = data[i][key];
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
  
    // Append table to body
    document.body.appendChild(table);
  }

  function deleteTable() {
    var table = document.getElementsByTagName("table")[0];
    if (table) {
      table.parentNode.removeChild(table);
    }
  }
  
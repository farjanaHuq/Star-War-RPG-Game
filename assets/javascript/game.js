// create 4 fighters object
// create property for each object with name, health point, imageUrl, attackBack
// onclick function to select the player
//move selected player to a new div
// move rest of the character to a new div
// select an enemy and move it a new div
// create attack button  and onclick function for the button
// create restart button and onclick function for the button
//if else statement to check health status
// Execute this code when the DOM has fully loaded.

$(document).ready(function () {

  // VARIABLE DECLARATION
  // ===================================================================

  // Declares Character Object to hold  the characters.
  var characters =
  {
    "darth-vader": {
      name: "darth-vader",
      healthPoint: 120,
      attackPoint: 10,
      imageSrc: "./assets/images/darth-vader.jpg",
      attackBackPoint: 13
    },
    "han-solo": {
      name: "han-solo",
      healthPoint: 100,
      attackPoint: 8,
      imageSrc: "./assets/images/han-solo.jpg",
      attackBackPoint: 6
    },
    "HK-47": {
      name: "HK-47",
      healthPoint: 150,
      attackPoint: 12,
      imageSrc: "./assets/images/HK-47.png",
      attackBackPoint: 10
    },
    "kyle-kataram": {
      name: "kyle-kataram",
      healthPoint: 180,
      attackPoint: 6,
      imageSrc: "./assets/images/kyle-kataram.jpg",
      attackBackPoint: 7
    }
  };
  // variables to store fighter, enemies, defender, wins, losses
  var fighter;
  var enemies = [];
  var defender;
  var defenderArr = [];
  
  // Will keep track of turns during combat. Used for calculating player damage.
  var turnCounter = 1;
  // Tracks number of defeated opponents.
  var killCount = 0;

  // Creates a section for characters - there names, images and health points
  var createCharacterSection = function (character, createCharacters) {
   //console.log("Create characters");

    var charDiv = $(`<div class = 'character' id = 'character-div' data-name = ${character.name}>`);
    var charName = $(`<div class = character' id ='character-name'>`).text(character.name);
    var charImage = $(`<img alt = 'image' class ='character-image'>`).attr("src", character.imageSrc);
    var charHealth = $(`<div class = character' id ='character-health' data-health = 'HP-${character.name}'>`).text(character.healthPoint);

    charImage.css({
      "background-size": "cover",
      "height": `${120}px`,
      "width": `${150}px`,
    });

    charName.css({ "color": "black", "text-align": "center" });
    charHealth.css({ "color": "red", "text-align": "center" });

    charDiv.append(charName);
    charDiv.append(charImage);
    charDiv.append(charHealth);
    $(createCharacters).append(charDiv);
  }

  //Initialize the game
  var startTheGame = function () {
    // for (var key in characters) {  
    //   createCharacterSection(key, "#section-character");
    //   console.log(key);
    // }
    $.each(characters, function (i, val) {
      createCharacterSection(val, "#section-character");
      // console.log(val);
    });
  }

  startTheGame();

  // onclick function to select the fighter
  $("#section-character").on("click", ".character", function () {
    var selectChar = $(this).attr("data-name");
    // console.log(selectChar);
  
    if ($("#fighter").children().length === 0){
      fighter = characters[selectChar];
      createCharacterSection(fighter, "#fighter");
      generateMessage("You have selected your fighter.");
    }
    else {
         generateMessage("You have selected your fighter.");
    }
    for (var key in characters) {
      if (key !== selectChar) {
        enemies.push(characters[key]);
      }
      else {
        console.log("Enemies to choose!");
      }
    }
    //moves rest of the players to enemy section
    for (var i = 0; i < enemies.length; i++) {
      createCharacterSection(enemies[i], "#section-enemy");
      // console.log(`Enemies: ${enemies[i]}`);
    }
    $("#section-character").hide();

  });

  //select defender from enemy section
  $("#section-enemy").on("click", ".character", function () {
      var selectDefender = $(this).attr("data-name");
      defender = characters[selectDefender];
      deleteMessage();
      
     // defenderArr.push(defender);  
      if ($("#defender").children().length === 0) {   
        createCharacterSection(defender, "#defender");
        defenderArr.push(defender);
      }
      else if($("#defender").children().length !== 0){
          defenderArr.push(defender);
          $("#defender").empty();
          for(var i =0; i<defenderArr.length; i++){
            createCharacterSection(defenderArr[i], "#defender");         
          }   
      }
      else {
        console.log("Select your defender.");
      }
      $(this).remove();     
      //removeCharacter(defender);
      
 });
  

  //on click for attack button
  $("#attack-button").on("click", function () {
    // console.log("Attack");
    if ($("#defender").children().length !== 0) {

      var opponentHP = defender.healthPoint - fighter.attackPoint*turnCounter;
      var fighterHP = fighter.healthPoint - defender.attackBackPoint;
      deleteMessage();
    
      if(defender.healthPoint>0){

        updateHealthPoint(fighterHP, opponentHP); 

          if(fighter.healthPoint<0){

            console.log("looser");
            generateMessage("Sorry, You loose the game.");

            $("#attack-button").off("click");
            $("#section-enemy").off("click");
            restartGame();
          }                  
      }
      else {
        generateMessage("Add another defender.");
        updateHealthPoint(fighterHP, opponentHP);  

        killCount++;

        if(killCount >= 3){    
          deleteMessage();     
          generateMessage("Congratulation!!! You have won the game!");
          $("#attack-button").off("click");
          restartGame();
        }  
      }       
      turnCounter++;
    }
    else {
      deleteMessage();
      generateMessage("Enemies to choose.");
    }

  });

  // <---------------------------------------------Instructions--------------------------------------------------->
  // * The player will now be able to click the `attack` button.
  //    * Whenever the player clicks `attack`, their character damages the defender.
  //    * The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
  //    * The opponent character will instantly counter the attack. 
  //    * When that happens, the player's character will lose some of their `HP`. 
  //    * These points are shown at the bottom of the player character's picture.

  // //<--------------------------------------Callback Functions--------------------------------------------------->
  //  // Function which handles restarting the game after victory or defeat.
   var restartGame = function() {
    // When the 'Restart' button is clicked, reload the page.
    var restart = $("<button>Restart</button>").click(function() {
      location.reload();
   });
   }

  //  var updateCharacter = function(character, sectionCharacter) {
  //   // First we empty the area so that we can re-render the new object
  //   $(sectionCharacter).empty();
  //   createCharacterSection(character, sectionCharacter);
  //  };


  // //callback function to remove the selected defender from 'Enemies' section
  // // var removeCharacter = function (defender) {
  // //   //console.log(`Defender ${defender.name}`);

  // //   // empty the 'section-enemy' div to remove the selected defender
  // //   $("#section-enemy").empty(`#character-div data-name =${defender.name} `);
  // //   //Add title enemy to the 'section-enemy' div
  // //   $("#section-enemy").append("<div class = 'title'> Enemies </div>");
  // //   //removes the selected defender from the enemy array
  // //   enemies.splice(defender, 1);
  // //   //adds the the rest of the enemies to the enemies array again
  // //   for (var i = 0; i < enemies.length; i++) {
  // //     createCharacterSection(enemies[i], "#section-enemy");
  // //     //console.log(enemies[i].name);
  // //   }
  // // };

  //callback function to update the health point of the fighter and the defender
  var updateHealthPoint = function (newFighterHP, newOpponentHP) {

    // console.log(fighter.name + ":" + fighter.healthPoint);
    // console.log(defender.name + ":" + defender.healthPoint);
      console.log("Fighter "+ fighter.name);
      fighter.healthPoint = newFighterHP;
      defender.healthPoint = newOpponentHP;
      //removes the div where all characters were displayed at the begining
      $("#section-character").remove();

      //change the health point after attack
      // $("#character-health").attr({
      //   "data-health" : `HP-${fighter.name}`
      // }).text(newFighterHP);
      $(`data-health, HP-${fighter.name}`).text(newFighterHP);

      // $("#character-health").attr({
      //   "data-health": `HP-${defender.name}`
      // }).text(newOpponentHP);
       $(`data-health HP-${defender.name}`).text(newOpponentHP);
      //change the game updates after each
      var firstMessage =`You attacked ${defender.name} for ${newOpponentHP} damage.`;
      var secondMessage = `${defender.name} attacked you back for ${newFighterHP} damage.`;
      generateMessage(firstMessage);
      generateMessage(secondMessage);
}

// generates game messages
var generateMessage = function(message){

   var newMessage = $("<div>").text(message);
   $("#game-message").append(newMessage);
   $("#game-message").css({ "color": "white" });
}

var deleteMessage = function(){
  $("#game-message").empty();
}
});


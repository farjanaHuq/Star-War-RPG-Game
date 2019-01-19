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
    "darth-vader" :{
      name: "darth-vader",
      healthPoint: 120,
      attackPoint: 10,
      imageSrc: "./assets/images/darth-vader.jpg",
      attackBackPoint: 13
    },
    "han-solo":{
      name: "han-solo",
      healthPoint: 100,
      attackPoint: 8,
      imageSrc: "./assets/images/han-solo.jpg",
      attackBackPoint: 6
    },
    "HK-47":{
      name: "HK-47",
      healthPoint: 150,
      attackPoint: 12,
      imageSrc: "./assets/images/HK-47.png",
      attackBackPoint: 20
    },
    "kyle-kataram":{
      name: "kyle-kataram",
      healthPoint: 180,
      attackPoint: 6,
      imageSrc: "./assets/images/kyle-kataram.jpg",
      attackBackPoint: 27
    }
  };
  // variables to store fighter, enemies and defender
    var fighter ;
    var enemies = [] ;
    var defender;
    var attack = true;
  // Creates a section for characters - there names, images and health points

    var createCharacterSection = function (character, createCharacters) {

    var charDiv = $(`<div class = 'character' id = 'character-div' data-name= ${character.name}>`);
    var charName = $(`<div class = character' id ='character-name'>`).text(character.name);
    var charImage = $(`<img alt = 'image' class ='character-image'>`).attr("src", character.imageSrc);
    var charHealth = $(`<div class = character' id ='character-health'>`).text(character.healthPoint);

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
    $.each(characters, function (i, val) {
      createCharacterSection(val, "#section-character");
    });
  }
 
  startTheGame();

 // onclick function to select the fighter
  $("#section-character").on("click", ".character" , function(){
            var selectChar = $(this).attr("data-name");
            console.log(selectChar);
            
            if(!fighter){
               fighter = characters[selectChar];
               createCharacterSection(fighter, "#selected-character")
            }
            else{
              console.log("Select your fighter.");
            }
            for(var key in characters){
              if(key!==selectChar){
                 enemies.push(characters[key]);
              }
              else{
                 console.log("Enemies to choose!");
              }
            }
            //moves rest of the players to enemy section
            for(var i = 0; i<enemies.length; i++){
              createCharacterSection(enemies[i], "#section-enemy");
              //console.log(`Enemies: ${enemies[i]}`)
            }
            $("#section-character").hide();
           
  });
 //select defender from enemy section
  $("#section-enemy").on("click", ".character", function(){
         var selectDefender = $(this).attr("data-name");
         console.log(selectDefender);
         if(!defender){
             defender = characters[selectDefender];
             console.log(defender);
             createCharacterSection(defender, "#defender");
         }
         else{
           console.log("Select your defender.");
         }
  });
  
  // * The player will now be able to click the `attack` button.
  //    * Whenever the player clicks `attack`, their character damages the defender.
  //    * The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
  //    * The opponent character will instantly counter the attack. 
  //    * When that happens, the player's character will lose some of their `HP`. 
  //    * These points are shown at the bottom of the player character's picture.
  $("#attack-button").on("click", function(){
      console.log("Attack");
      console.log(`Fighter ${fighter.healthPoint}`);
      if(attack){
        var opponentHealth =  defender.healthPoint-fighter.attackPoint;
        var fighterHealth  = fighter.healthPoint- defender.attackBackPoint;
        $("#game-message").append(`<p> You attacked ${defender.name} for ${opponentHealth} damage.</p> `);
        $("#game-message").append(`<p> ${defender.name} attacked you back for ${fighterHealth} damage.</p>`);
      }
      $("#game-message").css({ "color" : "white"});

  });
});
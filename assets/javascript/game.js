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
  var characters = [
    {
      name: "darth-vader",
      healthPoint: 120,
      attackPoint: 10,
      imageSrc: "./assets/images/darth-vader.jpg",
      attackBackPoint: 13
    },
    {
      name: "han-solo",
      healthPoint: 100,
      attackPoint: 8,
      imageSrc: "./assets/images/han-solo.jpg",
      attackBackPoint: 6
    },
    {
      name: "HK-47",
      healthPoint: 150,
      attackPoint: 12,
      imageSrc: "./assets/images/HK-47.png",
      attackBackPoint: 20
    },
    {
      name: "kyle-kataram",
      healthPoint: 180,
      attackPoint: 6,
      imageSrc: "./assets/images/kyle-kataram.jpg",
      attackBackPoint: 27
    }
  ];
  
    var fighter = " ";
    var enemy = " ";
    var restOfThePlayer = " ";
  // Creates a section for characters - there names, images and health points

    var createCharacterSection = function (character, createCharacters) {

    var charDiv = $("<div class = 'character' data-name='" + character.name + "'>");
    var charName = $("<div class = 'character-name'>").text(character.name);
    var charImage = $("<img alt = 'image' class = 'character-image'>").attr("src", character.imageSrc);
    var charHealth = $("<div class = 'character-health'>").text(character.healthPoint);

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

 // onclick function to select the player
  $("#section-character").on("click", ".character" , function(){
            var selectChar = $(this).attr("data-name");
            console.log(character.name);
            if(fighter === selectChar){
               $("#selected-character").append(fighter);
               console.log("fighter " + true);
            }else{
              $("#section-enemy").append(enemy);
              console.log(" enemy " + true);
            }
  })
});
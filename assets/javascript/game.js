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
            attackBackPoint: 20
          },
          "kyle-kataram": {
            name: "kyle-kataram",
            healthPoint: 180,
            attackPoint: 6,
            imageSrc: "./assets/images/kyle-kataram.jpg",
            attackBackPoint: 27
          }
        };
        // variables to store fighter, enemies, defender, wins, losses
        var fighter;
        var enemies = [];
        var defender;
        var wins = 0;
        var loses = 0;

        // Creates a section for characters - there names, images and health points
        var createCharacterSection = function (character, createCharacters) {

          var charDiv = $(`<div class = 'character' id = 'character-div' data-name= ${character.name}>`);
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

        // * The player will now be able to click the `attack` button.
        //    * Whenever the player clicks `attack`, their character damages the defender.
        //    * The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
        //    * The opponent character will instantly counter the attack. 
        //    * When that happens, the player's character will lose some of their `HP`. 
        //    * These points are shown at the bottom of the player character's picture.

        
        //callback function to remove the selected defender from 'Enemies' section
        var removeCharacter = function (defender) {

          console.log(`Defender ${defender.name}`);
          // empty the 'section-enemy' div to remove the selected defender
          $("#section-enemy").empty(`#character-div data-name =${defender.name} `);
          //Add title enemy to the 'section-enemy' div
          $("#section-enemy").append("<div class = 'title'> Enemies </div>");
          //removes the selected defender from the enemy array
          enemies.splice(defender, 1);
          //adds the the rest of the enemies to the enemies array again
          for (var i = 0; i < enemies.length; i++) {
            createCharacterSection(enemies[i], "#section-enemy");
            console.log(enemies[i].name);
          }
        };

        //callback function to update the health point of the fighter and the defender
        var updateHealthPoint = function (newFighterHP, newOpponentHP) {

          console.log(fighter.name + ":" + fighter.healthPoint);
          console.log(defender.name + ":" + defender.healthPoint);

          fighter.healthPoint = newFighterHP;
          defender.healthPoint = newOpponentHP;
          //removes the div where all characters were displayed at the begining
          $("#section-character").remove();

          //change the health point after attack
          $("#character-health").attr({
            "data-health": `HP-${fighter.name}`
          }).text(newFighterHP);

          $("#character-health").attr({
            "data-health": `HP-${defender.name}`
          }).text(newOpponentHP);

          //change the game updates after each
          $("#first-message").text(`You attacked ${defender.name} for ${newOpponentHP} damage.`);
          $("#second-message").text(`${defender.name} attacked you back for ${newFighterHP} damage.`);
        }
        $("#game-message").css({ "color": "white" });
      });

      //on click for attack button
      $("#attack-button").on("click", function () {
        console.log("Attack");
        var opponentHP = defender.healthPoint - fighter.attackPoint;
        var fighterHP = fighter.healthPoint - defender.attackBackPoint;

        updateHealthPoint(fighterHP, opponentHP);

        if (fighter.healthPoint <= 0) {
              loses++;
              $('.modal-body').text("Sorry! You loose the game...");
              $('#myModal').modal('show');
              startTheGame();
        }
        else if(defender.healthPoint <= 0){
            wins++;
            $('.modal-body').text("Congratulation! You won the game...");
            $('#myModal').modal('show');
            selectDefender();
        }
      });
      //select defender from enemy section
      var selectDefender = function () {
        $("#section-enemy").on("click", ".character", function () {
          var selectDefender = $(this).attr("data-name");
       
          if (!defender) {
            defender = characters[selectDefender];
            createCharacterSection(defender, "#defender");
          }
          else {
            console.log("Select your defender.");
          }
          removeCharacter(defender);
        });
      }

      // onclick function to select the fighter
      $("#section-character").on("click", ".character", function () {
        var selectChar = $(this).attr("data-name");

        console.log(selectChar);

        if (!fighter) {
          fighter = characters[selectChar];
          createCharacterSection(fighter, "#fighter");
        }
        else {
          console.log("Select your fighter.");
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
          console.log(`Enemies: ${enemies[i]}`);
        }
        $("#section-character").hide();

      });

      //Initialize the game
      var startTheGame = function () {
        $.each(characters, function (i, val) {
          createCharacterSection(val, "#section-character");
        });
      }

      selectDefender();
      startTheGame();

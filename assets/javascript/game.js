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

// Loads images in the section-character
  for (var i = 0; i < characters.length; i++) {
  
    var image = $(`<img class = "image-container[${i}]">`);
    var textImg = $("<textImg data-value>");
    image.attr("src", characters[i].imageSrc);
    textImg.attr("data-value", characters[i].healthPoint);
    $("#section-character").append(image);
    $(`.image-container[${i}]`).append(textImg);

    image.css({
       "height" : "120px",
       "width" : "120px",
       "position" : "relative"
           
    })
    textImg.css({
      "position" : "absolute",
      "color" : "white"
    })


     
    
  }

});
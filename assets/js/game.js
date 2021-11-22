// console.log (Math.random());
// console.log (Math.random());
// console.log (Math.random());

// Psuedocode section to prepare to code the game
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
// End psudeocode section

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100; //need to set to 100 after testing
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
   // repeat and execute as long as the both the player and enemy robots are still alive
   while (playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);
        // if player choses to fight, then fight
        if (promptFight === "skip" || promptFight === "SKIP"){
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth and use that result to update the value in the `enemyHealth` variable
        enemyHealth = Math.max(0, enemyHealth - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        // check enemy's health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney +20;
            //leave while() loop since enemy is dead
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
            // generate random damage value based on enemy's attack power
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the `playerHealth` variable.
            playerHealth = Math.max(0, playerHealth - damage);
            // Log a resulting message to the console so we know it worked.);
            console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop if player is dead
            break;
        } 
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } 
};
// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;  // change back to 10
    playerMoney = 10;
    // execute fight
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth >0) {
            // Alert players that they are starting the round 
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            // if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i <= enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }   
            fight(pickedEnemyName);
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        } 
    }
      // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};
// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
    // restart the game
    startGame();
    } 
    else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
  };
//shop function
var shop = function() {
        //ask a player what they'd like to do
        var shopOptionPrompt = window.prompt(
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'refill', 'upgrade', or 'leave' to make a choice."
        );
     // use switch to carry out action
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
        window.alert("Refilling player's health by 20 for 7 dollars.");
    
        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
        break;
        
        case "upgrade":
        case "UPGRADE":
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
    
        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
        break;

        case "leave":
        case "LEAVE":
        window.alert("Leaving the store.");
    
        // do nothing, so function will end
        break;

        default:
        window.alert("You did not pick a valid option. Try again.");
    
        // call shop() again to force player to pick a valid option
        shop();
        break;
    }
};
//function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}


// start the game when the page loads
startGame();

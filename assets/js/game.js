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

var fightOrSkip = function() {
   // ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);
        // Conditional Recursive Function Call
        if (promptFight === "" || promptFight === null) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSkip();
        }
        // if player choses to fight, then fight
        promptFight = promptFight.toLowerCase();
        if (promptFight === "skip" ) {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                return true;
                shop();
            }
        }
    return false;
}
var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    } 
    // repeat and execute as long as the both the player and enemy robots are still alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        console.log ("Players turn? " + isPlayerTurn)
        if (isPlayerTurn) {
            if (fightOrSkip()) {
            break;
            }
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health and use that result to update the value in the `enemy.health` variable
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name  + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            // check enemy's health
            if (enemy.health <=0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money +20;
                //leave while() loop since enemy is dead
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        // player gets attacked first
        }
        else {
                // generate random damage value based on enemy's attack power
                var damage = randomNumber(enemy.attack - 3, enemy.attack);
                // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the `playerInfo.health` variable.
                playerInfo.health = Math.max(0, playerInfo.health - damage);
                // Log a resulting message to the console so we know it worked.);
                console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
                );
            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } 
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    } 
};
// function to start a new game
var startGame = function(enemy) {
     // reset player stats
    playerInfo.reset();
    // execute fight
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health >0) {
            // Alert players that they are starting the round 
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
            // debugger;
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i <= enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }   
            fight(pickedEnemyObj);
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }
    window.alert("The game has now ended.  Let's see how you did!");
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    //if a plyaer has more money than the high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highsocre", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        alert(playerInfo.name + " now has the high score of " + playerInfo.money + " !");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1' for refill, '2' for upgrade, or '3' to leave the store."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt)
     // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
       
        case 2:
            playerInfo.upgradeAttack();
            break;
   
        case 3:
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
// function to set name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,  //CHANGE BACK to 10
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;  //Change back to 10
    }, // CRITICAL COMMA !!!!!
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for $7.");
            this.health +=20;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, // CRITICAL COMMA !!!
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert ("Upgrading player's attack by 6 for $7.");
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
  };
// Enemies
var enemyInfo = [
{
    name: "Roborto",
    attack: randomNumber(10, 14)
},
{
    name: "Amy Android",
    attack: randomNumber(10, 14)
},
{
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
}
];

// start the game when the page loads
 startGame();
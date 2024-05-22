#! usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
//--------------------------- games variable ------------------------------------//
let enemies = ["Skeleton💀", "Zombie🧟", "Warrior🤺", "Assassin☠️"];
let maxEnemyHealth = 75;
let enemyAttackDamageTOHero = 25;
//--------------------------- player variable -----------------------------------//
let heroHealth = 100;
let attackDamageTOEnemy = 50;
let numberHealthPotion = 3;
let healthPotionAmount = 30;
let healthPotionDropChance = 50;
//---------------------------- While loop condition ------------------------------//
let gameRunning = true;
console.log(chalk.red("WELCOME TO DEADZONE!"));
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.yellow(`# ${enemy} has appeared #\n`));
    while (enemyHealth > 0) {
        console.log(`Your Health: ${heroHealth}`);
        console.log(chalk.green(` ${enemy} Health: ${enemyHealth}`));
        let option = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do?",
            choices: ["1. Attack", "2. Take Health potion", "3. Run"]
        });
        if (option.ans === "1. Attack") {
            let damageTOEnemy = Math.floor(Math.random() * attackDamageTOEnemy + 1);
            let damageTOHero = Math.floor(Math.random() * enemyAttackDamageTOHero + 1);
            enemyHealth -= damageTOEnemy;
            heroHealth -= damageTOHero;
            console.log(chalk.redBright(`You strike the ${enemy} for ${damageTOEnemy}`));
            console.log(chalk.yellowBright(`${enemy} strike you for ${damageTOHero} damage.`));
            if (heroHealth < 1) {
                console.log(chalk.red("You have taken too much damage. You are too weak to continue."));
                break;
            }
        }
        else if (option.ans === "2. Take Health potion") {
            if (numberHealthPotion > 0) {
                heroHealth += healthPotionAmount;
                numberHealthPotion--;
                console.log(chalk.yellowBright(`You use Health potion for ${healthPotionAmount}`));
                console.log(chalk.gray(`You now have ${heroHealth} Health`));
                console.log(chalk.cyan(`You have ${numberHealthPotion} Health potions left.`));
            }
            else {
                console.log(chalk.yellowBright(`You have no health potions left. Defeat enemy for a chance to get health potion`));
            }
        }
        else if (option.ans === "3. Run") {
            console.log(chalk.cyan(`You run away from ${enemy}`));
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(chalk.blackBright(`You are out from Battle. You are too weak......`));
        break;
    }
    console.log(chalk.redBright(`${enemy} was Defeated`));
    console.log(chalk.greenBright(`You have ${heroHealth} Health.`));
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numberHealthPotion++;
        console.log(chalk.red(`Enemy give you Health potion`));
        console.log(chalk.greenBright(`Your health is ${heroHealth}`));
        console.log(chalk.yellow(`Your health potion is ${numberHealthPotion}`));
    }
    let usrOption = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What would you like to do now",
        choices: ["1. Continue", "2. Exit"]
    });
    if (usrOption.ans === "1. Continue") {
        console.log(chalk.whiteBright("You are continue on your adventure"));
    }
    else {
        console.log(chalk.green("You successfully Exit from DeadZone"));
        break;
    }
    console.log(chalk.black("THANKYOU FOR PLAYING.\n"));
}

// game.js

class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.position = { x: 0, y: 0, z: 0 };
        this.inventory = [];
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        console.log(`${this.name} has died.`);
    }

    move(x, y, z) {
        this.position = { x, y, z };
        console.log(`${this.name} moved to position: (${x}, ${y}, ${z})`);
    }

    equipWeapon(weapon) {
        this.inventory.push(weapon);
        console.log(`${this.name} equipped ${weapon.name}`);
    }
}

class Weapon {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    attack(target) {
        console.log(`Attacking ${target.name} with ${this.name}`);
        target.takeDamage(this.damage);
    }
}

class Game {
    constructor() {
        this.players = [];
        this.collisions = [];
    }

    addPlayer(player) {
        this.players.push(player);
        console.log(`${player.name} joined the game.`);
    }

    checkCollision(player1, player2) {
        // Simple collision detection logic
        const distance = Math.sqrt(
            Math.pow(player1.position.x - player2.position.x, 2) +
            Math.pow(player1.position.y - player2.position.y, 2) +
            Math.pow(player1.position.z - player2.position.z, 2)
        );
        if (distance < 2) { // Assuming players have a radius of 1
            console.log(`${player1.name} collided with ${player2.name}`);
            this.collisions.push({ player1, player2 });
        }
    }
}

// Example usage:
const game = new Game();
const player1 = new Player('Player1');
const player2 = new Player('Player2');

const sword = new Weapon('Sword', 25);
player1.equipWeapon(sword);

game.addPlayer(player1);
game.addPlayer(player2);

player1.move(1, 0, 0);
player2.move(2, 0, 0);

game.checkCollision(player1, player2);

sword.attack(player2);


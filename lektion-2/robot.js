// robot.js
// Kopiera din lösning från tidigare nivåer hit!

const game = {
  player: {
    x: 0,
    y: 0,
    direction: "NORTH",
  },

  score: 0,

  items: [
    { x: 3, y: 3, type: "trash" },
    { x: 2, y: 4, type: "trash" },
  ],

  timeLeft: 30,
  gameStatus: "ready", // ready, playing, won, lost
  gameInterval: null,

  moveForward() {
    // TODO: Kopiera din kod från tidigare nivåer
    // Kom ihåg gränskontroll (0-9)
    if (this.player.direction === "NORTH" && this.player.y < 9) {
      this.player.y++;
    } else if (this.player.direction === "EAST" && this.player.x < 9) {
      this.player.x++;
    } else if (this.player.direction === "SOUTH" && this.player.y > 0) {
      this.player.y--;
    } else if (this.player.direction === "WEST" && this.player.x > 0) {
      this.player.x--;
    }

    //Kolla collision
    this.checkCollision();
  },

  turnRight() {
    const turns = {
      NORTH: "EAST",
      EAST: "SOUTH",
      SOUTH: "WEST",
      WEST: "NORTH",
    };
    this.player.direction = turns[this.player.direction];
  },

  turnLeft() {
    const turns = {
      NORTH: "WEST",
      WEST: "SOUTH",
      SOUTH: "EAST",
      EAST: "NORTH",
    };
    this.player.direction = turns[this.player.direction];
  },

  reset() {
    this.player.x = 0;
    this.player.y = 0;
    this.player.direction = "NORTH";
  },

  getPosition() {
    return `x:${this.player.x}, y:${this.player.y}, ${this.player.direction}`;
  },

  checkCollision() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      //är roboten på samma ruta/position?
      if (this.player.x === item.x && this.player.y === item.y) {
        console.log("Vi körde på något!");

        //ger detta poäng? ja...
        this.score += 10;

        //har vi "plockat upp" föremålet? ja.. då ska det "försvinna"
        this.items.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  startGame() {
    console.log("Game is on");

    this.gameStatus = "playing";
    this.score = 0;
    this.timeLeft = 3;

    //starta en timer för spelet
    this.gameInterval = setInterval(() => {
      console.log(`tick tack, tid kvar: ${this.timeLeft} `);
      //varje gång denna funktion körs, dvs varje sekund, minska tiden
      this.timeLeft--;
      //hmm, kolla om spelet är över...
      this.checkGameOver();
    }, 1000);
  },
  checkGameOver() {
    //förlust om tiden tar slut
    if (this.timeLeft <= 0) {
      this.gameStatus = "lost";
      clearInterval(this.gameInterval);
      alert("time is up, score: " + this.score);
      return;
    }
    //vinst om alla items är samlade
    if (this.items.length === 0) {
      this.gameStatus = "won";
      clearInterval(this.gameInterval);
      alert("Winner, score: " + this.score);
      return;
    }
  },
};

window.game = game;

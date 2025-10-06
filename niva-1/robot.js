// robot.js

const robot = {
  // STATE - Vad roboten kommer ihåg
  x: 0,
  y: 0,
  direction: 'NORTH',

  // ACTIONS - Vad roboten kan göra

  /**
   * Flyttar roboten ett steg framåt i den riktning den tittar
   */
  moveForward() {
    // TODO: Implementera logik för att flytta roboten
    // Tips: Använd if/else eller switch för att kolla this.direction
    // och uppdatera antingen this.x eller this.y
    
    // Exempel:
    // if (this.direction === 'NORTH') {
    //   this.y++;
    // } else if ...
  },

  /**
   * Svänger roboten 90 grader åt höger (medurs)
   */
  turnRight() {
    // TODO: Implementera logik för att rotera medurs
    // NORTH -> EAST -> SOUTH -> WEST -> NORTH
    
    // Tips: if/else eller switch fungerar bra här också
  },

  /**
   * Svänger roboten 90 grader åt vänster (moturs)
   */
  turnLeft() {
    // TODO: Implementera logik för att rotera moturs
    // NORTH -> WEST -> SOUTH -> EAST -> NORTH
  },

  /**
   * Returnerar en beskrivning av robotens position
   * @returns {string} Beskrivning av position och riktning
   */
  getPosition() {
    return `Jag är på x:${this.x}, y:${this.y} och tittar åt ${this.direction}`;
  }
};

// Gör roboten tillgänglig globalt för testning
window.robot = robot;

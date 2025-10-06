const robot = {
  direction: "NORTH",
  x: 0,
  y: 0,
  moveForward() {},
  turnRight() {},
  turnLeft() {},
  getPosition() {
    return `Jag är på x:${this.x}, y:${this.y} och tittar åt ${this.direction}`;
  },
};

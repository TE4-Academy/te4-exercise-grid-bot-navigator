// app.js
// Din uppgift: Koppla ihop robot-logiken med gränssnittet!

// === STEG 1: Hämta referenser till DOM-element ===

const grid = document.getElementById('grid');
const forwardBtn = document.getElementById('forward-btn');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');
const resetBtn = document.getElementById('reset-btn');

const xDisplay = document.getElementById('x-display');
const yDisplay = document.getElementById('y-display');
const directionDisplay = document.getElementById('direction-display');

// TODO: Skapa en variabel för robot-elementet (du behöver skapa detta element!)
let robotElement;


// === STEG 2: Skapa rutnätets celler ===

function createGrid() {
  // TODO: Skapa 100 celler (10x10) och lägg till dem i grid-elementet
  // Tips: Använd en loop och createElement()
  
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell bg-gray-800 border border-gray-600';
    grid.appendChild(cell);
  }
}


// === STEG 3: Skapa robot-elementet ===

function createRobot() {
  // TODO: Skapa ett div-element för roboten
  // Tips: Det ska vara positionerat absolut eller använda CSS Grid
  
  robotElement = document.createElement('div');
  robotElement.className = 'robot';
  robotElement.textContent = '🤖';
  robotElement.style.position = 'absolute'; // Eller använd CSS Grid positioning
  
  // TODO: Lägg till robotElement i DOM:en
  // grid.appendChild(robotElement); // eller motsvarande
}


// === STEG 4: Huvudfunktionen - updateUI() ===

/**
 * Denna funktion läser av robot.x, robot.y och robot.direction
 * och uppdaterar gränssnittet så det matchar
 */
function updateUI() {
  console.log('🔄 Uppdaterar UI...', robot.getPosition());
  
  // TODO: Uppdatera robotens position i rutnätet
  // Tips för CSS Grid:
  // robotElement.style.gridColumnStart = robot.x + 1;
  // robotElement.style.gridRowStart = robot.y + 1;
  
  // TODO: Uppdatera robotens rotation baserat på direction
  // Tips: Använd ett objekt som "lookup table"
  const rotations = {
    'NORTH': 0,
    'EAST': 90,
    'SOUTH': 180,
    'WEST': 270
  };
  
  // const rotation = rotations[robot.direction];
  // robotElement.style.transform = `rotate(${rotation}deg)`;
  
  // TODO: Uppdatera status-displayen
  // xDisplay.textContent = robot.x;
  // yDisplay.textContent = robot.y;
  // directionDisplay.textContent = robot.direction;
}


// === STEG 5: Koppla knappar till robot-metoder ===

// TODO: Lägg till event listeners på knapparna
// Varje knapp ska:
// 1. Anropa motsvarande robot-metod
// 2. Anropa updateUI() för att visa förändringen

// Exempel:
// forwardBtn.addEventListener('click', () => {
//   robot.moveForward();
//   updateUI();
// });

// TODO: Lägg till för rightBtn och leftBtn också

// TODO: Reset-knappen ska återställa roboten och uppdatera UI
// resetBtn.addEventListener('click', () => {
//   robot.reset();
//   updateUI();
// });


// === STEG 6: Initialisering ===

// Denna funktion körs när sidan laddas
function init() {
  console.log('🚀 Initialiserar Grid-Bot Navigator...');
  
  createGrid();
  createRobot();
  updateUI(); // Se till att UI matchar initial state
  
  console.log('✅ Redo att navigera!');
}

// Kör init när DOM:en är laddad
init();

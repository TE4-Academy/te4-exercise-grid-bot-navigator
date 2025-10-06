// app.js
// Din uppgift: Implementera fetch och kommando-exekvering!

// === DOM-referenser ===
const grid = document.getElementById('grid');
const missionInfo = document.getElementById('mission-info');
const executeBtn = document.getElementById('execute-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const randomMissionBtn = document.getElementById('random-mission-btn');

const xDisplay = document.getElementById('x-display');
const yDisplay = document.getElementById('y-display');
const directionDisplay = document.getElementById('direction-display');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let robotElement;
let currentMission = null;
let isExecuting = false;


// === Grundläggande funktioner (från Nivå 2) ===

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell bg-gray-800 border border-gray-600';
    grid.appendChild(cell);
  }
}

function createRobot() {
  robotElement = document.createElement('div');
  robotElement.className = 'robot';
  robotElement.textContent = '🤖';
  robotElement.style.gridColumn = '1';
  robotElement.style.gridRow = '10';
  grid.appendChild(robotElement);
}

function updateUI() {
  console.log('🔄 UI:', robot.getPosition());
  
  robotElement.style.gridColumn = robot.x + 1;
  robotElement.style.gridRow = (10 - robot.y);
  
  const rotations = { 'NORTH': 0, 'EAST': 90, 'SOUTH': 180, 'WEST': 270 };
  robotElement.style.transform = `rotate(${rotations[robot.direction]}deg)`;
  
  xDisplay.textContent = robot.x;
  yDisplay.textContent = robot.y;
  directionDisplay.textContent = robot.direction;
}


// === Nivå 3: DINA UPPGIFTER BÖRJAR HÄR ===

/**
 * TODO: Implementera denna funktion!
 * Hämtar ett uppdrag från missions/mission-X.json
 * @param {number} missionNumber - Vilket uppdrag (1, 2, 3)
 * @returns {Promise<Object>} - Uppdragsobjektet med name, description, commands
 */
async function fetchMission(missionNumber) {
  try {
    // TODO: 
    // 1. Använd fetch för att hämta `missions/mission-${missionNumber}.json`
    // 2. Konvertera response till JSON
    // 3. Returnera data
    
    // Exempel:
    // const response = await fetch(`missions/mission-${missionNumber}.json`);
    // if (!response.ok) throw new Error('Kunde inte hämta uppdrag');
    // const data = await response.json();
    // return data;
    
    console.log('TODO: Implementera fetchMission()');
    return null;
  } catch (error) {
    console.error('❌ Fel vid hämtning:', error);
    alert('Kunde inte hämta uppdraget. Kontrollera att du kör med en lokal server (Live Server).');
    return null;
  }
}


/**
 * TODO: Implementera denna funktion!
 * Översätter ett kommando (sträng) till en robot-metod
 * @param {string} command - T.ex. 'FORWARD', 'RIGHT', 'LEFT'
 */
function executeCommand(command) {
  // TODO:
  // Använd en switch eller if/else för att anropa rätt robot-metod
  // Exempel:
  // switch(command) {
  //   case 'FORWARD': robot.moveForward(); break;
  //   case 'RIGHT': robot.turnRight(); break;
  //   ...
  // }
  
  console.log('TODO: Implementera executeCommand() för:', command);
}


/**
 * TODO: Implementera denna funktion!
 * Exekverar alla kommandon i en lista, ett i taget, med paus mellan
 * @param {string[]} commands - Array av kommandon
 */
async function executeCommands(commands) {
  isExecuting = true;
  executeBtn.disabled = true;
  stopBtn.disabled = false;
  robotElement.classList.add('executing');
  
  // TODO:
  // 1. Loopa igenom commands-arrayen
  // 2. För varje kommando:
  //    - Kör executeCommand(command)
  //    - Uppdatera UI
  //    - Uppdatera progress bar
  //    - Vänta 500ms (använd sleep-funktionen nedan)
  //    - Kontrollera om isExecuting är false (användaren stoppade)
  
  // Exempel:
  // for (let i = 0; i < commands.length; i++) {
  //   if (!isExecuting) break;
  //   
  //   const command = commands[i];
  //   executeCommand(command);
  //   updateUI();
  //   updateProgress(i + 1, commands.length);
  //   
  //   await sleep(500);
  // }
  
  console.log('TODO: Implementera executeCommands() för:', commands);
  
  // Cleanup
  isExecuting = false;
  executeBtn.disabled = false;
  stopBtn.disabled = true;
  robotElement.classList.remove('executing');
  
  if (isExecuting !== false) { // Bara om inte stoppad
    alert('✅ Uppdrag slutfört!');
  }
}


/**
 * Hjälpfunktion: Väntar ett antal millisekunder
 * @param {number} ms - Millisekunder att vänta
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Uppdaterar progress bar
 * @param {number} current - Nuvarande kommando-index
 * @param {number} total - Totalt antal kommandon
 */
function updateProgress(current, total) {
  const percentage = (current / total) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${current}/${total}`;
}


/**
 * Visar uppdragsinformation i UI:t
 * @param {Object} mission - Uppdragsobjektet
 */
function displayMission(mission) {
  if (!mission) {
    missionInfo.innerHTML = '<p class="text-gray-400 text-center">Kunde inte ladda uppdrag</p>';
    return;
  }
  
  missionInfo.innerHTML = `
    <h3 class="text-xl font-bold text-blue-300 mb-2">${mission.name}</h3>
    <p class="text-gray-300 mb-3">${mission.description}</p>
    <div class="text-sm">
      <span class="text-gray-400">Svårighetsgrad:</span> 
      <span class="text-yellow-400">${mission.difficulty || 'Okänd'}</span>
    </div>
    <div class="text-sm mt-2">
      <span class="text-gray-400">Kommandon:</span> 
      <span class="text-green-400">${mission.commands.length} st</span>
    </div>
    <div class="mt-3 p-2 bg-gray-900 rounded font-mono text-xs overflow-x-auto">
      ${mission.commands.join(' → ')}
    </div>
  `;
  
  currentMission = mission;
  executeBtn.disabled = false;
}


// === Event Listeners ===

// Uppdragsval-knappar
document.getElementById('mission-1-btn').addEventListener('click', async () => {
  const mission = await fetchMission(1);
  displayMission(mission);
});

document.getElementById('mission-2-btn').addEventListener('click', async () => {
  const mission = await fetchMission(2);
  displayMission(mission);
});

document.getElementById('mission-3-btn').addEventListener('click', async () => {
  const mission = await fetchMission(3);
  displayMission(mission);
});

randomMissionBtn.addEventListener('click', async () => {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  const mission = await fetchMission(randomNum);
  displayMission(mission);
});

// Starta uppdrag
executeBtn.addEventListener('click', () => {
  if (currentMission && currentMission.commands) {
    executeCommands(currentMission.commands);
  }
});

// Stoppa uppdrag
stopBtn.addEventListener('click', () => {
  isExecuting = false;
  robotElement.classList.remove('executing');
});

// Återställ robot
resetBtn.addEventListener('click', () => {
  robot.reset();
  updateUI();
  updateProgress(0, 0);
});


// === Initialisering ===

function init() {
  console.log('🚀 Initialiserar Grid-Bot Navigator - Nivå 3...');
  createGrid();
  createRobot();
  updateUI();
  console.log('✅ Redo för uppdrag!');
  console.log('💡 Tips: Välj ett uppdrag från listan och klicka "Starta uppdrag"');
}

init();

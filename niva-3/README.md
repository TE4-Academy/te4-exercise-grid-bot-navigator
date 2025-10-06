# Nivå 3: API-fjärrstyrning

**Tid:** Ca 1 timme  
**Svårighetsgrad:** ⭐⭐⭐ Avancerad

---

## 🎯 Mål

Hämta kommandon från ett API och låt roboten exekvera dem automatiskt. Detta introducerar asynkron programmering och `fetch`.

Efter denna nivå ska du kunna:
- Använda `fetch` för att hämta data från en JSON-fil
- Parsa JSON-data till användbar information
- Exekvera kommandon i en sekvens med fördröjning
- Arbeta med `async/await` eller Promises

---

## 📝 Uppgift

Du ska bygga en "uppdragshämtare" där:
1. Användaren klickar på "Hämta Uppdrag"
2. Programmet använder `fetch` för att hämta en lista med kommandon från en JSON-fil
3. Roboten exekverar varje kommando automatiskt, ett i taget
4. Det finns en kort paus mellan varje kommando så man ser animationen

---

## 🏗️ Struktur

### Filer du ska arbeta i:
- `index.html` - Lägg till en "Hämta Uppdrag"-knapp
- `app.js` - Implementera fetch-logik och kommando-exekvering
- `robot.js` - Din logik från tidigare nivåer (kopiera över!)
- `missions/` - Mapp med JSON-filer för olika uppdrag

---

## 🚀 Kom igång

### Steg 1: Skapa JSON-filer för uppdrag

I mappen `missions/` skapar du filer som `mission-1.json`:

```json
{
  "name": "Hämta prov från kratern",
  "description": "Navigera till position (3, 4)",
  "commands": ["FORWARD", "FORWARD", "RIGHT", "FORWARD", "LEFT"]
}
```

Skapa minst 3 olika uppdrag med olika svårighetsgrader.

### Steg 2: Lägg till knapp i HTML

```html
<button id="fetch-mission-btn">🚀 Hämta Uppdrag</button>
<div id="mission-info"></div>
```

### Steg 3: Implementera fetch-funktionen

```javascript
async function fetchMission(missionNumber) {
  try {
    // TODO: Använd fetch för att hämta missions/mission-X.json
    // TODO: Konvertera responsen till JSON
    // TODO: Returnera kommandolistan
  } catch (error) {
    console.error('Kunde inte hämta uppdrag:', error);
  }
}
```

### Steg 4: Skapa en kommando-exekverare

```javascript
async function executeCommands(commands) {
  for (const command of commands) {
    // TODO: Översätt kommandot till en robot-metod
    // TODO: Kör metoden
    // TODO: Uppdatera UI
    // TODO: Vänta en stund innan nästa kommando (setTimeout eller await sleep())
  }
}
```

**Tips för fördröjning:**

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Användning:
await sleep(500); // Vänta 500ms
```

### Steg 5: Översätt kommandon till robot-metoder

Skapa en "command handler" som mappar strängar till funktionsanrop:

```javascript
function executeCommand(command) {
  switch(command) {
    case 'FORWARD':
      robot.moveForward();
      break;
    case 'RIGHT':
      robot.turnRight();
      break;
    case 'LEFT':
      robot.turnLeft();
      break;
    // TODO: Lägg till fler kommandon om du vill
    default:
      console.warn('Okänt kommando:', command);
  }
}
```

---

## 💡 Tips

### Async/Await

I denna övning använder vi **async/await** för asynkron kod (som ni jobbat med tidigare):

```javascript
async function run() {
  const mission = await fetchMission(1);
  await executeCommands(mission.commands);
}
```

**Viktigt:** 
- Funktioner som använder `await` måste vara markerade med `async`
- `await` pausar funktionen tills Promise:n är klar
- Använd alltid `try/catch` för error handling med async/await

### Visa uppdragsinformation

Innan du kör kommandona, visa uppdraget för användaren:

```javascript
const missionInfo = document.getElementById('mission-info');
missionInfo.innerHTML = `
  <h3>${mission.name}</h3>
  <p>${mission.description}</p>
  <p>Kommandon: ${mission.commands.join(' → ')}</p>
`;
```

### Lägg till en "stopp"-knapp

För att kunna avbryta ett pågående uppdrag:

```javascript
let isExecuting = false;

async function executeCommands(commands) {
  isExecuting = true;
  for (const command of commands) {
    if (!isExecuting) break; // Avbryt om användaren stoppat
    // ... resten av koden
  }
  isExecuting = false;
}
```

### Error handling

Vad händer om JSON-filen inte finns? Hantera fel gracefully:

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  alert('Kunde inte hämta uppdrag: ' + error.message);
}
```

---

## 🎨 Förbättringar (frivilligt)

### Slumpmässigt uppdrag
Skapa en knapp som väljer ett random uppdrag:

```javascript
const missionNumber = Math.floor(Math.random() * 3) + 1; // 1-3
```

### Progress bar
Visa hur långt roboten kommit i sitt uppdrag:

```javascript
const progress = (currentCommand / totalCommands) * 100;
```

### Ljud-effekter
Lägg till ett ljud när roboten rör sig:

```javascript
const moveSound = new Audio('move.mp3');
moveSound.play();
```

### Validerare
Kontrollera om roboten faktiskt når målpositionen:

```javascript
function validateMission(mission, finalPosition) {
  if (finalPosition.x === mission.targetX && finalPosition.y === mission.targetY) {
    alert('✅ Uppdrag slutfört!');
  } else {
    alert('❌ Roboten nådde inte målet');
  }
}
```

---

## ✅ Klart?

När du kan:
- ✅ Hämta ett uppdrag från en JSON-fil
- ✅ Visa uppdragsinformation för användaren
- ✅ Exekvera alla kommandon automatiskt
- ✅ Se roboten röra sig med animationer mellan varje steg

...då har du klarat Grid-Bot Navigator! 🎉

### Nästa steg
- Prova extra utmaningarna (hinder, pickup/drop, etc.)
- Skapa dina egna komplexa uppdrag
- Dela med dig till klassen!

---

## 🤔 Vanliga problem

### "fetch is not defined"
Du måste köra koden via en webbserver (inte `file://`). Använd VS Code Live Server eller:
```bash
npx serve
```

### "CORS-error"
Om du får CORS-problem, se till att:
- Du använder en lokal server (Live Server)
- JSON-filerna ligger i samma mapp-struktur som HTML-filen

### "Kommandona körs för snabbt"
Öka timeout-värdet i `sleep()` funktionen. Börja med 500ms eller mer.

### "Roboten stannar mitt i ett uppdrag"
Kontrollera att du använder `await` framför både `sleep()` och `updateUI()` om de är async.

---

## 📚 Läs mer

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

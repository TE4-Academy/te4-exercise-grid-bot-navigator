# Nivå 5: Timer och Game Loop

**Tid:** Ca 90 minuter (1.5 timmar)  
**Svårighetsgrad:** ⭐⭐⭐ Utmanande  
**Förkunskaper:** Nivå 4 slutförd OCH Lektion 2 genomgången

---

## ⏱️ Tidsplanering (viktig!)

| Steg       | Aktivitet                    | Tid    | Klar vid |
| ---------- | ---------------------------- | ------ | -------- |
| **Steg 1** | Kopiera från 4               | 10 min | XX:10    |
| **Steg 2** | Utöka game state med timer   | 10 min | XX:20    |
| **Steg 3** | Implementera startGame()     | 20 min | XX:40    |
| **Steg 4** | checkGameOver()              | 15 min | XX:55    |
| **Steg 5** | UI med timer och start-knapp | 20 min | XX:75    |
| **Test**   | Testning och buggfix         | 15 min | XX:90    |

**💡 Tips:** Fyll i "Klar vid" med faktiska klockslag när du börjar. T.ex. om du börjar 15:00, skriv 15:10, 15:20, etc.

**⚠️ VIKTIGT:** Du har redan gjort MYCKET av detta i lektionen! Använd din "lektion-demo" som mall.

---

## 🎯 Mål

Bygg vidare på collision detection-spelet och lägg till:

- **Timer** (30 sekunder)
- **Game loop** med `setInterval`
- **Game states** (`'playing'`, `'won'`, `'lost'`)
- **Win/lose conditions** baserat på tid

Efter denna nivå ska du kunna:

- Skapa en game loop med `setInterval`
- Hantera olika game states
- Implementera tidsbaserade conditions
- Stoppa och starta intervals korrekt

---

## 📝 Uppgift

Du ska bygga vidare på ditt spel från Nivå 4 och lägga till tidsbegränsning:

1. Spelet har en 30-sekunders timer
2. Timern tickar ner varje sekund
3. Spelaren **vinner** om allt skräp samlas innan tiden tar slut
4. Spelaren **förlorar** om tiden tar slut före allt skräp är samlat
5. En "Starta Spel"-knapp som initierar timern

---

## 🏗️ Struktur

### Filer du ska arbeta i:

- `game.js` - Lägg till timer-logik
- `app.js` - Lägg till timer-display och start-knapp
- `index.html` - Lägg till timer-UI element

---

## 🚀 Kom igång

### Steg 1: Kopiera från Nivå 4 (⏱️ 10 min)

**Vad du ska göra:**

1. Skapa en ny mapp `niva-5`
2. Kopiera ALLA filer från `niva-4` dit: `index.html`, `game.js`, `app.js`
3. Öppna `index.html` i webbläsare och testa att det fungerar
4. Du ska kunna spela och vinna (samla alla items)

**✅ Checkpoint:** Grundspelet från 4 fungerar innan du går vidare.

**🎯 Strategitips:** Har du kvar din "lektion-demo"? Ännu bättre! Kopiera den istället - den har redan timer!

---

### Steg 2: Utöka game state med timer (⏱️ 10 min)

### Steg 2: Utöka game state med timer (⏱️ 10 min)

**Mål:** Lägg till timer-egenskaper i game-objektet.

**⚠️ DU HAR REDAN GJORT DETTA I LEKTIONEN!** Kolla din lektion-demo.

I din `game.js`, uppdatera game-objektet:

```javascript
const game = {
  // Befintligt från Nivå 2-1
  player: { x: 0, y: 0, direction: "NORTH" },
  score: 0,
  items: [],

  // NYTT! Game state för timer
  timeLeft: 30,
  gameStatus: "ready", // 'ready', 'playing', 'won', 'lost'
  gameInterval: null,

  // Befintliga metoder från Nivå 2-1
  moveForward() {
    /* din kod */
  },
  turnRight() {
    /* din kod */
  },
  turnLeft() {
    /* din kod */
  },
  checkCollision() {
    /* din kod */
  },
  collectTrash(index) {
    /* din kod */
  },
  spawnItems(count) {
    /* din kod */
  },
};
```

**Förstå koden:**

- `timeLeft: 30` = antal sekunder kvar
- `gameStatus` = vad som händer i spelet just nu
  - `'ready'` = innan start
  - `'playing'` = spelet pågår
  - `'won'` = spelaren vann
  - `'lost'` = spelaren förlorade
- `gameInterval` = referens till setInterval (så vi kan stoppa det senare)

**✅ Checkpoint:** Kolla i console: `game.timeLeft` ska returnera 30, `game.gameStatus` ska returnera "ready".

---

### Steg 3: Implementera startGame() (⏱️ 20 min)

### Steg 3: Implementera startGame() (⏱️ 20 min)

**Mål:** Skapa funktionen som startar spelet och game loop.

**⚠️ DU HAR REDAN GJORT DETTA I LEKTIONEN!** Kopiera från din lektion-demo.

#### DEL 1: Grundläggande startGame() (10 min)

Lägg till denna metod i game-objektet:

```javascript
startGame() {
  console.log('🚀 Startar spelet...');

  // Stoppa eventuellt pågående spel först
  if (this.gameInterval) {
    clearInterval(this.gameInterval);
  }

  // Återställ state
  this.gameStatus = 'playing';
  this.score = 0;
  this.timeLeft = 30;
  this.player.x = 0;
  this.player.y = 0;
  this.player.direction = 'NORTH';

  // Spawna items
  this.spawnItems(5);

  // Starta game loop (kommer i nästa del)
}
```

**Förstå koden:**

- Vi STOPPAR först eventuell gammal timer (viktigt!)
- Vi återställer ALLT till startläge
- Vi spawnar nya items

**✅ Checkpoint:** Kör `game.startGame()` i console. Du ska se "🚀 Startar spelet..." och items ska spawnas.

#### DEL 2: Lägg till game loop (10 min)

Uppdatera `startGame()` - lägg till längst ner i funktionen:

```javascript
startGame() {
  console.log('🚀 Startar spelet...');

  // ... all kod från DEL 1 ...

  // Starta game loop
  this.gameInterval = setInterval(() => {
    if (this.gameStatus !== 'playing') {
      clearInterval(this.gameInterval);
      return;
    }

    // Minska tid
    this.timeLeft--;
    console.log('⏱️ Tid kvar:', this.timeLeft);

    // Kolla game over
    this.checkGameOver();
  }, 1000); // 1000ms = 1 sekund
}
```

**Förstå koden:**

- `setInterval(() => {...}, 1000)` = kör funktionen varje sekund (1000ms)
- Vi sparar referensen i `this.gameInterval` så vi kan stoppa den senare
- Varje sekund: minska tiden, logga, kolla game over
- Om status inte är `'playing'`, stoppa loopen

**✅ Checkpoint:** Kör `game.startGame()` i console. Du ska se timern ticka ner varje sekund!

**🆘 Fastnat?**

- "Får error 'checkGameOver is not a function'"? → Det kommer i nästa steg! Kommentera ut `this.checkGameOver()` tills vidare.

---

### Steg 4: Implementera checkGameOver() (⏱️ 15 min)

**Mål:** Kolla om spelaren vunnit eller förlorat.

**⚠️ DU HAR REDAN GJORT DETTA I LEKTIONEN!**

Lägg till denna metod i game-objektet:

```javascript
checkGameOver() {
  // Kolla om tiden är slut (LOSE condition)
  if (this.timeLeft <= 0) {
    this.gameStatus = 'lost';
    clearInterval(this.gameInterval);
    alert(`⏰ TIDEN ÄR UTE! Score: ${this.score} / 50`);
    return;
  }

  // Kolla om alla items är samlade (WIN condition)
  if (this.items.length === 0) {
    this.gameStatus = 'won';
    clearInterval(this.gameInterval);
    alert(`🎉 DU VANN! Score: ${this.score} | Tid kvar: ${this.timeLeft}s`);
    return;
  }
}
```

**Förstå koden:**

- Vi kollar TVÅ conditions: tid slut ELLER alla items samlade
- VIKTIGT: Vi sätter `gameStatus` FÖRE alert (annars kan timern fortsätta)
- Vi MÅSTE stoppa intervalet med `clearInterval(this.gameInterval)`
- Vi använder `return` för att avsluta funktionen direkt

**✅ Checkpoint:** Testa båda scenarion:

1. **Förlora:** Starta spelet, vänta 30 sekunder utan att samla. Du ska se "TIDEN ÄR UTE!"
2. **Vinna:** Ändra `timeLeft: 300` (5 minuter), samla alla items. Du ska se "DU VANN!"

#### VIKTIGT: Uppdatera collectTrash()

Din gamla `collectTrash()` från 4 har förmodligen win-check. Ta bort den! Flytta win-checken till `checkGameOver()`.

**Uppdatera till:**

```javascript
collectTrash(index) {
  console.log('🗑️ Samlade skräp! Index:', index);
  this.score += 10;
  this.items.splice(index, 1);
  console.log('💰 Nytt score:', this.score);

  // Kolla win condition direkt (för snabb respons)
  this.checkGameOver();
}
```

**Varför?** Vi vill kolla win DIREKT när sista itemet samlas, inte vänta till nästa tick.

**✅ Checkpoint:** Samla alla items - du ska vinna DIREKT, inte vänta 1 sekund.

---

### Steg 5: UI med timer och start-knapp (⏱️ 20 min)

**Mål:** Visa timer på skärmen och lägg till start-knapp.

#### DEL 1: Lägg till HTML (5 min)

I din `index.html`, lägg till timer-display och start-knapp:

```html
<!-- Timer Display (lägg till bredvid score) -->
<div class="bg-gray-800 p-4 rounded-lg text-center">
  <div class="text-sm text-gray-400">Tid kvar</div>
  <div id="timer-display" class="text-3xl font-bold text-yellow-400">30</div>
</div>

<!-- Start Button (lägg till överst i kontrollerna) -->
<button
  id="start-btn"
  class="w-full py-3 px-4 rounded-lg font-bold text-lg bg-green-600 hover:bg-green-700"
>
  ▶️ Starta Spel
</button>
```

#### DEL 2: Uppdatera updateUI() (5 min)

I din `app.js`, lägg till:

```javascript
// Högst upp i filen:
const timerDisplay = document.getElementById("timer-display");
const scoreDisplay = document.getElementById("score-display");
const itemsDisplay = document.getElementById("items-display");

// I updateUI() funktionen:
function updateUI() {
  // ... befintlig kod för spelaren ...

  // Uppdatera displays
  if (scoreDisplay) scoreDisplay.textContent = game.score;
  if (itemsDisplay) itemsDisplay.textContent = game.items.length;

  // NYTT: Uppdatera timer med färgändring
  if (timerDisplay) {
    timerDisplay.textContent = game.timeLeft;

    // Röd text vid låg tid!
    if (game.timeLeft <= 10) {
      timerDisplay.classList.add("text-red-500");
      timerDisplay.classList.remove("text-yellow-400");
    } else {
      timerDisplay.classList.add("text-yellow-400");
      timerDisplay.classList.remove("text-red-500");
    }
  }

  // Rita om items
  renderItems();
}
```

**Förstå koden:**

- Vi hämtar timer-elementet från DOM
- Vi uppdaterar texten med `game.timeLeft`
- Vid 10 sekunder eller mindre: röd text (warning!)
- Annars: gul text

**✅ Checkpoint:** Kör `game.timeLeft = 5` och sedan `updateUI()`. Timern ska visa 5 i RÖTT.

#### DEL 3: Start-knapp och UI-loop (10 min)

Lägg till i `app.js`:

```javascript
// Hämta start-knappen:
const startBtn = document.getElementById("start-btn");

// Event listener för start:
startBtn.addEventListener("click", () => {
  console.log("🎮 Start-knapp tryckt!");

  // Starta spelet
  game.startGame();
  updateUI();

  // Starta UI-update loop (snabbare än game loop för smooth animation)
  const uiInterval = setInterval(() => {
    if (game.gameStatus !== "playing") {
      clearInterval(uiInterval);
      return;
    }
    updateUI();
  }, 100); // Uppdatera UI varje 100ms (10 ggr/sek)
});
```

**Förstå koden:**

- Vi har TVÅ intervals nu:
  - **Game loop** (1000ms): Uppdaterar LOGIK (timer minskar)
  - **UI loop** (100ms): Uppdaterar VISUELLT (smidig animation)
- Båda stoppar när `gameStatus !== 'playing'`

**✅ Checkpoint:** Klicka "Starta Spel" - timern ska börja ticka ner och items ska spawnas!

**🆘 Fastnat?**

- "Knappen fungerar inte"? → Kolla att id="start-btn" stämmer
- "Timern uppdateras inte"? → Kolla att updateUI() anropas i UI-loopen
- "Flera timers körs samtidigt"? → Kolla att du stoppar gamla intervaller i startGame()

---

## ✅ TESTNING (⏱️ 15 min)

**Nu är det dags att testa allt tillsammans!**

### Test 1: Starta spelet

- Klicka "Starta Spel"
- Timern ska börja på 30 och ticka ner
- 5 skräpbitar ska spawnas
- Score ska vara 0

### Test 2: Samla items

- Navigera och samla items
- Score ska öka med 10 per item
- Items kvar ska minska
- Items ska försvinna från skärmen

### Test 3: Vinna

- Samla alla 5 items INNAN tiden tar slut
- Du ska se: "🎉 DU VANN!" med score och tid kvar
- Timern ska STOPPA

### Test 4: Förlora

- Starta nytt spel
- Vänta utan att samla
- Efter 30 sekunder: "⏰ TIDEN ÄR UTE!"
- Timern ska STOPPA

### Test 5: Röd varning

- Starta nytt spel
- Vänta tills timern når 10 sekunder
- Timern ska bli RÖD

### Test 6: Starta om

- Klicka "Starta Spel" igen
- Allt ska återställas
- Nya items ska spawnas
- Timern ska börja om på 30

**✅ Checklista:**

### Stoppa interval korrekt

Glöm ALDRIG att stoppa `setInterval` när spelet är slut:

```javascript
clearInterval(this.gameInterval);
```

Annars fortsätter timern ticka i bakgrunden!

### Förhindra flera samtidiga spel

Lägg till check i `startGame()`:

```javascript
startGame() {
  // Stoppa eventuellt pågående spel först
  if (this.gameInterval) {
    clearInterval(this.gameInterval);
  }

  // ... resten av koden
}
```

### Separera game loop från UI loop

- **Game loop** (1000ms): Uppdaterar logik (timer, game state)
- **UI loop** (100ms): Uppdaterar visuellt (smooth)

```javascript
// Game loop - långsam, logik
setInterval(() => {
  /* game logic */
}, 1000);

// UI loop - snabb, visuellt
setInterval(() => {
  /* updateUI() */
}, 100);
```

### Debug game states

Logga state-changes:

```javascript
checkGameOver() {
  if (this.timeLeft <= 0) {
    console.log('Game state changed: playing → lost');
    this.gameStatus = 'lost';
    // ...
  }
}
```

---

## 🎨 HTML-struktur

```html
<!-- Timer Display -->
<div class="bg-gray-800 p-4 rounded-lg text-center">
  <div class="text-sm text-gray-400">Tid kvar</div>
  <div id="timer-display" class="text-4xl font-bold text-yellow-400">30</div>
</div>

<!-- Score Display -->
<div class="bg-gray-800 p-4 rounded-lg text-center">
  <div class="text-sm text-gray-400">Poäng</div>
  <div id="score-display" class="text-4xl font-bold text-green-400">0</div>
</div>

<!-- Start Button -->
<button
  id="start-btn"
  class="w-full py-3 px-4 rounded-lg font-bold text-lg bg-green-600 hover:bg-green-700"
>
  ▶️ Starta Spel
</button>
```

---

**✅ Checklista:**

- [ ] Spelet startar med 30 sekunder när man klickar "Starta"
- [ ] Timern tickar ner varje sekund (30, 29, 28...)
- [ ] Timer-displayen ändrar färg vid 10 sekunder (röd)
- [ ] Spelet visar "DU VANN" om allt skräp samlas i tid
- [ ] Spelet visar "TIDEN ÄR UTE" om timern når 0
- [ ] Timern STANNAR när spelet är slut (ingen tick efter win/lose)
- [ ] Man kan starta ett nytt spel efter game over
- [ ] Allt återställs korrekt vid omstart (score, timer, items, position)

**🎉 Grattis! Om alla checkboxar är bockade är du klar med Nivå 5!**

---

## 💡 Tips och Tricks

### Stoppa interval korrekt

Glöm ALDRIG att stoppa `setInterval` när spelet är slut:

```javascript
clearInterval(this.gameInterval);
```

Annars fortsätter timern ticka i bakgrunden och det kan bli kaos!

### Förhindra flera samtidiga spel

Lägg till check i `startGame()`:

```javascript
startGame() {
  // Stoppa eventuellt pågående spel först
  if (this.gameInterval) {
    clearInterval(this.gameInterval);
  }

  // ... resten av koden
}
```

### Debug game states

Logga state-changes för att förstå vad som händer:

```javascript
checkGameOver() {
  if (this.timeLeft <= 0) {
    console.log("📊 Game state changed: playing → lost");
    this.gameStatus = "lost";
    // ...
  }
}
```

---

## 🤔 Vanliga problem och lösningar

### Problem: "Timern tickar för snabbt/långsamt"

**Lösning:** Kontrollera att `setInterval` använder `1000` (millisekunder). 1000ms = 1 sekund exakt.

### Problem: "Spelet fortsätter efter game over"

**Lösning:** Glöm inte `clearInterval(this.gameInterval)` i BÅDE win OCH lose conditions i `checkGameOver()`.

### Problem: "Alert() visas flera gånger"

**Lösning:** Kolla att du ändrar `gameStatus` INNAN du visar alert. Exempel:

```javascript
// RÄTT ordning:
this.gameStatus = "lost"; // Först!
clearInterval(this.gameInterval);
alert("Game Over"); // Sen!
```

### Problem: "Tiden fortsätter minska efter vinst"

**Lösning:** Se till att `clearInterval()` anropas i `checkGameOver()` när spelaren vinner. Kollisionen anropar `checkGameOver()`, så det ska funka automatiskt.

### Problem: "Flera timers körs samtidigt"

**Lösning:** Du har glömt stoppa gamla intervaller. Lägg till i `startGame()`:

```javascript
if (this.gameInterval) {
  clearInterval(this.gameInterval);
}
```

---

## 📊 Specifikation

| Feature            | Värde                   |
| ------------------ | ----------------------- |
| Spelplan           | 10x10 rutnät            |
| Antal skräpbitar   | 5                       |
| Tid                | 30 sekunder             |
| Poäng per skräpbit | 10                      |
| Max score          | 50                      |
| Warning threshold  | 10 sekunder (röd timer) |

---

## 🎓 När du är klar

Testa spelet grundligt och se till att:

1. Det går att vinna (samla allt innan tiden tar slut)
2. Det går att förlora (tiden tar slut)
3. Timern fungerar exakt (tickar varje sekund)
4. UI uppdateras smidigt
5. Inga intervals fortsätter efter game over

När allt fungerar är du redo för **Nivå 6** där vi lägger till olika item-typer (hinder och power-ups)!

---

## 💪 Aha-moment

Efter denna nivå har du lärt dig:

- ✅ **Game loop** - använda `setInterval` för att uppdatera spelet över tid
- ✅ **State management** - hantera olika game states (`ready`, `playing`, `won`, `lost`)
- ✅ **Tidsbaserad logik** - implementera win/lose conditions baserat på tid
- ✅ **Resource management** - stoppa och starta intervals korrekt
- ✅ **Nu är det ett RIKTIGT spel!** - med pressure och konsekvenser

---

## ✅ Klart?

När du kan:

- ✅ Hinder blockerar rörelse
- ✅ Power-ups ger extra tid
- ✅ Olika items ser olika ut
- ✅ Endast trash räknas för att vinna

...då är du redo för **Nivå 6**!

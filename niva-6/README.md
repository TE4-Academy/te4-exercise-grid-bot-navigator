# Nivå 6: Power-ups och Hinder

**Tid:** Ca 60 minuter (1 timme)  
**Svårighetsgrad:** ⭐⭐⭐ Utmanande  
**Förkunskaper:** Nivå 5 slutförd

---

## ⏱️ Tidsplanering (viktig!)

| Steg       | Aktivitet                       | Tid    | Klar vid |
| ---------- | ------------------------------- | ------ | -------- |
| **Steg 1** | Kopiera från 5 och planera      | 5 min  | XX:05    |
| **Steg 2** | Uppdatera spawnItems()          | 10 min | XX:15    |
| **Steg 3** | Uppdatera collectItem()         | 10 min | XX:25    |
| **Steg 4** | Blockera rörelse (hinder-check) | 15 min | XX:40    |
| **Steg 5** | checkGameOver() för trash       | 5 min  | XX:45    |
| **Steg 6** | UI - rendera olika item-typer   | 10 min | XX:55    |
| **Test**   | Testning                        | 5 min  | XX:60    |

**💡 Tips:** Fyll i "Klar vid" med faktiska klockslag när du börjar. T.ex. om du börjar 16:00, skriv 16:05, 16:15, etc.

**⚠️ DETTA ÄR NYTT MATERIAL:** I lektionen täckte vi inte flera item-typer. Detta är din första riktiga utmaning!

---

## 🎯 Mål

Bygg vidare på timer-spelet och lägg till olika item-typer:

- **Hinder** (🧱) som blockerar rörelse
- **Power-ups** (⚡) som ger +5 sekunder
- **Skräp** (🗑️) som ger poäng (från tidigare)

Efter denna nivå ska du kunna:

- Hantera olika typer av items i samma array
- Använda `switch`-satser för olika logik
- Förhindra rörelse baserat på items
- Skapa mer komplexa spelmekaniker

---

## 📝 Uppgift

Du ska bygga vidare på ditt spel från Nivå 5 och lägga till variation:

1. Spelet har nu **3 typer av items**: skräp, hinder, power-ups
2. **Skräp (🗑️)**: +10 poäng, försvinner när det samlas
3. **Power-ups (⚡)**: +5 sekunder, försvinner när det samlas
4. **Hinder (🧱)**: Blockerar rörelse, permanent
5. Spelaren vinner när allt SKRÄP är samlat (hinder räknas inte)

---

## 🏗️ Struktur

### Filer du ska arbeta i:

- `game.js` - Lägg till item-typ logik
- `app.js` - Rendera olika items med olika emojis
- Samma HTML som tidigare (inget nytt UI behövs)

---

## 🚀 Kom igång

### Steg 1: Kopiera från Nivå 5 och planera (⏱️ 5 min)

**Vad du ska göra:**

1. Skapa en ny mapp `niva-6`
2. Kopiera ALLA filer från `niva-5` dit
3. Öppna och testa - grundspelet ska fungera
4. Förstå målet: Vi ska ha 3 typer av items istället för 1

**Förstå konceptet:**

- **🗑️ Skräp (trash)**: +10 poäng, försvinner, måste samlas för vinst
- **⚡ Power-ups (powerup)**: +5 sekunder, försvinner, INTE nödvändiga för vinst
- **🧱 Hinder (obstacle)**: Blockerar rörelse, försvinner ALDRIG

**✅ Checkpoint:** Grundspelet från 5 fungerar. Du förstår skillnaden mellan item-typerna.

---

### Steg 2: Uppdatera spawnItems() för olika typer (⏱️ 10 min)

**Mål:** Ändra funktionen att ta 3 parametrar och skapa olika item-typer.

**TIPS:** Använd samma logik 3 gånger - en för varje typ!

Uppdatera din `spawnItems()` funktion i `game.js`:

```javascript
spawnItems(trashCount, obstacleCount, powerupCount) {
  this.items = [];

  // Hjälpfunktion för att kolla om position är ledig
  const isPositionFree = (x, y) => {
    if (x === this.player.x && y === this.player.y) return false;
    return !this.items.some(item => item.x === x && item.y === y);
  };

  // Skapa skräp
  for (let i = 0; i < trashCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'trash' });
  }

  // Skapa hinder
  for (let i = 0; i < obstacleCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'obstacle' });
  }

  // Skapa power-ups
  for (let i = 0; i < powerupCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'powerup' });
  }
}
```

**Förstå koden:**

- Vi använder `do...while` loop för att hitta lediga positioner
- `isPositionFree()` kollar både spelarposition OCH andra items
- Vi kallar `push()` med rätt `type` för varje kategori

**Uppdatera startGame():**

Hitta din `startGame()` och ändra:

```javascript
// Gammalt:
this.spawnItems(5);

// Nytt:
this.spawnItems(5, 3, 2); // 5 skräp, 3 hinder, 2 power-ups
```

**Testa nu:** Kör `game.spawnItems(5, 3, 2)` i console, sedan `game.items`. Du ska se 10 items med olika `type`!

**✅ Checkpoint:** Du har 10 items totalt med blandade typer.

---

### Steg 3: Byt namn collectTrash() → collectItem() (⏱️ 10 min)

**Mål:** Hantera olika item-typer med switch-sats.

Hitta din `collectTrash()` funktion och BYT NAMN till `collectItem()`. Lägg till switch-logik:

```javascript
collectItem(index) {
  const item = this.items[index];
  console.log('📦 Interagerade med:', item.type);

  switch(item.type) {
    case 'trash':
      this.score += 10;
      this.items.splice(index, 1);
      console.log('🗑️ Samlade skräp! +10p. Score:', this.score);
      break;

    case 'powerup':
      this.timeLeft += 5;
      this.items.splice(index, 1);
      console.log('⚡ Power-up! +5 sekunder! Tid:', this.timeLeft);
      break;

    case 'obstacle':
      // Hinder kan inte samlas - gör inget!
      console.log('🧱 Det här är ett hinder! Kan inte samlas.');
      break;
  }

  // Kolla game over (för att kolla win condition)
  this.checkGameOver();
}
```

**Förstå koden:**

- `switch(item.type)` kollar vilken typ itemet har
- Varje `case` hanterar en specifik typ
- ENDAST trash och powerup försvinner (`splice`)
- Obstacles gör INGENTING när man kör in i dem

**Uppdatera checkCollision():**

Hitta din `checkCollision()` och ändra anropet:

```javascript
// I checkCollision(), ändra:
// Gammalt:
this.collectTrash(i);

// Nytt:
this.collectItem(i);
```

**Testa nu:**

1. Spawna items med `game.spawnItems(2, 1, 1)`
2. Flytta spelaren till olika items manuellt i console
3. Kolla console-loggen - olika typer ska ge olika meddelanden

**✅ Checkpoint:** Olika item-typer har olika effekter när du kör in i dem.

---

### Steg 4: Blockera rörelse in i hinder (⏱️ 15 min)

**Mål:** Förhindra spelaren från att gå igenom obstacles.

**VIKTIGT:** Vi måste kolla INNAN vi flyttar, inte efter!

Uppdatera din `moveForward()` helt:

```javascript
moveForward() {
  // 1. Beräkna nästa position (utan att faktiskt flytta än)
  let nextX = this.player.x;
  let nextY = this.player.y;

  if (this.player.direction === 'NORTH' && this.player.y < 9) {
    nextY++;
  } else if (this.player.direction === 'EAST' && this.player.x < 9) {
    nextX++;
  } else if (this.player.direction === 'SOUTH' && this.player.y > 0) {
    nextY--;
  } else if (this.player.direction === 'WEST' && this.player.x > 0) {
    nextX--;
  } else {
    console.log('🚫 Kant av rutnätet!');
    return; // Utanför rutnätet
  }

  // 2. NYTT: Kolla om nästa position har ett hinder
  const isObstacle = this.items.some(item =>
    item.x === nextX && item.y === nextY && item.type === 'obstacle'
  );

  if (isObstacle) {
    console.log('⚠️ Hinder i vägen! Kan inte gå!');
    return; // STOPPA - gå inte
  }

  // 3. Om allt OK: NU flyttar vi faktiskt
  this.player.x = nextX;
  this.player.y = nextY;

  // 4. Kolla kollision (för trash och powerups)
  this.checkCollision();
}
```

**Förstå koden:**

- Vi räknar ut NÄSTA position INNAN vi flyttar
- Vi använder `.some()` för att kolla om det finns ett obstacle där
- Om obstacle: `return` (avbryt funktionen, ingen flytt)
- Om OK: flytta till nästa position
- SEN kolla collision (för att plocka upp trash/powerups)

**Varför i denna ordning?**

1. Beräkna nästa position
2. Kolla om det är blockerat (obstacle)
3. Om OK, flytta
4. Kolla vad som finns där (trash/powerup)

**Testa nu:**

1. Spawna items med obstacles: `game.spawnItems(3, 2, 1)`
2. Försök navigera TILL ett obstacle
3. Du ska INTE kunna gå dit - console ska säga "Hinder i vägen!"

**✅ Checkpoint:** Spelaren kan INTE gå igenom obstacles.

---

### Steg 5: Uppdatera checkGameOver() för trash (⏱️ 5 min)

**Mål:** Endast TRASH ska räknas för win condition, inte obstacles eller powerups!

Hitta din `checkGameOver()` och uppdatera win-checken:

```javascript
checkGameOver() {
  // Lose: tiden slut
  if (this.timeLeft <= 0) {
    this.gameStatus = 'lost';
    clearInterval(this.gameInterval);
    alert(`⏰ TIDEN ÄR UTE! Score: ${this.score}`);
    return;
  }

  // Win: allt SKRÄP är samlat (ignorera hinder och power-ups!)
  const trashLeft = this.items.filter(item => item.type === 'trash').length;

  if (trashLeft === 0) {
    this.gameStatus = 'won';
    clearInterval(this.gameInterval);
    alert(`🎉 DU VANN! Score: ${this.score} | Tid kvar: ${this.timeLeft}s`);
    return;
  }
}
```

**Förstå koden:**

- `filter(item => item.type === 'trash')` = bara trash-items
- `.length` = antal trash kvar
- Om 0 trash kvar = vinst! (även om obstacles och powerups finns kvar)

**Testa nu:**

1. Spawna med lite items: `game.spawnItems(2, 1, 1)`
2. Samla de 2 trash-bitarna
3. Du ska vinna även om obstacles och powerups finns kvar!

**✅ Checkpoint:** Du kan vinna utan att samla powerups eller ta bort obstacles.

---

### Steg 6: UI - Rendera olika item-typer (⏱️ 10 min)

### Steg 6: UI - Rendera olika item-typer (⏱️ 10 min)

**Mål:** Visa olika emojis för olika item-typer.

Uppdatera din `renderItems()` funktion i `app.js`:

```javascript
function renderItems() {
  // Ta bort gamla items
  itemElements.forEach((el) => el.remove());
  itemElements = [];

  // Skapa nya items
  game.items.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "item";

    // NYTT: Olika emojis baserat på typ
    if (item.type === "trash") {
      itemEl.textContent = "🗑️";
    } else if (item.type === "obstacle") {
      itemEl.textContent = "🧱";
      itemEl.classList.add("obstacle"); // Extra klass för styling
    } else if (item.type === "powerup") {
      itemEl.textContent = "⚡";
      itemEl.classList.add("powerup"); // Extra klass för styling
    }

    itemEl.style.left = item.x * 10 + "%";
    itemEl.style.top = (9 - item.y) * 10 + "%";
    grid.appendChild(itemEl);
    itemElements.push(itemEl);
  });
}
```

**Förstå koden:**

- Vi kollar `item.type` med if/else
- Varje typ får sitt eget emoji
- Vi lägger till extra klasser för CSS-styling (valfritt)

**BONUS: CSS för olika items (valfritt men snyggt!):**

Lägg till i din `<style>` sektion i index.html:

```css
.item.obstacle {
  filter: brightness(0.7); /* Mörkare */
}

.item.powerup {
  animation: pulse 1s infinite; /* Pulserar */
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
```

**Testa nu:**

1. Starta spelet
2. Du ska se:
   - 🗑️ för trash
   - 🧱 för obstacles
   - ⚡ för powerups (kanske pulserar om du la till CSS!)

**✅ Checkpoint:** Alla item-typer har olika utseende!

---

## ✅ TESTNING (⏱️ 5 min)

    itemEl.style.left = item.x * 10 + "%";
    itemEl.style.top = (9 - item.y) * 10 + "%";
    grid.appendChild(itemEl);
    itemElements.push(itemEl);

});
}

````

---

## ✅ TESTNING (⏱️ 5 min)

**Nu är det dags att testa allt tillsammans!**

### Test 1: Olika item-typer spawnar

- Klicka "Starta Spel"
- Räkna items: 5 skräp (🗑️), 3 hinder (🧱), 2 power-ups (⚡)
- Alla ska ha olika positioner

### Test 2: Skräp samlas korrekt

- Navigera till ett 🗑️
- Det ska försvinna
- Score ska öka med 10

### Test 3: Power-up ger extra tid

- Navigera till en ⚡
- Den ska försvinna
- Tid ska öka med 5 sekunder
- Kolla timer-displayen!

### Test 4: Hinder blockerar

- Försök gå TILL ett 🧱
- Du ska INTE kunna gå dit
- Console ska säga "Hinder i vägen!"

### Test 5: Vinn genom att samla trash

- Samla alla 5 🗑️-items
- Powerups och obstacles får finnas kvar
- Du ska vinna!

### Test 6: Förlora om tiden tar slut

- Starta nytt spel
- Vänta utan att samla
- Efter 30 sek: "TIDEN ÄR UTE!"

**✅ Checklista:**

- [ ] 5 skräp, 3 hinder, 2 power-ups spawnar
- [ ] Olika items har olika emojis (🗑️, 🧱, ⚡)
- [ ] Spelaren kan inte gå igenom hinder
- [ ] Skräp försvinner och ger +10p när det samlas
- [ ] Power-ups försvinner och ger +5s när de samlas
- [ ] Hinder förblir kvar hela spelet
- [ ] Spelaren vinner när allt SKRÄP är samlat (obstacles kvar = OK)
- [ ] Timern ökar när power-up samlas

**🎉 Grattis! Om alla checkboxar är bockade är du klar med Nivå 6!**

**DU HAR NU ETT KOMPLETT SPEL! 🎮**

---

## 💡 Tips och Tricks

### Visa counter för varje typ (BONUS)

Lägg till i HTML:

```html
<div>Skräp kvar: <span id="trash-left">5</span></div>
<div>Hinder: <span id="obstacles">3</span></div>
<div>Power-ups: <span id="powerups">2</span></div>
````

Uppdatera i `updateUI()`:

```javascript
const trash = game.items.filter((i) => i.type === "trash").length;
const obstacles = game.items.filter((i) => i.type === "obstacle").length;
const powerups = game.items.filter((i) => i.type === "powerup").length;

document.getElementById("trash-left").textContent = trash;
document.getElementById("obstacles").textContent = obstacles;
document.getElementById("powerups").textContent = powerups;
```

### Debug item-typer

Logga när olika saker händer:

```javascript
collectItem(index) {
  const item = this.items[index];
  console.log(`📦 Samlade item typ: ${item.type} på (${item.x}, ${item.y})`);
  // ...
}
```

---

## 🤔 Vanliga problem och lösningar

### Problem: "Spelaren kan gå igenom hinder"

**Lösning:** Kolla att du använder `.some()` FÖRE du flyttar spelaren, inte efter. Ordningen i `moveForward()` är viktigt:

1. Beräkna nextX, nextY
2. Kolla obstacle
3. Om OK, flytta
4. Kolla collision

### Problem: "Win condition triggas för tidigt"

**Lösning:** Se till att endast räkna `type === 'trash'` i win-checken:

```javascript
const trashLeft = this.items.filter((item) => item.type === "trash").length;
```

### Problem: "Items spawnar på samma plats"

**Lösning:** Använd `do...while` loop och `isPositionFree()` funktionen i `spawnItems()`. Se Steg 2.

### Problem: "checkCollision() hittar inte items"

**Lösning:** Uppdatera anropet till `collectItem()` istället för `collectTrash()` i `checkCollision()`.

### Problem: "Obstacles försvinner när jag kör in i dem"

**Lösning:** I `collectItem()`, se till att `case 'obstacle':` INTE har `splice()`. Endast break.

---

## 📊 Specifikation

| Feature            | Värde                      |
| ------------------ | -------------------------- |
| Spelplan           | 10x10 rutnät               |
| Skräpbitar         | 5 (måste samlas för vinst) |
| Hinder             | 3 (blockerar rörelse)      |
| Power-ups          | 2 (+5 sekunder vardera)    |
| Tid                | 30 sekunder (start)        |
| Poäng per skräpbit | 10                         |
| Max score          | 50                         |

---

## 🎓 När du är klar

Testa spelet grundligt och se till att:

1. Alla tre item-typerna fungerar korrekt
2. Hinder blockerar rörelse
3. Power-ups ger extra tid
4. Win/lose conditions fungerar
5. UI visar olika emojis för olika typer

**Grattis!** Du har nu skapat ett komplett spel med collision detection, game loop, timer OCH olika spelmekaniker! 🎉

**NÄSTA STEG:** Du kan nu fortsätta med mer avancerade features som levels, highscore, localStorage, etc!

---

## 💪 Aha-moment

Efter denna nivå har du lärt dig:

- ✅ **Polymorfism** - samma collision system hanterar olika item-typer
- ✅ **Switch-satser** - hantera olika logik för olika typer
- ✅ **Proaktiv koll** - förhindra rörelse INNAN den sker (hinder-check)
- ✅ **Array-filtrering** - räkna specifika typer med `filter()`
- ✅ **Komplett spelmekanik** - nu är det ett riktigt, varierat spel!
- ✅ **Do-while loops** - perfekt för slumpmässig placering
- ✅ **Conditional logic** - olika beteenden baserat på data

---

## 🏆 Extra utmaningar (om du har tid över!)

Vill du fortsätta utveckla spelet? Prova dessa:

### Lätt (30 min):

- **Ljudeffekter:** Lägg till ljud när items samlas (Web Audio API)
- **Score multiplikator:** Dubblera poäng om du samlar 3 items i rad snabbt
- **Visuella effekter:** Lägg till CSS animations när items försvinner

### Medel (1 tim):

- **Olika obstacle-typer:** Väggar vs. stenar (olika utseende)
- **Speedup power-up:** En power-up som låter dig röra dig snabbare
- **Enemy robots:** Obstacles som rör sig!

**Ha kul och fortsätt koda!** 🚀

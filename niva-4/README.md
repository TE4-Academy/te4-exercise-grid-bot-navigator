# Nivå 4: Collision Detection

**Tid:** Ca 90 minuter (1.5 timmar)  
**Svårighetsgrad:** ⭐⭐ Medel  
**Förkunskaper:** Grid-Bot Navigator (Nivå 1-3) slutförd OCH Lektion 2 genomgången

---

## ⏱️ Tidsplanering (viktig!)

| Steg       | Aktivitet                 | Tid    | Klar vid |
| ---------- | ------------------------- | ------ | -------- |
| **Steg 1** | Kopiera kod och sätt upp  | 10 min | XX:10    |
| **Steg 2** | Implementera spawnItems() | 25 min | XX:35    |
| **Steg 3** | Collision detection       | 20 min | XX:55    |
| **Steg 4** | Uppdatera moveForward()   | 10 min | XX:65    |
| **Steg 5** | UI och rendering          | 15 min | XX:80    |
| **Test**   | Testning och buggfix      | 10 min | XX:90    |

**💡 Tips:** Fyll i "Klar vid" med faktiska klockslag när du börjar. T.ex. om du börjar 13:00, skriv 13:10, 13:35, etc.

---

## 🎯 Mål

Lär dig collision detection genom att skapa ett enkelt samlarpel:

- Dammsugare som samlar skräp
- Slumpmässigt utplacerade items
- Poängsystem
- Win condition när allt skräp är samlat

Efter denna nivå ska du kunna:

- Utöka state med game-specifika egenskaper (items, score)
- Implementera collision detection
- Spawna slumpmässiga items
- Hantera win condition

---

## 📝 Uppgift

Du ska bygga ett samlarpel där:

1. En dammsugare (🧹) rör sig i ett rutnät (kod från Nivå 1)
2. 5 skräpbitar (🗑️) är slumpmässigt utplacerade
3. Spelaren får 10 poäng för varje skräpbit som samlas
4. Spelaren vinner när allt skräp är uppsamlat

**INGEN TIMER ÄNNU!** Detta fokuserar bara på collision detection.

---

## 🏗️ Struktur

### Filer du ska arbeta i:

- `game.js` - All spellogik och state
- `index.html` - HTML-struktur
- `app.js` - Koppling mellan game.js och UI

---

## 🚀 Kom igång

**⚠️ VIKTIGT:** Du har redan gjort mycket av detta i lektionen! Använd din "lektion-demo" som referens.

### Steg 1: Kopiera och sätt upp (⏱️ 10 min)

**Vad du ska göra:**

1. Skapa en ny mapp `niva-2-1` (eller använd den befintliga om du börjar från template)
2. Kopiera din kod från "lektion-demo" ELLER från Nivå 1
3. Se till att du har tre filer: `index.html`, `game.js`, `app.js`
4. Öppna `index.html` i webbläsare och kolla att din robot fungerar

**✅ Checkpoint:** Din robot ska kunna röra sig i rutnätet innan du går vidare.

---

### Steg 2: Implementera spawnItems() (⏱️ 25 min)

Kopiera din robot-kod från Nivå 1, men döp om objektet till `game` och lägg till:

```javascript
const game = {
  // Player state (från Nivå 1)
  player: {
    x: 0,
    y: 0,
    direction: "NORTH",
  },

  // Game state (NYTT!)
  score: 0,

  // World state (NYTT!)
  items: [],

  // Metoder från Nivå 1
  moveForward() {
    /* din kod */
  },
  turnRight() {
    /* din kod */
  },
  turnLeft() {
    /* din kod */
  },
};
```

### Steg 2: Implementera spawnItems() (⏱️ 25 min)

**Mål:** Skapa en funktion som spawnar 5 slumpmässiga skräpbitar på olika platser.

#### DEL 1: Grundläggande spawn (10 min)

I din `game.js`, lägg till denna funktion INUTI game-objektet:

```javascript
spawnItems(count) {
  this.items = [];

  for (let i = 0; i < count; i++) {
    // Skapa en slumpmässig position
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    // Se till att inte spawna på spelarens position
    if (x === this.player.x && y === this.player.y) {
      i--; // Försök igen
      continue;
    }

    this.items.push({ x, y, type: 'trash' });
  }
}
```

```javascript
spawnItems(count) {
  this.items = [];

  for (let i = 0; i < count; i++) {
    // Skapa en slumpmässig position
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    // Se till att inte spawna på spelarens position
    if (x === this.player.x && y === this.player.y) {
      i--; // Försök igen
      continue;
    }

    this.items.push({ x, y, type: 'trash' });
  }
}
```

**Testa nu:**

- Öppna Console (F12)
- Skriv: `game.spawnItems(5)`
- Skriv: `game.items` - du ska se 5 items!

**✅ Checkpoint:** Du ska ha 5 items i arrayen innan du går vidare.

#### DEL 2: Förbättra - undvik duplicates (15 min)

Problem: Items kan spawna på SAMMA plats! Låt oss fixa det.

**Uppdatera din spawnItems():**

```javascript
spawnItems(count) {
  this.items = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    // Kolla om positionen redan används av spelare
    if (x === this.player.x && y === this.player.y) {
      i--; // Försök igen
      continue;
    }

    // NYTT: Kolla om positionen redan används av annat item
    const positionTaken = this.items.some(item =>
      item.x === x && item.y === y
    );

    if (positionTaken) {
      i--; // Försök igen
      continue;
    }

    this.items.push({ x, y, type: 'trash' });
  }
}
```

**Förstå koden:**

- `some()` kollar om NÅGOT item i arrayen matchar villkoret
- Om positionen är tagen, kör vi `i--` för att försöka igen
- `continue` hoppar till nästa iteration i loopen

**Testa igen:**

- `game.spawnItems(5)`
- `game.items` - kolla alla x,y - INGA duplicates!

**✅ Checkpoint:** Alla items ska ha unika positioner.

**🆘 Fastnat?**

- "Får error 'some is not a function'"? → Kolla att `this.items` är en array
- "Items spawnar fortfarande på samma plats"? → Kolla att du har `positionTaken` checken

---

### Steg 3: Implementera collision detection (⏱️ 20 min)

**Mål:** Kolla om spelaren kör in i ett item och hantera det.

**⚠️ DU HAR REDAN GJORT DETTA I LEKTIONEN!** Kopiera från din lektion-demo om du vill.

#### DEL 1: checkCollision() (10 min)

Lägg till denna funktion i game-objektet:

```javascript
checkCollision() {
  // Loopa igenom alla items
  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];

    // Är spelaren på samma position som ett item?
    if (this.player.x === item.x && this.player.y === item.y) {
      console.log('💥 Kollision på position:', item.x, item.y);
      // Samla upp skräpet!
      this.collectTrash(i);
      return true;
    }
  }
  return false;
}
```

**Förstå koden:**

- Vi loopar genom ALLA items
- För varje item kollar vi: samma x OCH samma y som spelaren?
- Om JA: anropa `collectTrash()` och returnera true
- Om NEJ (efter hela loopen): returnera false

#### DEL 2: collectTrash() (10 min)

Lägg till denna funktion i game-objektet:

```javascript
collectTrash(index) {
  console.log('🗑️ Samlade skräp! Index:', index);

  // Öka poäng
  this.score += 10;

  // Ta bort itemet från världen
  this.items.splice(index, 1);

  console.log('💰 Nytt score:', this.score);
  console.log('📊 Items kvar:', this.items.length);

  // Kolla om spelaren vunnit
  if (this.items.length === 0) {
    alert('🎉 GRATTIS! Du samlade allt skräp! Score: ' + this.score);
  }
}
```

**Förstå koden:**

- `splice(index, 1)` = ta bort 1 element på position `index`
- Vi ökar score med 10
- Vi kollar om items.length är 0 (alla samlade) = vinst!

**Testa nu (i Console):**

```javascript
game.spawnItems(5); // Spawna items
game.player.x = game.items[0].x; // Flytta spelaren till första itemet
game.player.y = game.items[0].y;
game.checkCollision(); // Ska säga "💥 Kollision!"
```

**✅ Checkpoint:** Kollision ska detekteras och itemet ska försvinna från arrayen.

**🆘 Fastnat?**

- "Alert visas flera gånger"? → Kolla att du kallar `checkCollision()` bara EN gång per move
- "Items försvinner inte"? → Kolla att du använder `splice(index, 1)`, inte `splice(i, 1)`

---

### Steg 4: Uppdatera moveForward() (⏱️ 10 min)

### Steg 4: Uppdatera moveForward() (⏱️ 10 min)

**Mål:** Kolla efter kollision varje gång spelaren flyttas.

**⚠️ DU HAR REDAN GJORT DETTA I LEKTIONEN!**

Hitta din `moveForward()` funktion och se till att den AVSLUTAS med:

```javascript
moveForward() {
  // 1. Flytta spelaren (din kod från Nivå 1)
  if (this.player.direction === 'NORTH' && this.player.y < 9) {
    this.player.y++;
  } else if (this.player.direction === 'EAST' && this.player.x < 9) {
    this.player.x++;
  } else if (this.player.direction === 'SOUTH' && this.player.y > 0) {
    this.player.y--;
  } else if (this.player.direction === 'WEST' && this.player.x > 0) {
    this.player.x--;
  }

  // 2. VIKTIGT: Kolla efter kollision EFTER flytten!
  this.checkCollision();
}
```

**Varför efter?** Vi måste FÖRST flytta spelaren, SEDAN kolla om den nya positionen har ett item.

**✅ Checkpoint:** När du rör dig i spelet ska items samlas automatiskt.

---

### Steg 5: UI och rendering (⏱️ 15 min)

**Mål:** Visa items på skärmen och uppdatera score.

### Steg 5: UI och rendering (⏱️ 15 min)

**Mål:** Visa items på skärmen och uppdatera score.

#### DEL 1: Lägg till HTML för score (3 min)

I din `index.html`, lägg till (eller kolla att du har):

```html
<!-- Score Display -->
<div class="bg-gray-800 p-4 rounded-lg text-center">
  <div class="text-sm text-gray-400">Poäng</div>
  <div id="score-display" class="text-3xl font-bold text-green-400">0</div>
</div>

<!-- Items Left -->
<div class="bg-gray-800 p-4 rounded-lg text-center">
  <div class="text-sm text-gray-400">Skräp kvar</div>
  <div id="items-display" class="text-3xl font-bold text-yellow-400">5</div>
</div>
```

#### DEL 2: renderItems() funktion (7 min)

I din `app.js`, lägg till:

```javascript
let itemElements = []; // Lägg till högst upp i filen

function renderItems() {
  // Ta bort gamla items från DOM
  itemElements.forEach((el) => el.remove());
  itemElements = [];

  // Skapa nya items
  game.items.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "item";
    itemEl.textContent = "🗑️";
    itemEl.style.left = item.x * 10 + "%";
    itemEl.style.top = (9 - item.y) * 10 + "%";
    grid.appendChild(itemEl);
    itemElements.push(itemEl);
  });
}
```

**Förstå koden:**

- Vi skapar ett DOM-element för varje item
- `left` och `top` positionerar dem (procent av grid-storleken)
- `(9 - item.y)` = flip y-axeln (0 är botten, 9 är toppen)

#### DEL 3: Uppdatera updateUI() (5 min)

Lägg till i din `updateUI()` funktion:

```javascript
function updateUI() {
  // ... befintlig kod för spelaren ...

  // NYTT: Uppdatera score och items
  const scoreDisplay = document.getElementById("score-display");
  const itemsDisplay = document.getElementById("items-display");

  if (scoreDisplay) scoreDisplay.textContent = game.score;
  if (itemsDisplay) itemsDisplay.textContent = game.items.length;

  // Rita om items
  renderItems();
}
```

**✅ Checkpoint:** När du kör `game.spawnItems(5)` och `updateUI()` ska du SE skräpbitarna på skärmen!

**🆘 Fastnat?**

- "Items syns inte"? → Kolla att du har CSS för `.item` (position: absolute)
- "Items på fel plats"? → Kolla formeln: `(9 - item.y) * 10 + "%"`

---

## ✅ TESTNING (⏱️ 10 min)

**Nu är det dags att testa allt tillsammans!**

### Test 1: Spawna items

```javascript
game.spawnItems(5);
updateUI();
```

- Du ska se 5 skräpbitar på olika platser
- Inga duplicates
- Inget på spelarens startposition (0,0)

### Test 2: Samla items

- Navigera till ett skräp
- Det ska försvinna automatiskt
- Score ska öka till 10
- Items kvar ska minska till 4

### Test 3: Vinn spelet

- Samla alla 5 skräpbitar
- Du ska se alert: "GRATTIS! Score: 50"

### Test 4: Starta om

- Reload sidan
- Kör `game.spawnItems(5)` och `updateUI()` igen
- Spela en gång till!

**✅ Checklista:**

- [ ] 5 skräpbitar spawnar på slumpmässiga positioner
- [ ] Skräpbitarna syns på rätt platser i gridet
- [ ] Spelaren kan röra sig och samla skräp
- [ ] Score ökar med 10 per skräpbit
- [ ] Items försvinner när de samlas
- [ ] "Items kvar" counter minskar
- [ ] Spelet visar "GRATTIS" när allt skräp är samlat
- [ ] Ingen skräpbit spawnar på spelarens startposition
- [ ] Inga duplicerade positioner

**🎉 Grattis! Om alla checkboxar är bockade är du klar med Nivå 2-1!**

---

## 🤔 Vanliga problem och lösningar

Lägg till logik som kollar om positionen redan är tagen (se tips ovan).

### "Kollision detekteras inte"

Kolla att du anropar `checkCollision()` EFTER att spelaren flyttats i `moveForward()`.

### "Items syns inte"

Kontrollera att du:

1. Har CSS för `.item` med `position: absolute`
2. Anropar `renderItems()` när sidan laddas
3. Anropar `renderItems()` efter varje UI-uppdatering

### "Alert() visas flera gånger"

Se till att du använder `splice()` för att ta bort itemet INNAN du kollar om listan är tom.

---

## 📊 Specifikation

| Feature            | Värde                   |
| ------------------ | ----------------------- |
| Spelplan           | 10x10 rutnät            |
| Antal skräpbitar   | 5                       |
| Poäng per skräpbit | 10                      |
| Max score          | 50                      |
| Timer              | Ingen (kommer i Nivå 5) |

---

## 🎓 När du är klar

Testa spelet grundligt och se till att:

1. Alla skräpbitar kan samlas
2. Score uppdateras korrekt
3. Win-meddelandet visas när allt är samlat
4. UI uppdateras smidigt

När allt fungerar är du redo för **Nivå 5** där vi lägger till timer och game loop!

---

## 💪 Aha-moment

Efter denna nivå har du lärt dig:

- ✅ **Collision detection** - upptäcka när två objekt är på samma position
- ✅ **Slumpmässig placering** - använda `Math.random()` för att skapa variation
- ✅ **State management** - hantera både spelaren OCH items i samma objekt
- ✅ **Array manipulation** - lägga till och ta bort items dynamiskt

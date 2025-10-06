# Nivå 2: Visualisering – Robotens Kropp

**Tid:** Ca 2 timmar  
**Svårighetsgrad:** ⭐⭐ Medel

---

## 🎯 Mål

Koppla din robot-logik från Nivå 1 till ett visuellt gränssnitt. Nu får roboten en "kropp" så du kan se den röra sig!

Efter denna nivå ska du kunna:
- Skapa ett rutnät med HTML och Tailwind CSS
- Manipulera DOM-element baserat på JavaScript state
- Koppla knappar till logik-funktioner
- Synkronisera UI med state genom en `updateUI()`-funktion

---

## 📝 Uppgift

Du ska bygga ett visuellt gränssnitt där:
1. Ett 10x10 rutnät visas på skärmen
2. En robot-ikon (🤖) visas på rätt position
3. Knappar låter användaren styra roboten
4. Roboten uppdateras visuellt efter varje kommando

---

## 🏗️ Struktur

### Filer du ska arbeta i:
- `index.html` - HTML-strukturen och rutnätet
- `app.js` - Kopplar logik till UI
- `robot.js` - Din logik från Nivå 1 (kopiera över!)

---

## 🚀 Kom igång

### Steg 1: Skapa rutnätet (HTML + Tailwind)

Öppna `index.html` och skapa:
- En container med CSS Grid (10x10)
- 100 celler (en för varje ruta i rutnätet)
- En robot-div som placeras i rätt cell

**Tips:** Använd Tailwind-klasserna:
- `grid grid-cols-10` för rutnätet
- `border border-gray-300` för cellerna
- `absolute` eller CSS Grid-positionering för roboten

### Steg 2: Placera roboten

Roboten ska visas i cellen som motsvarar `(robot.x, robot.y)`.

**CSS Grid-trick:**
```css
/* Exempel för att placera i cell (2, 3) */
grid-column-start: 3;  /* x + 1, eftersom CSS Grid är 1-baserat */
grid-row-start: 4;     /* y + 1 */
```

### Steg 3: Rotera roboten

Använd CSS `transform: rotate()` för att visa vilken riktning roboten tittar:
- NORTH: 0deg
- EAST: 90deg
- SOUTH: 180deg
- WEST: 270deg

### Steg 4: Skapa knappar

Lägg till tre knappar:
- "Gå Framåt" → anropar `robot.moveForward()`
- "Sväng Höger" → anropar `robot.turnRight()`
- "Sväng Vänster" → anropar `robot.turnLeft()`

### Steg 5: updateUI()-funktionen

Skapa en funktion som:
1. Läser av `robot.x`, `robot.y` och `robot.direction`
2. Uppdaterar robotens position i rutnätet
3. Uppdaterar robotens rotation

**Viktigt:** Anropa `updateUI()` efter varje kommando!

---

## 💡 Tips

### Skapa celler dynamiskt

Istället för att skriva 100 `<div>`-element manuellt, använd JavaScript:

```javascript
const grid = document.getElementById('grid');
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.className = 'border border-gray-300 w-12 h-12';
  grid.appendChild(cell);
}
```

### Koordinatsystem

Tänk på hur ditt koordinatsystem fungerar:
- (0, 0) är längst ner till vänster? Eller uppe till vänster?
- Du kan behöva "vända" y-axeln i din `updateUI()` funktion

### Debug med console.log

Logga robotens state efter varje uppdatering:

```javascript
function updateUI() {
  console.log('🤖 Uppdaterar UI:', robot.x, robot.y, robot.direction);
  // ... din kod här
}
```

### Smooth transitions

Lägg till `transition-all duration-300` på robot-elementet för mjuka animationer!

---

## 🎨 Design-tips

### Grundläggande styling:
- Rutnät: ljus bakgrund med tydliga gränser
- Robot: använd emoji 🤖 eller en färgad cirkel
- Knappar: stora och tydliga, olika färger för olika actions

### Förbättringar (frivilligt):
- Visa aktuella koordinater i ett textfält
- Lägg till en "Reset"-knapp
- Visa robotens riktning med en pil istället för rotation
- Highlighta den cell roboten står på

---

## ✅ Klart?

När du kan:
- ✅ Se roboten röra sig när du klickar på knapparna
- ✅ Roboten stannar inom rutnätets gränser (0-9 för både x och y)
- ✅ Rotationen matchar riktningen

...då är du redo för **Nivå 3** där roboten tar emot kommandon via ett API!

---

## 🤔 Vanliga problem

### "Roboten försvinner"
Kontrollera att x och y är inom 0-9. Du kan behöva lägga till gränskontroll i `moveForward()`.

### "Rotationen funkar inte"
Kolla att du konverterar riktning till grader korrekt. Använd ett objekt som "uppslagstabell":
```javascript
const rotations = {
  'NORTH': 0,
  'EAST': 90,
  'SOUTH': 180,
  'WEST': 270
};
```

### "Rutnätet ser konstigt ut"
Kontrollera att alla celler har samma storlek (`w-12 h-12`) och att grid har rätt antal kolumner (`grid-cols-10`).

---

## 📚 Läs mer

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

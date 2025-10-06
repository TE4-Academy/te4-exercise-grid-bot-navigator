# Nivå 1: Kärnlogiken – Robotens Hjärna

**Tid:** Ca 1 timme  
**Svårighetsgrad:** ⭐ Grundläggande

---

## 🎯 Mål

Skapa ett fungerande robot-objekt **utan** något gränssnitt. Fokus ligger 100% på logik och state management.

Efter denna nivå ska du kunna:
- Skapa ett JavaScript-objekt som håller state (robotens minnesdata)
- Implementera metoder som ändrar state baserat på logiska regler
- Testa och felsöka din kod med hjälp av `console.log`

---

## 📝 Uppgift

Du ska skapa ett `robot`-objekt i filen `robot.js` med följande specifikation:

### State (Egenskaper)

Roboten måste komma ihåg:
- `x`: Horisontal position (startvärde: `0`)
- `y`: Vertikal position (startvärde: `0`)
- `direction`: Riktning roboten tittar åt (startvärde: `'NORTH'`)

Möjliga värden för `direction`: `'NORTH'`, `'EAST'`, `'SOUTH'`, `'WEST'`

### Actions (Metoder)

Roboten måste kunna:

#### `moveForward()`
Flyttar roboten **ett steg** i den riktning den för närvarande tittar åt.

**Logik:**
- Om `direction` är `'NORTH'`: öka `y` med 1
- Om `direction` är `'EAST'`: öka `x` med 1
- Om `direction` är `'SOUTH'`: minska `y` med 1
- Om `direction` är `'WEST'`: minska `x` med 1

#### `turnRight()`
Roterar roboten 90 grader **medurs**.

**Logik:**
- `'NORTH'` → `'EAST'`
- `'EAST'` → `'SOUTH'`
- `'SOUTH'` → `'WEST'`
- `'WEST'` → `'NORTH'`

#### `turnLeft()`
Roterar roboten 90 grader **moturs**.

**Logik:**
- `'NORTH'` → `'WEST'`
- `'WEST'` → `'SOUTH'`
- `'SOUTH'` → `'EAST'`
- `'EAST'` → `'NORTH'`

#### `getPosition()` (Bonus)
Returnerar en sträng som beskriver robotens nuvarande state.

**Exempel:** `"Jag är på x:2, y:3 och tittar åt EAST"`

---

## 🚀 Kom igång

1. Öppna filen `robot.js`
2. Fyll i logiken för varje metod
3. Testa din kod genom att öppna `test.html` i webbläsaren
4. Kolla konsolen (F12 → Console) för att se resultaten

---

## 🧪 Testning

Öppna `test.html` i webbläsaren. I konsolen bör du se:

```
Test 1: Robot börjar på (0, 0) tittar NORTH ✅
Test 2: Efter moveForward() är roboten på (0, 1) ✅
Test 3: Efter turnRight() tittar roboten EAST ✅
Test 4: Efter moveForward() är roboten på (1, 1) ✅
```

Om du ser ❌ istället för ✅, läs felmeddelandet och rätta till din kod.

---

## 💡 Tips

### Tänk innan du kodar
Rita gärna ett koordinatsystem på ett papper. Var ligger (0,0)? Åt vilket håll ökar x och y?

### Använd console.log
Lägg till `console.log` i dina metoder för att se vad som händer:

```javascript
moveForward() {
  console.log('Innan:', this.x, this.y, this.direction);
  // Din logik här...
  console.log('Efter:', this.x, this.y, this.direction);
}
```

### Switch vs If/Else
Både `if/else` och `switch`-satser funkar. Välj det du tycker är tydligast:

```javascript
// Alternativ 1: If/Else
if (this.direction === 'NORTH') {
  this.y++;
} else if (this.direction === 'EAST') {
  this.x++;
}
// ...etc

// Alternativ 2: Switch
switch (this.direction) {
  case 'NORTH':
    this.y++;
    break;
  case 'EAST':
    this.x++;
    break;
  // ...etc
}
```

### Testa en metod i taget
Skriv inte all kod på en gång. Implementera t.ex. bara `moveForward()` först, testa den, och gå sedan vidare till nästa metod.

---

## ✅ Klart?

När alla tester är gröna ✅ är du redo för **Nivå 2** där du bygger ett visuellt gränssnitt för din robot!

---

## 🤔 Vanliga problem

### "this is undefined"
Glöm inte att använda `this.x` istället för bara `x` när du refererar till objektets egenskaper.

### "Roboten rör sig inte"
Kolla att du **ändrar** värdet (t.ex. `this.y++`) och inte bara läser det.

### "turnRight() funkar inte"
Tänk på att det är en **cyklisk** rotation: efter `'WEST'` kommer `'NORTH'` igen.

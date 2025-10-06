// app.js

// Vår "hjärna" (state)
const lightSwitch = {
  isOn: false
};

// Hämta våra HTML-element ("kroppsdelar")
const lightbulbElement = document.getElementById('lightbulb');
const toggleButton = document.getElementById('toggle-button');

// Denna funktion läser av state och uppdaterar gränssnittet
function updateUI() {
  console.log('📺 Uppdaterar UI baserat på state:', lightSwitch.isOn);
  
  if (lightSwitch.isOn) {
    lightbulbElement.classList.remove('bg-gray-500');
    lightbulbElement.classList.add('bg-yellow-300');
  } else {
    lightbulbElement.classList.remove('bg-yellow-300');
    lightbulbElement.classList.add('bg-gray-500');
  }
}

// Lyssna på klick på vår knapp
toggleButton.addEventListener('click', () => {
  // Steg 1: Kör vår logik för att ändra state
  lightSwitch.isOn = !lightSwitch.isOn;
  console.log(`🧠 Logik körd. Lyset är nu: ${lightSwitch.isOn ? 'PÅ' : 'AV'}`);

  // Steg 2: Uppdatera gränssnittet så det matchar det nya state
  updateUI();
});

// Se till att UI:t stämmer från start
updateUI();

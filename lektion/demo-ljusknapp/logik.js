const lightSwitch = {
  isOn: false,
};

function toggle() {
  lightSwitch.isOn = !lightSwitch.isOn;
  console.log(`Lampan är nu ${lightSwitch.isOn ? "PÅ" : "AV"}`);
}

const shortDescriptions: any = {
  "reduction in capacitor recharge time": "Capacitor Recharge Time",
  "penalty to armor resistances": "Armor Resistances",
  "bonus to shield hitpoints": "Shield HP",
  "bonus to Energy Nosferatu and Neutralizer drain amount":
    "Energy Nosferatu and Neutralizer Amount",
  "increase in ship signature radius": "Signature Radius",
  "bonus to missile velocity": "Missile Velocity",
  "penalty to ship agility": "Ship Inertia",
  "penalty to stasis webifier strength": "Stasis Webifier Strength",
  "bonus to ship velocity": "Ship Velocity",
  "bonus to maximum targeting range": "Targeting Range",
  "bonus to missile explosion velocity": "Missile Explosion Velocity",
  "penalty to capacitor recharge time": "Capacitor Recharge Time",
  "penalty to remote capacitor transmitter effectiveness":
    "Remote Capacitor Transmitter Amount",
  "penalty to local armor repairer and shield booster effectiveness":
    "Local Repair Amount",
  "bonus to remote armor repairer and remote shield booster effectiveness":
    "Remote Repair Amount",
  "bonus to capacitor capacity": "Capacitor Capacity",
  "penalty to turret and drone tracking speed": "Turret and Drone Tracking",
  "penalty to missile explosion radius": "Missile Explosion Radius",
  "penalty to target painter effectiveness": "Target Painter Effectiveness",
  "penalty to maximum targeting range": "Targeting Range",
  "bonus to turret, missile, and drone damage":
    "Turret, Missile and Drone Damage",
  "increased heat damage from overloading modules": "Heat Damage",
  "bonus to the benefits of overloading modules": "Overload Bonus",
  "bonus to smartbomb damage and range": "Smartbomb Damage and Range",
  "bonus to bomb damage": "Bomb Damage",
  "reduction in ship signature radius": "Signature Radius",
  "penalty to shield resistances": "Shield Resistances",
  "bonus to armor hitpoints": "Armor HP",
  "bonus to small weapon damage": "Small Weapon Damage",
};

const getEffectDescription = (longDescription: string) => {
  let short = "";

  if (Object.keys(shortDescriptions).includes(longDescription)) {
    short = shortDescriptions[longDescription];
  }

  if (!short) {
    throw new Error("Wormhole effect short description not found.");
  }

  const long = longDescription[0].toUpperCase() + longDescription.slice(1);

  return {
    long,
    short,
  };
};

export default getEffectDescription;

const negativeStrengthDescriptions = [
  "reduction in capacitor recharge time",
  "penalty to armor resistances",
  "penalty to stasis webifier strength",
  "penalty to remote capacitor transmitter effectiveness",
  "penalty to local armor repairer and shield booster effectiveness",
  "penalty to turret and drone tracking speed",
  "penalty to target painter effectiveness",
  "penalty to maximum targeting range",
  "reduction in ship signature radius",
  "penalty to shield resistances",
];

const getSignedStrength = (strength: number, description: string) => {
  if (negativeStrengthDescriptions.includes(description)) {
    return strength * -1;
  }

  return strength;
};

export default getSignedStrength;

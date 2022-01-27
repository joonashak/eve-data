import systems, { findOneSystem } from "../src/main";

test("Number of systems", () => {
  expect(systems.length).toBe(8035);
});

test("Find by name", () => {
  expect(findOneSystem({ name: "Jita" })).toEqual({
    effect: null,
    id: 30000142,
    name: "Jita",
    secondaryName: null,
    region: {
      id: 10000002,
      name: "The Forge",
    },
    constellation: {
      id: 20000020,
      name: "Kimotoro",
    },
    securityClass: "HIGH",
    securityStatus: 0.9459131166648389,
    whClass: null,
    staticConnections: [],
  });
});

test("Find by ID", () => {
  expect(findOneSystem({ id: 31002338 })).toEqual({
    name: "J210519",
    secondaryName: null,
    id: 31002338,
    securityStatus: -0.99,
    securityClass: "WH",
    effect: {
      id: "30853",
      name: "Black Hole",
      whClass: 5,
      traits: [
        {
          strength: 43,
          isPositive: true,
          description: {
            long: "Bonus to missile velocity",
            short: "Missile Velocity",
          },
        },
        {
          strength: 43,
          isPositive: false,
          description: {
            long: "Penalty to ship agility",
            short: "Ship Inertia",
          },
        },
        {
          strength: -43,
          isPositive: false,
          description: {
            long: "Penalty to stasis webifier strength",
            short: "Stasis Webifier Strength",
          },
        },
        {
          strength: 86,
          isPositive: true,
          description: {
            long: "Bonus to ship velocity",
            short: "Ship Velocity",
          },
        },
        {
          strength: 86,
          isPositive: true,
          description: {
            long: "Bonus to maximum targeting range",
            short: "Targeting Range",
          },
        },
        {
          strength: 86,
          isPositive: true,
          description: {
            long: "Bonus to missile explosion velocity",
            short: "Missile Explosion Velocity",
          },
        },
      ],
    },
    region: {
      id: 11000029,
      name: "E-R00029",
    },
    constellation: {
      id: 21000293,
      name: "E-C00293",
    },
    whClass: 5,
    staticConnections: ["E175"],
  });
});

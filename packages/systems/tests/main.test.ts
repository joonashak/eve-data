import systems, { findOneSystem } from "../src/main";

test("Number of systems", () => {
  expect(systems.length).toBe(8035);
});

test("Find by name", () => {
  expect(findOneSystem({ name: "Jita" })).toEqual({
    effectId: null,
    id: 30000142,
    name: "Jita",
    regionId: 10000002,
    securityClass: "HIGH",
    securityStatus: 0.9459131166648389,
    whClass: null,
  });
});

test("Find by ID", () => {
  expect(findOneSystem({ id: 31002338 })).toEqual({
    effectId: 30853,
    id: 31002338,
    name: "J210519",
    regionId: 11000029,
    securityClass: "WH",
    securityStatus: -0.99,
    whClass: 5,
  });
});

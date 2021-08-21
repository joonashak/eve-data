import { getSystems } from "../src/main";

const systems = getSystems();

test("Number of systems", () => {
  expect(systems.length).toBe(8035);
});

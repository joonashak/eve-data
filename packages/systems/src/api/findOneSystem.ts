import { XOR } from "ts-xor";
import systems from "../../assets/systems.json";
import { System } from "./system.type";

/**
 * Find a system by name or ESI ID. `Error` is thrown upon no match.
 * @param {object} search - Search object containing the key to search by
 * (`name` or `id`) and the search string as the corresponding value. Exactly
 * one search property must be provided. Example: `{ name: "Jita" }`
 * @returns {System} Star system data.
 */
export default (search: XOR<{ name: string }, { id: number }>): System => {
  const keys = Object.keys(search);
  if (keys.length !== 1) {
    throw new Error("Search object must contain exactly one property.");
  }

  const searchKey = keys[0];
  if (!["name", "id"].includes(searchKey)) {
    throw new Error("Invalid search key.");
  }

  const searchValue = Object.values(search)[0];
  const match = systems.find((system) => system[searchKey] === searchValue);
  if (!match) {
    throw new Error("System not found.");
  }

  return match;
};

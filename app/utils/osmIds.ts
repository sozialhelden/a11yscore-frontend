import Hashids from "hashids";

const alphabet = "abcdefghjkmnopqrstuvwxyz0123456789";

/**
 * Encodes an OSM ID into a short hash string
 * @param osmId
 */
export function encodeOsmId(osmId: number): string {
  const salt = osmId < 0 ? "r" : "w";
  const hashids = new Hashids(salt, 0, alphabet);
  return salt + hashids.encode(Math.abs(osmId));
}

/**
 * Decodes a short hash string back into an OSM ID
 * @param hash
 */
export function decodeOsmIdHash(hash: string): number {
  const cleanedHash = hash.slice(1);
  const salt = hash.charAt(0);
  const signFactor = salt === "r" ? -1 : 1;
  const hashids = new Hashids(salt, 0, alphabet);
  return Number(hashids.decode(cleanedHash)[0]) * signFactor;
}

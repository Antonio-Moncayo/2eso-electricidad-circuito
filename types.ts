/**
 * Represents a 2D point with x and y coordinates.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Represents an electron in the circuit.
 */
export interface Electron {
  id: number;
  x: number;
  y: number;
  pathIndex: number; // The index of the circuit path vertex it is moving towards.
}

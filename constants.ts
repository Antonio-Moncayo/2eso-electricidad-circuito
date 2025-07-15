import { Point } from './types';

// Canvas dimensions
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 400;

// Circuit path coordinates
export const CIRCUIT_PATH: Point[] = [
    { x: 100, y: 100 },
    { x: 500, y: 100 },
    { x: 500, y: 300 },
    { x: 100, y: 300 },
];

// Battery position (on the left vertical wire)
export const BATTERY_POSITION: Point = { x: 100, y: 200 };

// Bulb position (on the bottom horizontal wire)
export const BULB_POSITION: Point = { x: 300, y: 300 };
export const BULB_RADIUS = 25;

// Switch position (on the top horizontal wire)
export const SWITCH_START: Point = { x: 275, y: 100 };
export const SWITCH_END: Point = { x: 325, y: 100 };

// Electron properties
export const ELECTRON_RADIUS = 5;
export const ELECTRON_SPEED = 4; // pixels per frame
export const ELECTRON_SPAWN_INTERVAL = 300; // milliseconds
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

// Switch position (on the top horizontal wire)
export const SWITCH_POSITION: Point = { x: 300, y: 100 };
export const SWITCH_GAP = 40; // The size of the gap in the wire for the switch

// Battery position (on the left vertical wire)
export const BATTERY_POSITION: Point = { x: 100, y: 200 };
export const BATTERY_WIDTH = 30;
export const BATTERY_HEIGHT = 70;


// Bulb position (on the bottom horizontal wire)
export const BULB_POSITION: Point = { x: 300, y: 300 };
export const BULB_RADIUS = 30; // Increased radius for a rounder look
export const BULB_BASE_WIDTH = 25;
export const BULB_BASE_HEIGHT = 15;


// Electron properties
export const ELECTRON_RADIUS = 5;
export const ELECTRON_SPEED = 4; // pixels per frame
export const ELECTRON_SPAWN_INTERVAL = 300; // milliseconds
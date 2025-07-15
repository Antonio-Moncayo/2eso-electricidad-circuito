import { useState, useEffect, useRef, useCallback } from 'react';
import { Electron } from '../types';
import { CIRCUIT_PATH, ELECTRON_SPAWN_INTERVAL, ELECTRON_SPEED, BULB_POSITION, BULB_RADIUS } from '../constants';

export const useCircuitAnimation = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isBulbOn, setIsBulbOn] = useState(false);
    const [electrons, setElectrons] = useState<Electron[]>([]);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const lastElectronSpawnTime = useRef(0);
    const nextElectronId = useRef(0);

    const toggleSwitch = useCallback(() => {
        setIsSwitchOn(prev => {
            const newSwitchState = !prev;
            if (!newSwitchState) {
                // When turning off, clear electrons and turn off bulb
                setElectrons([]);
                setIsBulbOn(false);
                lastElectronSpawnTime.current = 0;
            }
            return newSwitchState;
        });
    }, []);

    const animate = useCallback(() => {
        const now = Date.now();
        
        setElectrons(prevElectrons => {
            let updatedElectrons = [...prevElectrons];
            let bulbShouldBeOn = false;

            // Spawn new electrons periodically
            if (now - lastElectronSpawnTime.current > ELECTRON_SPAWN_INTERVAL) {
                lastElectronSpawnTime.current = now;
                const newElectron: Electron = {
                    id: nextElectronId.current++,
                    x: CIRCUIT_PATH[0].x,
                    y: CIRCUIT_PATH[0].y,
                    pathIndex: 1
                };
                updatedElectrons.push(newElectron);
            }

            // Move existing electrons and filter out those that completed the circuit
            updatedElectrons = updatedElectrons.map(electron => {
                let targetPoint = CIRCUIT_PATH[electron.pathIndex % CIRCUIT_PATH.length];
                let nextPathIndex = (electron.pathIndex + 1);

                const dx = targetPoint.x - electron.x;
                const dy = targetPoint.y - electron.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < ELECTRON_SPEED) {
                    // Reached a corner, update target to the next one
                    electron.x = targetPoint.x;
                    electron.y = targetPoint.y;
                    electron.pathIndex = nextPathIndex % CIRCUIT_PATH.length;
                } else {
                    // Move towards the target point
                    electron.x += (dx / distance) * ELECTRON_SPEED;
                    electron.y += (dy / distance) * ELECTRON_SPEED;
                }
                
                // Check if any electron is near the bulb
                const distToBulb = Math.sqrt(Math.pow(electron.x - BULB_POSITION.x, 2) + Math.pow(electron.y - BULB_POSITION.y, 2));
                if (distToBulb < BULB_RADIUS + 10) {
                    bulbShouldBeOn = true;
                }

                return electron;
            }).filter(e => !(e.pathIndex === 0 && e.x === CIRCUIT_PATH[0].x && e.y === CIRCUIT_PATH[0].y)); // Remove if it completed the full loop

            setIsBulbOn(bulbShouldBeOn);
            return updatedElectrons;
        });

        animationFrameId.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        if (isSwitchOn) {
            lastElectronSpawnTime.current = Date.now();
            animationFrameId.current = requestAnimationFrame(animate);
        } else {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        }
        
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isSwitchOn, animate]);

    return { isSwitchOn, isBulbOn, electrons, toggleSwitch, canvasRef };
};
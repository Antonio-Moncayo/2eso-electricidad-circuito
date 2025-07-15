import React, { forwardRef, useEffect } from 'react';
import { Electron } from '../types';
import { 
    CIRCUIT_PATH, 
    BATTERY_POSITION,
    BATTERY_WIDTH,
    BATTERY_HEIGHT,
    BULB_POSITION, 
    BULB_RADIUS, 
    ELECTRON_RADIUS,
    SWITCH_POSITION,
    SWITCH_GAP,
    BULB_BASE_WIDTH,
    BULB_BASE_HEIGHT
} from '../constants';

interface CircuitCanvasProps {
    width: number;
    height: number;
    isSwitchOn: boolean;
    isBulbOn: boolean;
    electrons: Electron[];
}

export const CircuitCanvas = forwardRef<HTMLCanvasElement, CircuitCanvasProps>(({ width, height, isSwitchOn, isBulbOn, electrons }, ref) => {
    
    useEffect(() => {
        const canvas = (ref as React.RefObject<HTMLCanvasElement>)?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas with 'Cartón Reciclado' color
        ctx.fillStyle = '#F5EFE0';
        ctx.fillRect(0, 0, width, height);
        ctx.lineCap = 'round';
        ctx.textAlign = 'start'; // Reset alignment

        // 1. Draw Wires with 'Azul Pizarra'
        ctx.strokeStyle = '#2A3B49';
        ctx.lineWidth = 6;
        ctx.beginPath();
        // Top wire with gap for switch
        ctx.moveTo(CIRCUIT_PATH[0].x, CIRCUIT_PATH[0].y);
        ctx.lineTo(SWITCH_POSITION.x - SWITCH_GAP / 2, SWITCH_POSITION.y);
        ctx.moveTo(SWITCH_POSITION.x + SWITCH_GAP / 2, SWITCH_POSITION.y);
        ctx.lineTo(CIRCUIT_PATH[1].x, CIRCUIT_PATH[1].y);
        // Right vertical wire
        ctx.lineTo(CIRCUIT_PATH[2].x, CIRCUIT_PATH[2].y);
        // Bottom wire with gap for bulb
        ctx.lineTo(BULB_POSITION.x + BULB_BASE_WIDTH / 2, CIRCUIT_PATH[2].y);
        ctx.moveTo(BULB_POSITION.x - BULB_BASE_WIDTH / 2, CIRCUIT_PATH[3].y);
        ctx.lineTo(CIRCUIT_PATH[3].x, CIRCUIT_PATH[3].y);
        // Left wire with gap for battery
        ctx.lineTo(CIRCUIT_PATH[3].x, BATTERY_POSITION.y + BATTERY_HEIGHT / 2);
        ctx.moveTo(CIRCUIT_PATH[0].x, BATTERY_POSITION.y - BATTERY_HEIGHT / 2);
        ctx.lineTo(CIRCUIT_PATH[0].x, CIRCUIT_PATH[0].y);
        ctx.stroke();

        // 2. Draw Switch
        const switchLeft = { x: SWITCH_POSITION.x - SWITCH_GAP / 2, y: SWITCH_POSITION.y };
        const switchRight = { x: SWITCH_POSITION.x + SWITCH_GAP / 2, y: SWITCH_POSITION.y };
        // Terminals
        ctx.fillStyle = '#2A3B49';
        ctx.beginPath();
        ctx.arc(switchLeft.x, switchLeft.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(switchRight.x, switchRight.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        // Lever
        ctx.beginPath();
        ctx.moveTo(switchLeft.x, switchLeft.y);
        ctx.lineWidth = 5;
        if (isSwitchOn) {
            ctx.strokeStyle = '#2A3B49'; // 'Azul Pizarra' for closed switch
            ctx.lineTo(switchRight.x, switchRight.y);
        } else {
            ctx.strokeStyle = '#D9534F'; // 'Rojo Tinta de Sello' for open switch
            ctx.lineTo(switchLeft.x + (SWITCH_GAP * 0.8), switchLeft.y - (SWITCH_GAP * 0.8));
        }
        ctx.stroke();
        // Label
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('Interruptor', SWITCH_POSITION.x, SWITCH_POSITION.y - 35);


        // 3. Draw Battery (AA-style)
        const terminalHeight = 8;
        // Main Body
        ctx.fillStyle = '#C0C0C0'; // Silver
        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(BATTERY_POSITION.x - BATTERY_WIDTH / 2, BATTERY_POSITION.y - BATTERY_HEIGHT / 2, BATTERY_WIDTH, BATTERY_HEIGHT, 5);
        ctx.fill();
        ctx.stroke();
        // Positive Terminal Nub
        ctx.fillStyle = '#A0A0A0';
        ctx.beginPath();
        ctx.rect(BATTERY_POSITION.x - BATTERY_WIDTH / 4, BATTERY_POSITION.y - BATTERY_HEIGHT / 2 - terminalHeight, BATTERY_WIDTH / 2, terminalHeight);
        ctx.fill();
        ctx.stroke();
        // Labels
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('+', BATTERY_POSITION.x, BATTERY_POSITION.y - BATTERY_HEIGHT / 2 + 20);
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('−', BATTERY_POSITION.x, BATTERY_POSITION.y + BATTERY_HEIGHT / 2 - 5);
        // Battery Label
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'left';
        ctx.fillText('Pila', BATTERY_POSITION.x + BATTERY_WIDTH / 2 + 10, BATTERY_POSITION.y + 6);


        // 4. Draw Bulb
        const bulbBaseY = BULB_POSITION.y;
        const bulbCenterX = BULB_POSITION.x;
        const bulbCenterY = bulbBaseY - BULB_BASE_HEIGHT - (BULB_RADIUS * 0.6);
        ctx.lineWidth = 2;

        // Base
        ctx.fillStyle = '#6B7280'; // Gray
        ctx.beginPath();
        ctx.rect(bulbCenterX - BULB_BASE_WIDTH / 2, bulbBaseY - BULB_BASE_HEIGHT, BULB_BASE_WIDTH, BULB_BASE_HEIGHT);
        ctx.fill();
        // Base threads
        ctx.strokeStyle = '#9CA3AF';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 3; i++) {
            const y = bulbBaseY - BULB_BASE_HEIGHT + 3 + (i * 4);
            ctx.beginPath();
            ctx.moveTo(bulbCenterX - BULB_BASE_WIDTH / 2, y);
            ctx.lineTo(bulbCenterX + BULB_BASE_WIDTH / 2, y);
            ctx.stroke();
        }

        // Glass
        ctx.beginPath();
        ctx.arc(bulbCenterX, bulbCenterY, BULB_RADIUS, Math.PI * 0.8, Math.PI * 2.2);
        ctx.closePath();

        // Filament
        const filamentY = bulbCenterY + 5;
        const filamentWidth = BULB_RADIUS * 0.4;
        const postHeight = BULB_RADIUS * 0.5;

        const filamentPath = new Path2D();
        // Posts
        filamentPath.moveTo(bulbCenterX - filamentWidth / 2, bulbBaseY - BULB_BASE_HEIGHT);
        filamentPath.lineTo(bulbCenterX - filamentWidth / 2, filamentY - postHeight / 2);
        filamentPath.moveTo(bulbCenterX + filamentWidth / 2, bulbBaseY - BULB_BASE_HEIGHT);
        filamentPath.lineTo(bulbCenterX + filamentWidth / 2, filamentY - postHeight / 2);
        // Filament wire
        filamentPath.moveTo(bulbCenterX - filamentWidth / 2, filamentY - postHeight / 2);
        filamentPath.lineTo(bulbCenterX + filamentWidth / 2, filamentY - postHeight / 2);
        
        if (isBulbOn) {
            // Glowing Glass
            ctx.shadowBlur = 35;
            ctx.shadowColor = '#FBBF24'; // Strong yellow glow
            ctx.fillStyle = 'rgba(253, 224, 71, 0.6)'; // More opaque yellow fill
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)'; // More opaque border
            ctx.stroke();
            
            // Glowing Filament
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 3.5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#FFFFFF';
            ctx.stroke(filamentPath);
            ctx.shadowBlur = 0;

        } else {
            // Off Glass
            ctx.fillStyle = 'rgba(169, 169, 169, 0.2)';
            ctx.fill();
            ctx.strokeStyle = '#808080';
            ctx.stroke();

            // Off Filament
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 1.5;
            ctx.stroke(filamentPath);
        }
        
        // Bulb Label
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('Bombilla', bulbCenterX, bulbBaseY + 25);
        ctx.textAlign = 'start';

        // 5. Draw Electrons with 'Rojo Tinta de Sello'
        electrons.forEach(electron => {
            ctx.beginPath();
            ctx.arc(electron.x, electron.y, ELECTRON_RADIUS, 0, 2 * Math.PI);
            ctx.fillStyle = '#D9534F'; 
            // Electron glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#D9534F';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

    }, [isSwitchOn, isBulbOn, electrons, width, height, ref]);

    return <canvas ref={ref} width={width} height={height} className="rounded-lg border-2 border-[#2A3B49]" />;
});
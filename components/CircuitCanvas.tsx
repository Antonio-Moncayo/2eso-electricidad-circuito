import React, { forwardRef, useEffect } from 'react';
import { Electron } from '../types';
import { 
    CIRCUIT_PATH, 
    BATTERY_POSITION, 
    BULB_POSITION, 
    ELECTRON_RADIUS,
    SWITCH_START,
    SWITCH_END
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

        const drawWires = () => {
            ctx.strokeStyle = '#2A3B49'; // Azul Pizarra
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';

            // Draw wire segments, leaving a gap for the switch
            ctx.beginPath();
            ctx.moveTo(SWITCH_END.x, SWITCH_END.y);
            ctx.lineTo(CIRCUIT_PATH[1].x, CIRCUIT_PATH[1].y);
            ctx.lineTo(CIRCUIT_PATH[2].x, CIRCUIT_PATH[2].y);
            ctx.lineTo(CIRCUIT_PATH[3].x, CIRCUIT_PATH[3].y);
            ctx.lineTo(CIRCUIT_PATH[0].x, CIRCUIT_PATH[0].y);
            ctx.lineTo(SWITCH_START.x, SWITCH_START.y);
            ctx.stroke();
        };

        const drawSwitch = () => {
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#2A3B49'; // Azul Pizarra
            ctx.lineCap = 'round';
            
            // Connection points
            const pointRadius = 5;
            ctx.fillStyle = '#2A3B49';
            ctx.beginPath();
            ctx.arc(SWITCH_START.x, SWITCH_START.y, pointRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(SWITCH_END.x, SWITCH_END.y, pointRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Lever
            ctx.beginPath();
            ctx.moveTo(SWITCH_START.x, SWITCH_START.y);

            if (isSwitchOn) {
                ctx.lineTo(SWITCH_END.x, SWITCH_END.y);
            } else {
                const leverLength = (SWITCH_END.x - SWITCH_START.x) * 1.1;
                const angle = -Math.PI / 3;
                ctx.lineTo(
                    SWITCH_START.x + leverLength * Math.cos(angle),
                    SWITCH_START.y + leverLength * Math.sin(angle)
                );
            }
            ctx.stroke();
        };

        const drawBattery = () => {
            const batteryWidth = 40;
            const batteryHeight = 80;
            const batteryX = BATTERY_POSITION.x - batteryWidth / 2;
            const batteryY = BATTERY_POSITION.y - batteryHeight / 2;
            const capHeight = 8;
            const capWidth = 20;

            // Body
            const gradient = ctx.createLinearGradient(batteryX, batteryY, batteryX + batteryWidth, batteryY);
            gradient.addColorStop(0, '#3c5265'); // Lighter Azul Pizarra
            gradient.addColorStop(0.5, '#2A3B49'); // Azul Pizarra
            gradient.addColorStop(1, '#1d2a34'); // Darker Azul Pizarra
            ctx.fillStyle = gradient;
            ctx.strokeStyle = '#1d2a34'; // Darkest Azul Pizarra
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, [8]);
            ctx.fill();
            ctx.stroke();

            // Positive Cap
            ctx.fillStyle = '#3c5265'; // Lighter Azul Pizarra
            ctx.strokeStyle = '#1d2a34';
            ctx.beginPath();
            ctx.roundRect(BATTERY_POSITION.x - capWidth / 2, batteryY - capHeight + 2, capWidth, capHeight, [3]);
            ctx.fill();
            ctx.stroke();

            // Markings
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Positive sign
            ctx.font = 'bold 22px sans-serif';
            ctx.fillStyle = '#D9534F'; // Rojo Tinta de Sello
            ctx.fillText('+', BATTERY_POSITION.x, batteryY + 20);
            
            // Negative sign
            ctx.font = 'bold 32px sans-serif';
            ctx.fillStyle = '#F5EFE0'; // Cartón Reciclado
            ctx.fillText('−', BATTERY_POSITION.x, batteryY + batteryHeight - 20);
        };
        
        const drawBulb = () => {
            const bulbCenterX = BULB_POSITION.x;
            const baseTopY = BULB_POSITION.y - 10;
            const baseWidth = 24;
            const baseHeight = 18;
            const bulbHeight = 55;
            const bulbWidth = 45;

            // Base
            ctx.fillStyle = '#2A3B49'; // Azul Pizarra
            ctx.fillRect(bulbCenterX - baseWidth / 2, baseTopY, baseWidth, baseHeight);
            
            // Threads
            ctx.strokeStyle = '#3c5265'; // Lighter Azul Pizarra
            ctx.lineWidth = 2;
            for (let i = 0; i < 4; i++) {
                const y = baseTopY + 4 + i * 4;
                ctx.beginPath();
                ctx.moveTo(bulbCenterX - baseWidth / 2, y);
                ctx.lineTo(bulbCenterX + baseWidth / 2, y);
                ctx.stroke();
            }

            // Glass (pear shape)
            ctx.beginPath();
            ctx.moveTo(bulbCenterX - baseWidth / 2, baseTopY); // Start at left of base
            // Curve up to the top
            ctx.quadraticCurveTo(
                bulbCenterX - bulbWidth / 1.5, baseTopY - bulbHeight, // control point (wide part)
                bulbCenterX, baseTopY - bulbHeight // top point
            );
            // Curve down from the top
            ctx.quadraticCurveTo(
                bulbCenterX + bulbWidth / 1.5, baseTopY - bulbHeight, // control point (wide part)
                bulbCenterX + baseWidth / 2, baseTopY // end at right of base
            );
            ctx.closePath();

            ctx.lineWidth = 2.5;
            if (isBulbOn) {
                ctx.fillStyle = 'rgba(255, 238, 88, 0.3)';
                ctx.strokeStyle = 'rgba(255, 238, 88, 0.7)';
                ctx.shadowBlur = 40;
                ctx.shadowColor = '#FFEE58';
            } else {
                ctx.fillStyle = 'rgba(42, 59, 73, 0.1)';
                ctx.strokeStyle = 'rgba(42, 59, 73, 0.4)';
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Filament
            const filamentTopY = baseTopY - bulbHeight * 0.5;
            const filamentBottomY = baseTopY - 2;
            
            ctx.beginPath();
            ctx.moveTo(bulbCenterX - 8, filamentBottomY);
            ctx.lineTo(bulbCenterX - 5, filamentTopY);
            ctx.moveTo(bulbCenterX + 8, filamentBottomY);
            ctx.lineTo(bulbCenterX + 5, filamentTopY);
            ctx.moveTo(bulbCenterX - 5, filamentTopY);
            ctx.quadraticCurveTo(bulbCenterX, filamentTopY - 12, bulbCenterX + 5, filamentTopY);

            if (isBulbOn) {
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#FFFFFF';
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#FFFFFF';
            } else {
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#333333';
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const drawElectrons = () => {
             electrons.forEach(electron => {
                ctx.beginPath();
                ctx.arc(electron.x, electron.y, ELECTRON_RADIUS, 0, 2 * Math.PI);
                ctx.fillStyle = '#D9534F'; // Rojo Tinta de Sello
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(217, 83, 79, 0.7)';
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        };

        const drawLabels = () => {
            ctx.font = 'bold 16px "Courier New", monospace';
            ctx.fillStyle = '#2A3B49'; // Azul Pizarra
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
    
            // Pila label
            ctx.fillText('Pila', BATTERY_POSITION.x + 45, BATTERY_POSITION.y);
    
            // Interruptor label
            ctx.fillText('Interruptor', (SWITCH_START.x + SWITCH_END.x) / 2, SWITCH_START.y - 25);
    
            // Bombilla label
            ctx.fillText('Bombilla', BULB_POSITION.x, BULB_POSITION.y + 45);
        };

        // Main Drawing sequence
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#FDF6E3'; // Papel Envejecido
        ctx.fillRect(0, 0, width, height);

        drawWires();
        drawBattery();
        drawBulb();
        drawSwitch();
        drawLabels();
        
        if(isSwitchOn) {
            drawElectrons();
        }

    }, [isSwitchOn, isBulbOn, electrons, width, height, ref]);

    return <canvas ref={ref} width={width} height={height} className="rounded-lg border-2 border-[#2A3B49]/30" />;
});
import React from 'react';
import { CircuitCanvas } from './components/CircuitCanvas';
import { useCircuitAnimation } from './hooks/useCircuitAnimation';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

const App: React.FC = () => {
    const { 
        isSwitchOn, 
        isBulbOn, 
        electrons, 
        toggleSwitch,
        canvasRef 
    } = useCircuitAnimation();

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#2A3B49]">Simulador de Circuito Interactivo</h1>
                <p className="text-lg text-[#333333] mt-2">Una herramienta educativa para visualizar el flujo de electricidad.</p>
            </div>

            <div className="relative shadow-2xl shadow-[#2A3B49]/20 rounded-lg">
                <CircuitCanvas 
                    ref={canvasRef}
                    width={CANVAS_WIDTH} 
                    height={CANVAS_HEIGHT}
                    isSwitchOn={isSwitchOn}
                    isBulbOn={isBulbOn}
                    electrons={electrons}
                />
            </div>
            
            <div className="mt-8 flex flex-col items-center space-y-6">
                <button
                    onClick={toggleSwitch}
                    style={{
                        backgroundColor: isSwitchOn ? '#2A3B49' : '#D9534F',
                        color: '#FDF6E3',
                        boxShadow: `0 4px 14px 0 ${isSwitchOn ? 'rgba(42, 59, 73, 0.5)' : 'rgba(217, 83, 79, 0.5)'}`
                    }}
                    className={`px-8 py-3 w-64 text-xl font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105`}
                >
                    {isSwitchOn ? 'Interruptor: ENCENDIDO' : 'Interruptor: APAGADO'}
                </button>
                <div className="text-center p-6 bg-[#F5EFE0] rounded-lg max-w-xl shadow-md">
                    <h3 className="text-lg font-semibold text-[#2A3B49]">Cómo Usar</h3>
                    <p className="text-[#333333] mt-1">
                        Haz clic en el interruptor para iniciar o detener el flujo de electrones. ¡Observa cómo se enciende la bombilla cuando el circuito está completo!
                    </p>
                    <p className="text-xs text-[#333333] opacity-75 mt-3">
                        Para grabar esta animación para una presentación (p. ej., en Canva), usa un software de grabación de pantalla como OBS Studio o QuickTime. Luego puedes exportar la grabación como video o GIF.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default App;
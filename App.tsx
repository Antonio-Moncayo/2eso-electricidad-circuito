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
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#FDF6E3] text-[#333333] font-sans">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#2A3B49]">Simulación Interactiva de Circuito</h1>
                <p className="text-lg text-[#333333] opacity-90 mt-2">Una herramienta educativa para visualizar el flujo de electricidad.</p>
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
                    className={`px-8 py-3 w-52 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                        isSwitchOn 
                        ? 'bg-[#2A3B49] hover:bg-[#22303b] shadow-[#2A3B49]/50' 
                        : 'bg-[#D9534F] hover:bg-[#c94a46] shadow-[#D9534F]/50'
                    }`}
                >
                    {isSwitchOn ? 'Interruptor: ON' : 'Interruptor: OFF'}
                </button>
                <div className="text-center p-4 bg-[#F5EFE0] rounded-lg max-w-xl border border-[#2A3B49]/20">
                    <h3 className="text-lg font-semibold text-[#2A3B49]">Cómo Usar</h3>
                    <p className="text-[#333333] mt-1">
                        Haz clic en el interruptor para iniciar o detener el flujo de electrones. ¡Observa cómo se enciende la bombilla cuando el circuito está completo!
                    </p>
                    <p className="text-xs text-[#333333] opacity-70 mt-3">
                        Para grabar esta animación para una presentación (p. ej., en Canva), usa un software de grabación de pantalla como OBS Studio o QuickTime. Luego puedes exportar la grabación como video o GIF.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default App;
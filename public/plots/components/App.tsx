import React, { useState, useRef, useEffect } from 'react';

const ipcRenderer = window.require('electron').ipcRenderer;

export const App: React.FC = () => {

    const [points, setPoints] = useState<number[]>([]);
    const ref = useRef<HTMLCanvasElement>()

    useEffect(() => {
        if (!ref.current && points.length !== 0)
            return;

        const probability = points.map(_ => _ / 10000);
        const canvas = ref.current;
        const context = ref.current.getContext('2d');
        context.beginPath();
        const delta = canvas.width / points.length;
        for (let i = 0, x = canvas.width / points.length; i < probability.length - 1; i++, x += delta) {
            context.lineTo(x, canvas.height * (1 - probability[i]));
            context.moveTo(x, canvas.height * (1 - probability[i]));
        }
        context.stroke();
        return (): void => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [points, ref.current]);

    return (
        <div>
            <div>
                <button onClick={
                    (): void => ipcRenderer.invoke('plotOrf').then((data: number[]) => setPoints(data))}>
                    Generate
            </button>
            </div>
            <canvas ref={ref} width={600} height={400}></canvas>
        </div>
    );
}

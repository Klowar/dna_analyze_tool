import React, { useState } from 'react';

const ipcRenderer = window.require('electron').ipcRenderer;

export const App: React.FC = () => {

    const [points, setPoints] = useState<number[]>([]);

    return (
        <div>
            <button onClick={
                (): void => ipcRenderer.invoke('plotOrf').then((data: number[]) => setPoints(data))}>
                Generate
            </button>
            <ul>
                {points.map(_ => <li key={_}>{_}</li>)}
            </ul>
        </div>
    );
}

import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ipcRenderer = window.require('electron').ipcRenderer;

type GeneratorProps = {
    update?: (data: any) => void; // eslint-disable-line
}

export const Generator: React.FC<GeneratorProps> = ({ update }) => {
    const [length, setLength] = useState<number>();
    const [percentage, setPercentage] = useState<number>();

    return (
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                padding: '1.5%'
            }
        }>
            <input
                type="number"
                onChange={(e): void => setLength(Number(e.target.value))}
                value={length}
                placeholder="Orf length" />
            <input
                type="number"
                onChange={(e): void => setPercentage(Number(e.target.value))}
                value={percentage}
                placeholder="GC percentage" />
            <button onClick={(): void => {
                ipcRenderer.invoke('generateOrf', length, percentage)
                    .then((result: string) => {
                        if (update) update(result);
                    });
            }}>
                Generate
            </button>
        </div>
    )
}

Generator.propTypes = {
    update: PropTypes.func
};

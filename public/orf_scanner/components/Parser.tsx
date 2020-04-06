import React, { useState } from 'react'
import PropTypes from 'prop-types';

const ipcRenderer = window.require('electron').ipcRenderer;

type ParserProps = {
    orf: string;
}

export const Parser: React.FC<ParserProps> = ({ orf }) => {

    const [scann, setScann] = useState<string[]>([]);

    const onClick = (): void => {
        ipcRenderer.invoke('parseOrf', orf)
            .then((result: string[]) => setScann(result));
    };

    return (
        <div style={
            {
                display: 'flex',
                flexDirection: 'row'
            }
        }>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }>
                <h4>Generated orf:</h4>
                <p>{orf}</p>
                <button onClick={onClick}>Scann</button>
            </div>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }>
                {scann.map(_ => (<p key={_}>{_}</p>))}
            </div>
        </div>
    )
}

Parser.propTypes = {
    orf: PropTypes.string
}

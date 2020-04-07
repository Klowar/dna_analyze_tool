import React, { useState } from 'react'
import PropTypes from 'prop-types';

const ipcRenderer = window.require('electron').ipcRenderer;

type ParserProps = {
    orf: string;
}

const MINIMAL_ORF_SIZE = 10;

export const Parser: React.FC<ParserProps> = ({ orf }) => {

    const [scann, setScann] = useState<string[]>([]);

    const onClick = (): void => {
        ipcRenderer.invoke('parseOrf', orf, MINIMAL_ORF_SIZE)
            .then((result: string[]) => setScann(result));
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                }
            }>
                <h4>Generated orf:</h4>
                <p style={{ overflowWrap: 'break-word' }}>{orf}</p>
                <button style={{ maxWidth: '100px' }} onClick={onClick}>Scann</button>
            </div>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                }
            }>
                {scann && <p>Found orfs:</p>}
                {scann.map(_ => (<p style={{ overflowWrap: 'break-word' }} key={_}>{_}</p>))}
            </div>
        </div>
    )
}

Parser.propTypes = {
    orf: PropTypes.string
}

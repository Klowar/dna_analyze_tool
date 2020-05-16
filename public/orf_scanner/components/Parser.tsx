import React, { useState } from 'react'
import PropTypes from 'prop-types';

const ipcRenderer = window.require('electron').ipcRenderer;

type ParserProps = {
    orf: string;
}

const MINIMAL_ORF_SIZE = 10;
const pairedTag = (s: string): string => {
    switch (s) {
        case "A":
            return "T";
        case "C":
            return "G";
        case "T":
            return "A";
        case "G":
            return "C";
    }
}

const reverse = (str: string): string => {
    const arr = [...str];
    const revArr = arr.reverse();

    return revArr.map(_ => pairedTag(_)).join("");
}

export const Parser: React.FC<ParserProps> = ({ orf }) => {

    const revOrf = reverse(orf);
    const [scann, setScann] = useState<[string[], string[]]>([[], []]);

    const onClick = (): void => {
        ipcRenderer.invoke('parseOrf', orf, MINIMAL_ORF_SIZE)
            .then((result: [string[], string[]]) => setScann(result));
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
                {scann[0] && <p>Forward</p>}
                {
                    scann[0].map(_ => {
                        const start = orf.indexOf(_);
                        return <div key={_}>
                            <p style={{ overflowWrap: 'break-word' }}>{_}</p>
                            <p>{`${start} - ${start + _.length}`}</p>
                        </div>;
                    })
                }
                {scann[1] && <p>Backward</p>}
                {
                    scann[1].map(_ => {
                        const start = revOrf.indexOf(_);
                        return <div key={_}>
                            <p style={{ overflowWrap: 'break-word' }}>{_}</p>
                            <p>{`${start} - ${start + _.length}`}</p>
                        </div>;
                    })
                }
            </div>
        </div>
    )
}

Parser.propTypes = {
    orf: PropTypes.string
}

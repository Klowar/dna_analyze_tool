import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ipcRenderer } from '../../shared';

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

const pairedProtein = (str: string): string => {
    switch (str) {

        case "TTT": return "Phe";
        case "TTC": return "Phe";
        case "TTA": return "Leu";
        case "TTG": return "Leu";
        case "TCT": return "Ser";
        case "TCC": return "Ser";
        case "TCA": return "Ser";
        case "TCG": return "Ser";
        case "TAT": return "Tyr";
        case "TAC": return "Tyr";
        case "TAA": return "";
        case "TAG": return "";
        case "TGT": return "Cys";
        case "TGC": return "Cys";
        case "TGA": return "";
        case "TGG": return "";

        case "CTT": return "Leu";
        case "CTC": return "Leu";
        case "CTA": return "Leu";
        case "CTG": return "Leu";
        case "CCT": return "Pro";
        case "CCC": return "Pro";
        case "CCA": return "Pro";
        case "CCG": return "Pro";
        case "CAT": return "His";
        case "CAC": return "His";
        case "CAA": return "Gln";
        case "CAG": return "Gln";
        case "CGT": return "Arg";
        case "CGC": return "Arg";
        case "CGA": return "Arg";
        case "CGG": return "Arg";

        case "ATT": return "Ile";
        case "ATC": return "Ile";
        case "ATA": return "Ile";
        case "ATG": return "Met";
        case "ACT": return "Thr";
        case "ACC": return "Thr";
        case "ACA": return "Thr";
        case "ACG": return "Thr";
        case "AAT": return "Asn";
        case "AAC": return "Asn";
        case "AAA": return "Lys";
        case "AAG": return "Lys";
        case "AGT": return "Ser";
        case "AGC": return "Ser";
        case "AGA": return "Arg";
        case "AGG": return "Arg";

        case "GTT": return "Val";
        case "GTC": return "Val";
        case "GTA": return "Val";
        case "GTG": return "Val";
        case "GCT": return "Ala";
        case "GCC": return "Ala";
        case "GCA": return "Ala";
        case "GCG": return "Ala";
        case "GAT": return "Asp";
        case "GAC": return "Asp";
        case "GAA": return "Glu";
        case "GAG": return "Glu";
        case "GGT": return "Gly";
        case "GGC": return "Gly";
        case "GGA": return "Gly";
        case "GGG": return "Gly";
        default:
            return "";
    }
}

const toProteint = (orf: string[]) => {
    return orf.map(_ => pairedProtein(_));
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
                        const tempOrf = _.match(/.{1,3}/g)
                        return <div key={_}>
                            <p style={{ overflowWrap: 'break-word' }}>{tempOrf.join(" ")}</p>
                            <p>{_.length} length</p>
                            <p>{`${start} - ${start + _.length}`}</p>
                            <p>{toProteint(tempOrf).join("")}</p>
                        </div>;
                    })
                }
                {scann[1] && <p>Backward</p>}
                {
                    scann[1].map(_ => {
                        const start = revOrf.indexOf(_);
                        const tempOrf = _.match(/.{1,3}/g)
                        return <div key={_}>
                            <p style={{ overflowWrap: 'break-word' }}>{tempOrf.join(" ")}</p>
                            <p>{_.length} length</p>
                            <p>{`${start} - ${start + _.length}`}</p>
                            <p>{toProteint(tempOrf).join("")}</p>
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

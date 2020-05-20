import React, { useState } from 'react';
import { ipcRenderer, Link } from '../../shared';


export const App: React.FC = () => {

    const [testString, setTestString] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const onClick = (): void => {
        (ipcRenderer.invoke('checkNewKick', testString) as Promise<string[]>)
            .then((result: string[]) => setErrors(result));
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to={'welcome'}> back </Link>
            <textarea
                onChange={(e): void => setTestString(e.target.value)}
                placeholder="testString length" />
            <button style={{ maxWidth: '100px' }} onClick={onClick}>Scann</button>
            {errors.map(_ => {
                return <p key={_}>{_}</p>
            })}
        </div>

    );
}

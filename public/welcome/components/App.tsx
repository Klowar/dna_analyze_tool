import React from 'react';
import { Link } from './Link';

export const App: React.FC = () => {

    return <div>
        <h1>💖 Hello !</h1>
        <p>Welcome to DNA analyze tool.</p>
        <h1>Here u can see our stuf</h1>

        <Link to={'orf_scanner'}>Open scanner</Link>
    </div>
}


import React, { useState } from 'react';
import { Link } from '../../shared';
import { Generator } from './Generator';
import { Parser } from './Parser';

export const App: React.FC = () => {

    const [orf, setOrf] = useState<string>("");

    return (
        <div>
            <Link to={'welcome'}> back </Link>
            <Generator update={setOrf} />
            <Parser orf={orf} />
        </div>

    );
}

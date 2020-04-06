import React, { useState } from 'react';
import { Generator } from './Generator';
import { Parser } from './Parser';


export const App: React.FC = () => {

    const [orf, setOrf] = useState<string>("");

    return (
        <div>
            <Generator update={setOrf} />
            <Parser orf={orf} />
        </div>

    );
}

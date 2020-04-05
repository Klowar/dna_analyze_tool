import React from 'react'; // eslint-disable-line 
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Lol</div>,
    document.getElementById('root')
);
// include the ipc module to communicate with main process.
// const ipcRenderer = require('electron').ipcRenderer;

// const a = document.getElementsByTagName('a');
// for (const _ of a) {
//     _.addEventListener('click', function (e) {
//         //send the info to main process . we can pass any arguments as second param.
//         console.log(e.target.id);

//         ipcRenderer.send("route", e.target.id);
//     });
// }


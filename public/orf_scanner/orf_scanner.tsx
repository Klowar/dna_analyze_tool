import React from 'react'; // eslint-disable-line 
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Lol</div>,
    document.getElementById('root')
);


// processBtn.onclick = (e) => {
//     generatedContainer.innerHTML = "<p>Generating...</p>"
//     ipcRenderer.invoke('generateOrf', amount.value, orfGcPercentage.value).then(result => {
//         orf = result;
//         generatedContainer.innerHTML = `<p>${result}</p>`;
//     });
// }

// scanBtn.onclick = (e) => {
//     parsedContainer.innerHTML = "<p>Processing...</p>";
//     ipcRenderer.invoke('parseOrf', orf).then(result => {
//         if (result === []) {
//             parsedContainer.innerHTML = '<p>No orf found</p>';
//         } else {
//             parsedContainer.innerHTML = result.map(_ => (`<p>${_}</p>`));
//         }
//     });
// }
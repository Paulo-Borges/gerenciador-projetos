const fs = require('fs');
const path = 'C:\\\\Users\\\\devfo\\\\.gemini\\\\antigravity\\\\brain\\\\30cf1565-04cc-426f-bc06-6960cf127794\\\\plano-curso-testes.md';
let lines = fs.readFileSync(path, 'utf8').split('\n');

let new_lines = [];
let videoCounter = 1;
for (let line of lines) {
    let match = line.match(/^(\* \*\*Vídeo )(\d+)(:.*)/);
    if (match) {
        new_lines.push(match[1] + videoCounter + match[3]);
        videoCounter++;
    } else {
        new_lines.push(line);
    }
}
fs.writeFileSync(path, new_lines.join('\n'));
console.log('Renumbered successfully to ' + (videoCounter - 1) + ' videos!');

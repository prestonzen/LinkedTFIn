import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('LinedIn Export Feb 17 2025 - Post Fix.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
});

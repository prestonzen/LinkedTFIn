const fs = require('fs');
console.log('Loading pdf-parse...');
try {
    const pdf = require('pdf-parse');
    console.log('pdf-parse loaded.');

    const filePath = 'LinedIn Export Feb 17 2025 - Post Fix.pdf';
    console.log(`Reading file: ${filePath}`);
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist!');
        process.exit(1);
    }
    const dataBuffer = fs.readFileSync(filePath);
    console.log(`File read, size: ${dataBuffer.length} bytes`);

    pdf(dataBuffer).then(function (data) {
        console.log('PDF parsed successfully.');
        console.log('--- TEXT START ---');
        console.log(data.text);
        console.log('--- TEXT END ---');
    }).catch(function (error) {
        console.error('Error parsing PDF:', error);
    });
} catch (e) {
    console.error('Error loading module or reading file:', e);
}

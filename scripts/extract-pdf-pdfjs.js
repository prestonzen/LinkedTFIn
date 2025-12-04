import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Set worker path to avoid "fake worker" warning or errors
// In Node, we don't need a worker usually, or we can point to the build
// But pdfjs-dist in Node might need some setup.

console.log('Starting PDF extraction with pdfjs-dist...');
const filePath = 'LinedIn Export Feb 17 2025 - Post Fix.pdf';

async function run() {
    try {
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            process.exit(1);
        }

        const dataBuffer = fs.readFileSync(filePath);
        const uint8Array = new Uint8Array(dataBuffer);

        const loadingTask = pdfjsLib.getDocument(uint8Array);
        const pdfDocument = await loadingTask.promise;

        console.log(`PDF loaded. Pages: ${pdfDocument.numPages}`);

        let fullText = '';

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        console.log('--- TEXT START ---');
        console.log(fullText);
        console.log('--- TEXT END ---');

    } catch (error) {
        console.error('Error:', error);
    }
}

run();

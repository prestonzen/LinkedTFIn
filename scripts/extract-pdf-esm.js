import fs from 'fs';

console.log('Starting PDF extraction (ESM dynamic import)...');
const filePath = 'LinedIn Export Feb 17 2025 - Post Fix.pdf';

async function run() {
    try {
        const pdfModule = await import('pdf-parse');
        console.log('Imported pdf-parse.');
        console.log('Keys:', Object.keys(pdfModule));

        let pdf = pdfModule.default;
        console.log('Type of pdf.default:', typeof pdf);

        if (typeof pdf !== 'function') {
            console.log('pdf.default is not a function. Checking module itself...');
            // In some environments, the module itself might be the function if it's a CJS export
            // But import() returns a Module Namespace Object, so the CJS export is usually in 'default'.
            // However, if the CJS export is an object, 'default' is that object.
            // If the CJS export is a function, 'default' is that function.

            // Let's check if pdfModule has other exports
            console.log('pdfModule:', pdfModule);
        }

        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            process.exit(1);
        }

        const dataBuffer = fs.readFileSync(filePath);
        console.log(`File read, size: ${dataBuffer.length} bytes`);

        // If pdf is a function, call it.
        if (typeof pdf === 'function') {
            const data = await pdf(dataBuffer);
            console.log('PDF parsed successfully.');
            console.log('--- TEXT START ---');
            console.log(data.text);
            console.log('--- TEXT END ---');
        } else {
            console.error('Cannot find pdf function in exports.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

run();

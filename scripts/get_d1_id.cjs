const { exec } = require('child_process');
exec('npx wrangler d1 list --json', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(stdout);
});

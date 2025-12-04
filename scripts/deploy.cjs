const fs = require('fs');
const { exec } = require('child_process');

exec('npx wrangler pages deploy dist --project-name linked-tf-in-test', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        fs.writeFileSync('deploy_error.txt', error.toString());
    }
    fs.writeFileSync('deploy_stdout.txt', stdout);
    fs.writeFileSync('deploy_stderr.txt', stderr);
});

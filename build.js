const fs = require('fs-extra');

async function build() {
    // Compile TypeScript files

    const { exec } = require('child_process');
    exec('tsc', (err) => {
        if (err) {
            console.error(`Error compiling TypeScript: ${err}`);
            return;
        }

        console.log('TypeScript compiled successfully');
        
        // make data directory if it doesn't exist
        if (!fs.existsSync('dist/gift_distribution/data')) {
            console.log('file not found')
            fs.mkdirSync('dist/gift_distribution/data');
        }

        // Copy the data folder to the dist directory
        fs.copySync('gift_distribution/data', 'dist/gift_distribution/data', { overwrite: true }, (copyErr) => {
            if (copyErr) {
                console.error(`Error copying data folder: ${copyErr}`);
            } else {
                console.log('Data folder copied to dist directory');
            }
        });
    });
}

build();

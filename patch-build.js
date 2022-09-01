const fs = require('fs');

fs.copyFile('dist/index.html', 'dist/404.html', (err) => {
    if (err) {
        console.error('index.html -> 404.html copy failed:');
        throw err;
    }
});
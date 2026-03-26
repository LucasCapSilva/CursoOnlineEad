const fs = require('fs');
const glob = require('glob');
const path = require('path');

const cssFiles = glob.sync('src/app/**/*.css');

let modifications = 0;

cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Let's replace `width: XYZpx` with `width: 100%; max-width: XYZpx;` if XYZ > 200
    content = content.replace(/width:\s*([3-9]\d{2}|\d{4})px\s*;/g, 'width: 100%; max-width: $1px;');
    
    // Replace `height: XYZpx` with `min-height: XYZpx; height: auto;` if XYZ > 200
    content = content.replace(/height:\s*([3-9]\d{2}|\d{4})px\s*;/g, 'min-height: $1px; height: auto;');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
        modifications++;
    }
});

console.log(`Modified ${modifications} files.`);

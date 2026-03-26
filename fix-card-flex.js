const fs = require('fs');
const glob = require('glob');

const cssFiles = glob.sync('src/app/**/*.css');

let modifications = 0;

cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    if (content.includes('aspect-ratio: 1 / 1;')) {
        if (!content.includes('flex-direction: column;')) {
            content = content.replace(/align-items: center;/g, 'align-items: center;\n  flex-direction: column;');
        }
        
        if (!content.includes('a {')) {
            content += '\n\na {\n  text-decoration: none;\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}\n';
        } else {
            content = content.replace(/a\s*{\s*text-decoration:\s*none;\s*}/g, 'a {\n  text-decoration: none;\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}');
        }

        if(!content.includes('.card h3')) {
            content += '\n.card h3 {\n  font-size: 1.2rem;\n  margin-top: 10px;\n  word-break: break-word;\n}\n';
        }
        if(!content.includes('.card p.fa')) {
            content += '\n.card p.fa {\n  margin-bottom: 0;\n}\n';
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated CSS: ${file}`);
        modifications++;
    }
});

console.log(`Modified ${modifications} CSS files.`);

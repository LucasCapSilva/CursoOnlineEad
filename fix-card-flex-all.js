const fs = require('fs');

const filesToFix = [
  'src/app/area-bemestar/area-bemestar.component.css',
  'src/app/area-participante/area-participante.component.css',
  'src/app/diario-de-bordo/diario-de-bordo.component.css'
];

let modifications = 0;

filesToFix.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    if (!content.includes('flex-direction: column;')) {
        content = content.replace(/align-items: center;/g, 'align-items: center;\n  flex-direction: column;');
    }
    
    if (!content.includes('a {')) {
        content += '\n\na {\n  text-decoration: none;\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}\n';
    } else {
        content = content.replace(/a\s*{\s*text-decoration:\s*none;\s*}/g, 'a {\n  text-decoration: none;\n  display: flex;\n  width: 100%;const fs = require('fs');

const filesToFix = [
 te
const filesToFix = [
  'src {
  'src/app/area  '"src/app/area-participante/area-participante.component. w "'src/app/diario-de-bordo/diario-de-bordo.component.css'"
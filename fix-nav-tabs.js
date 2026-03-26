const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/**/*.html');

const replacementClass = 'nav nav-tabs d-flex flex-nowrap';
const replacementStyle = 'overflow-x: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; border-bottom: none;';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('class="nav nav-tabs"') || content.includes("class='nav nav-tabs'")) {
        content = content.replace(/class=["']nav nav-tabs["']/g, `class="${replacementClass}" style="${replacementStyle}"`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});

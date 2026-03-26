const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/**/*.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('width="600" height="340"')) {
        content = content.replace(/<img([^>]*)width="600" height="340"([^>]*)>/g, '<img$1class="img-fluid"$2>');
        content = content.replace(/<video([^>]*)width="600" height="340"([^>]*)>/g, '<video$1$2>');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});

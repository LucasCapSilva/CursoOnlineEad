const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/area-*/*.html');
files.push(...glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/blocos/*.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('col-md-3') && !content.includes('mb-4 mb-md-0')) {
        content = content.replace(/class="col-md-3 ([^"]*)"/g, 'class="col-md-3 mb-4 mb-md-0 $1"');
        content = content.replace(/class="col-md-4 ([^"]*)"/g, 'class="col-md-4 mb-4 mb-md-0 $1"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed margins', file);
    }
});
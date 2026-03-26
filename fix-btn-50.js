const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/**/*.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('w-50') && content.includes('btn')) {
        const newContent = content.replace(/class="([^"]*)btn([^"]*)w-50([^"]*)"/g, 'class="$1btn$2btn-responsive-50$3"');
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Fixed', file);
        }
    }
});

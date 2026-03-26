const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/**/*.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('w-25')) {
        // Only replace w-25 on buttons or links that act like buttons.
        const newContent = content.replace(/<button([^>]*)w-25([^>]*)>/g, '<button$1btn-responsive$2>');
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Fixed', file);
        }
    }
});

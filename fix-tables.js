const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/**/*.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<table') && !content.includes('table-responsive')) {
        // wrap table
        const newContent = content.replace(/(<table[\s\S]*?<\/table>)/g, '<div class="table-responsive">\n  $1\n</div>');
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed', file);
    }
});

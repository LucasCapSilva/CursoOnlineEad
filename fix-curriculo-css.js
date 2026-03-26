const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/src/app/curriculo/**/*.css');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('height: 180px;')) {
        content = content.replace(/height: 180px;/g, 'min-height: 180px; height: auto;');
        changed = true;
    }
    if (content.includes('height: 204px;')) {
        content = content.replace(/height: 204px;/g, 'min-height: 204px; height: auto;');
        changed = true;
    }
    if (content.includes('height: 207px;')) {
        content = content.replace(/height: 207px;/g, 'min-height: 207px; height: auto;');
        changed = true;
    }
    if (content.includes('height: 115px;')) {
        content = content.replace(/height: 115pxconst fs = require('fs');
const glob = require( cconst glob = require('"glob" A
const files = glob.sync('/Usersist
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes( {
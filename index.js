var fs = require('fs')
const argv = require('yargs')
                .alias('b', 'base')
                .describe('b', 'Base file')
                .alias('s', 'source')
                .describe('s', 'Choose a source file to be appended')
                .alias('t', 'title')
                .describe('t', 'Add title')
                .help('h')
                .argv

const source = fs.createReadStream(argv.source)
const base = fs.createWriteStream(argv.base, {'flags': 'a'})

function formatHeader(title){
    const dash5 = '-----',        
        space5 = '     ';
    let dashTitleLength = '';
    if(title){
        dashTitleLength = '-'.repeat(title.length)
    }else{
        dashTitleLength = '-'.repeat(20)
        title = ' '.repeat(20)
    }
    return `\n\n\n${dash5+dashTitleLength+dash5}\n${space5+title+space5}\n${dash5+dashTitleLength+dash5}\n`
}
function mergeFiles(){
    base.write(formatHeader(argv.title));
    source.on('data', (chunk) => {
        base.write(chunk);
    });
    source.on('end', () => {
        base.end();
    });
}

mergeFiles();
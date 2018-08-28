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

base.write(`--------------------\n${argv.title || '===================='}\n--------------------\n`);
source.on('data', (chunk) => {
    base.write(chunk);
    console.log(chunk);
});
source.on('end', () => {
    base.end();
});

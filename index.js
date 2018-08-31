import file from './src/file'
const argv = require('yargs')
                .alias('b', 'base')
                .describe('b', 'Base file')
                .alias('s', 'source')
                .describe('s', 'Choose a source file to be appended')
                .alias('t', 'title')
                .describe('t', 'Add title')
                .help('h')
                .argv

async function main(){
    await file.merge(argv.base, argv.source,argv.title)
    file.remove(argv.source)
}

main()
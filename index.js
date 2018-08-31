var fs = require('fs')
const rimraf = require('rimraf')
const argv = require('yargs')
                .alias('b', 'base')
                .describe('b', 'Base file')
                .alias('s', 'source')
                .describe('s', 'Choose a source file to be appended')
                .alias('t', 'title')
                .describe('t', 'Add title')
                .help('h')
                .argv

/**
 * Create and format a header for the source 
 * @param {string} title - Title for the header
 * @returns {string} - a formated header string
 */
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

/**
 * Choose a base file to be appended using a source file 
 */
function merge(base, source, title){
    return new Promise ((resolve,reject) => {
        const sourceStream = fs.createReadStream(source)
        const baseStream = fs.createWriteStream(base, {'flags': 'a'})

        baseStream.write(formatHeader(title));
        sourceStream.on('data', (chunk) => {
            baseStream.write(chunk)
        })
        sourceStream.on('error', (err) => {
            reject(err)
        })
        sourceStream.on('end', () => {
            baseStream.end()
            resolve(true)     
        })
    })
}
function remove(){
    rimraf(argv.source, function () {});
}
async function main(){
    await merge(argv.base, argv.source,argv.title)
    remove()
}

main()
var fs = require('fs')
const rimraf = require('rimraf')

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
 * @param {string} base - File to be appended
 * @param {string} source - File with content to be add to base file
 * @param {string} title - Title for the header
 * @returns {boolean} - Returns a promise with true or a error
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
/**
 * Remove file 
 * @param {string} source - File with content to be add to base file
 * @returns {boolean} - Returns a promise with true or a error
 */
function remove(source){
    return new Promise((resolve, reject) => {        
        rimraf(source, function(err) {
            if(err){
                console.log(err)
                reject(err)                    
            }            
        })                  
        resolve(true)
    })
}

module.exports = {remove,merge}
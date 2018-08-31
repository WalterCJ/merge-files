const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const dirnameOrigin = path.join(__dirname, 'files')

function createFiles(){ 
    console.log('in createFiles')
    fs.mkdirSync(dirnameOrigin)   
    for(let i=0; i< 2;i++) {
        filePath = path.join(dirnameOrigin, `file_${i}`)
        
        fs.writeFile(filePath,`File number ${i}`, (error) => {
            if(error) throw error; 
        })
    }
    console.log('out createFiles')
}

function removeFolder(){
    rimraf(dirnameOrigin, function () {});
}
module.exports = {
    createFiles,
    removeFolder
};
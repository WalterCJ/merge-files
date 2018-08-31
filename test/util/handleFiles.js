const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const dirnameOrigin = path.join(__dirname, 'files')

function createFiles(){ 
    fs.mkdirSync(dirnameOrigin)   
    for(let i=0; i< 2;i++) {
        filePath = path.join(dirnameOrigin, `file_${i}`)
        
        fs.writeFile(filePath,`File number ${i}`, (error) => {
            if(error) throw error; 
        })
    }
}

function removeFolder(){
    rimraf(dirnameOrigin, function () {});
}
module.exports = {
    createFiles,
    removeFolder
};
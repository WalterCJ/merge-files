const path = require('path')
const file = require('../src/file')
const expect = require('chai').expect;
const chai = require("chai");
const util = require('./util/handleFiles')
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

describe('Merge Files', function () {
    before(function(done) { 
        util.createFiles()
        done()
    });
    describe('mergeFiles', function () {
        describe('merge', function () {
            const dirname = path.join(__dirname, '/util/files')   
            it('Should merge files', async function() {
                //basefile -> file_0, original/source -> file_1   
                const result = await file.merge(path.join(dirname,'file_0'),path.join(dirname,'file_1'),'random title')
                expect(result).to.be.true        
            })
            it('Should add content to base file', function() {
                const result = util.countLines(path.join(dirname,'file_0'))
                expect(result).to.be.above(1)
            })
        })
        describe('remove', function () {
            const dirname = path.join(__dirname, '/util/files')   
            it('Should remove files', async function() {
                const result = await file.remove(path.join(dirname,'file_1'))
                expect(result).to.be.true
            })
        })
    })
    after(function(done) {
        util.removeFolder()
        done()
    });
});
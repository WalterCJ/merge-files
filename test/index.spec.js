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
        const dirname = path.join(__dirname, '/util/files')   
        it('Should return a promise', function () {   
            const ShouldMergeFile = file.merge(path.join(dirname,'file_0'),path.join(dirname,'file_1'),'random title')
            expect(ShouldMergeFile).to.be.a('promise')
        })
    })
    after(function(done) {
        util.removeFolder()
        done()
    });
});
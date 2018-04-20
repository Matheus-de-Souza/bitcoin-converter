/* globals describe it */

const { expect } = require('chai');
const exec = require('child_process').exec;
const btcConverter = 'node.exe .\\src\\main.js';

const pkg = require('../package.json');

describe('Main CLI', () => {
  it('should return the version when btc-converter --version', (done) => {
		exec(`${btcConverter} --version`, (err, stdout, stderr) => { 
			if (err) throw err;
			expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
			done();
		})
	});
	
	it('should return the description when btc-converter --help', (done) => {
		exec(`${btcConverter} --help`, (err, stdout, stderr) => { 
			if (err) throw err;
			expect(stdout.includes(pkg.description)).to.be.true;
			done();
		})
  });
});

/* */
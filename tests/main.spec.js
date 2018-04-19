/* globals describe it */

const { expect } = require('chai');
const exec = require('child_process').exec;
const btcConverter = 'node.exe .\\src\\main.js';

describe('Main', () => {
  it('should return Hello World', (done) => {
		exec(btcConverter, (err, stdout, stderr) => {
			if (err) throw err;
			expect(stdout.replace('\n', '')).to.be.equal('Hello World!');
			done();
		})
  });
});

/* */
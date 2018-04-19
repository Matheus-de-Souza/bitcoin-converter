#!/usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');

program
	.version(pkg.version)
	.parse(process.argv);

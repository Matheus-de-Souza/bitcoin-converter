#!/usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');

program
	.version(pkg.version)
	.description(pkg.description)
	.parse(process.argv);

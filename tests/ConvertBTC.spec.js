
const chalk = require('chalk');
const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const nock = require('nock');

const convertBTC = require('./../src/ConvertBTC');

chai.use(sinonChai);

describe('ConvertBTC', () => {

	let consoleStub;

	const responseMock = {
    "success": true,
    "time": "2018-04-20 15:51:54",
    "price": 16965.10
	};

	const responseMock2 = {
    "success": true,
    "time": "2018-04-20 15:51:54",
    "price": 169651
	};

	const responseMock3 = {
    "success": true,
    "time": "2018-04-20 15:51:54",
    "price": 169651
	};
	
	const responseMock4 = {
    "success": true,
    "time": "2018-04-20 15:51:54",
    "price": 16965.10
	};

	beforeEach(() => {
		consoleStub = sinon.stub(console, 'info');
	});

	afterEach(() => {
		consoleStub.restore();
	});

	it.skip('should return USD as currency default and 1 as amount default', () => {
		expect(convertBTC()).to.be.equal('1 BTC to USD = 2000.00');
	});
	it.skip('should return BRL as currency and 10 as amount when defined', () => {
		expect(convertBTC('BRL', 10)).to.be.equal('10 BTC to BRL = 2000.00');
	});

	it('should use USD as default value and 1 as default amount', async () => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 1})
			.reply(200, responseMock);

			await convertBTC();

			expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(16965.1)}`)
	});

	it('should use currency USD and 10 as amount', async () => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 10})
			.reply(200, responseMock2);

			await convertBTC('USD', 10);

			expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(169651)}`)
	});
	
	it('should use currency BRL and 100 as amount', async () => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 100})
			.reply(200, responseMock3);

			await convertBTC('BRL', 100);

			expect(consoleStub).to.have.been.calledWith(`${chalk.red(100)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(169651)}`)
	});
	
	it('should use currency BRL and 1 as amount default', async () => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 1})
			.reply(200, responseMock4);

			await convertBTC('BRL');

			expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(16965.1)}`)
	});
	
	it('should message user when api reply with error', async () => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 1})
			.replyWithError('Error');

			await convertBTC('BRL');

			expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try it again in a few minutes.'));
	});
});
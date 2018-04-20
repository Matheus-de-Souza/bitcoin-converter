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

	beforeEach(() => {
		consoleStub = sinon.stub(console, 'log');
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

	it('should use USD as default value and 1 as default amount', (done) => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 1})
			.reply(200, responseMock);

			convertBTC();

			setTimeout(() => {
				expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 16965.1')
				done();
			}, 100)
	});

	it('should use currency USD and 10 as amount', (done) => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 10})
			.reply(200, responseMock2);

			convertBTC('USD', 10);

			setTimeout(() => {
				expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 169651')
				done();
			}, 10)
	});
	
	it('should use currency BRL and 100 as amount', (done) => {
		const request = nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 100})
			.reply(200, responseMock3);

			convertBTC('BRL', 100);

			setTimeout(() => {
				expect(consoleStub).to.have.been.calledWith('100 BTC to BRL = 169651')
				done();
			}, 100)
	});
});
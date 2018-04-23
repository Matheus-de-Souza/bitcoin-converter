const chalk = require('chalk');
const request = require('request');

function convertBTC(currency = 'USD', amount = 1) {
	const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

	request.get(url, (err, response, body) => {
		let apiResponse = null;

		try {
			apiResponse = JSON.parse(body);
		} catch(parseError) {
			console.log(chalk.red('Something went wrong in the API. Try it again in a few minutes.'));
			return parseError;
		}

		console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
	});
}

module.exports = convertBTC;
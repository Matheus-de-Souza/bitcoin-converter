const chalk = require('chalk');
const request = require('request-promise-native');
const ora = require('ora');

const spinner = ora({
	text: 'Retriving Bitcoin data...',
	color: 'yellow',
});

function convertBTC(currency = 'USD', amount = 1) {
	const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
	
	spinner.start();
	
	return request.get(url)
	.then((body) => {
		spinner.stop();
		return body;
	})
	.then((body) => {
		const apiResponse = JSON.parse(body);
		console.info(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
	})
	.catch((err) => {
		spinner.stop();
		console.info(chalk.red('Something went wrong in the API. Try it again in a few minutes.'));
		return err;
	});
}

module.exports = convertBTC;
// http://data.fixer.io/api/latest?access_key=youraipkey
const axios = require('axios');

//#region promise
// const getExchangeRate = (from, to) => {
// 	return axios
// 		.get(
// 			'http://data.fixer.io/api/latest?access_key=dd5e520b0aafd3c3cbacd5a649dd556f',
// 		)
// 		.then(res => {
// 			const euro = 1 / res.data.rates[from];
//             const rate = euro * res.data.rates[to];

//             // const rate = res.data.rates[to]/res.data.rates[from]
// 			return rate;
// 		});
// };

// const getCountries = currencyCode => {
// 	return axios
// 		.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
// 		.then(res => {
// 			return res.data.map(d => d.name);
// 		});
// };

// const convertCurrency = (from, to, amount) => {
// 	let convertedAmount;
// 	return getExchangeRate(from, to)
// 		.then(rate => {
// 			convertedAmount = (amount * rate).toFixed(2);
// 			return getCountries(to);
// 		})
// 		.then(countries => {
// 			return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(', ')}`;
// 		});
// };
//#endregion

const getExchangeRate = async (from, to) => {
	try {
		const res = await axios.get(
			'http://data.fixer.io/api/latest?access_key=youraipkey',
		);

		const rate = res.data.rates[to] / res.data.rates[from];

		if (isNaN(rate)) {
			throw new Error();
		}

		return rate;
	} catch (error) {
		throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
	}
};

const getCountries = async currencyCode => {
	try {
		const res = await axios.get(
			`https://restcountries.eu/rest/v2/currency/${currencyCode}`,
		);
		return res.data.map(d => d.name);
	} catch (error) {
		throw new Error(`Unable to get countries that use ${currencyCode}.`);
	}
};

const convertCurrency = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to);
	const countries = await getCountries(to);

	const convertedAmount = (amount * rate).toFixed(2);

	return (
		`${amount} ${from} is worth ${convertedAmount} ${to}.` +
		`You can spend it in the following countries ${countries.join(', ')}`
	);
};

// getExchangeRate('AUD', 'TWD').then(rate => console.log(rate));

// getCountries('usd').then(countries => console.log(countries));

convertCurrency('TWD', 'USD', 10000)
	.then(message => console.log(message))
	.catch(e => console.log(e.message));

const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should genereate correct message object', () => {
		const from = 'Jen';
		const text = 'Some message';
		const message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({ from, text });
		// store res in variable

		// assert from match

		// assert text match

		// assert createdat is number
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Cx';
		const latitude = 15;
		const longitude = 18;
		const url = 'https://www.google.com/maps?q=15,18';

		const message = generateLocationMessage(from, latitude, longitude);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({ from, url });
	});
});

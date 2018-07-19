const expect = require('expect');

const { generateMessage } = require('./message');

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

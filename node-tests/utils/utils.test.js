const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
	const res = utils.add(33, 11);

	expect(res)
		.toBe(44)
		.toBeA('number');

	// if (res !== 44) {
	// 	throw new Error(`Expected 44, but got ${res}.`);
	// }
});

it('should async add two numbers', done => {
	utils.asyncAdd(4, 3, sum => {
		expect(sum)
			.toBe(7)
			.toBeA('number');
		done();
	});
});

it('should square a number', () => {
	const res = utils.square(3);

	// if (res !== 9) {
	// 	throw new Error(`Expected 4, but got ${res}.`);
	// }
	expect(res)
		.toBe(9)
		.toBeA('number');
});

it('should async square number', done => {
	utils.asyncSquare(3, res => {
		expect(res)
			.toBe(9)
			.toBeA('number');
		done();
	});
});

// it('should expect some values', () => {
// 	// expect(12).toNotBe(12);
// 	// use toEqual to compare objects
// 	// expect({ name: 'andrew' }).toEqual({ name: 'Andrew' });
// 	// expect([2, 3, 4]).toExclude(2);
// 	expect({
// 		name: 'Andrew',
// 		age: 25,
// 		location: 'Philadelphia'
// 	}).toInclude({
// 		age: 25
// 	});
// });

// should verify first and last names are set
// assert it includes firstName and lastName with proper values
it('should set firstName and lastName', () => {
	var user = { location: 'Philadelphia', age: 25 };
	var res = utils.setName(user, 'Andrew Mead');

	// expect(user).toEqual(res);
	expect(user).toInclude({
		firstName: 'Andrew',
		lastName: 'Mead'
	});
});

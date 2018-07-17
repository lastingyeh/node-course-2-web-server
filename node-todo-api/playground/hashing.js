const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = { id: 10 };

const token = jwt.sign(data, '123abc');
console.log('token', token);

const decode = jwt.verify(token, '123abc');
console.log('decode', decode);

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
// 	id: 4,
// };

// const token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }

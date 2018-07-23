// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());
const moment = require('moment');

const date = moment();
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// 10:35 am
const eDate = moment()
console.log(eDate.format('h:mm a'))

const ts = moment().valueOf()
console.log(ts)

const createdAt = 1234
const cDate = moment(createdAt)
console.log(cDate.format('h:mm a'))
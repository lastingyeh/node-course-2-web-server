const users = [
	{ id: 1, name: 'Andrew', schoolId: 101 },
	{ id: 2, name: 'Jessica', schoolId: 999 },
];
const grades = [
	{ id: 1, schoolId: 101, grade: 86 },
	{ id: 2, schoolId: 999, grade: 100 },
	{ id: 3, schoolId: 101, grade: 80 },
];

const getUser = id => {
	return new Promise((resolve, reject) => {
		const user = users.find(user => user.id === id);

		if (user) {
			resolve(user);
		} else {
			reject(`Unable to find user id of ${id}.`);
		}
	});
};

const getGrades = schoolId => {
	return new Promise((resolve, reject) => {
		resolve(grades.filter(grade => grade.schoolId === schoolId));
	});
};

// getUser(21)
// 	.then(user => {
// 		console.log(user);
// 	})
// 	.catch(e => console.log(e));

// getGrades(1)
// 	.then(grades => {
// 		console.log(grades);
// 	})
// 	.catch(e => console.log(e));

// const getStatus = userId => {
// 	let user;
// 	return getUser(userId)
// 		.then(findUser => {
// 			user = findUser.name;
// 			return getGrades(findUser.schoolId);
// 		})
// 		.then(grades => {
// 			let average =
// 				grades.length > 0
// 					? grades.reduce(
// 							(prevTotal, grade) => prevTotal + grade.grade,
// 							0,
// 					  ) / grades.length
// 					: 0;

// 			return `${user} has a ${average}% in the class.`;
// 		});
// };

// getStatus(1)
// 	.then(status => console.log(status))
// 	.catch(e => console.log(e));

// async await
const getStatusAlt = async userId => {
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);

	const average =
		grades.length > 0
			? grades.reduce((prevTotal, grade) => prevTotal + grade.grade, 0) /
			  grades.length
			: 0;

	return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(2)
	.then(name => console.log(name))
	.catch(e => console.log(e));

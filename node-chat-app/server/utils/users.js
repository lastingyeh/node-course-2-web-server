class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}

	removeUser(id) {
        const user = this.getUser(id);
        
		if (user) {
			this.users = this.users.filter(user => user.id !== id);
        }
        
        return user;
	}

	getUser(id) {
		const user = this.users.filter(user => user.id === id);

		return user[0];
	}

	getUserList(room) {
		const names = this.users
			.filter(user => user.room === room)
			.map(user => user.name);
		return names;
	}
}

module.exports = { Users };

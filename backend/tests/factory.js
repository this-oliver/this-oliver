const mongoose = require("mongoose");

exports.mongo = {
	createObjectId: () => {
		return mongoose.Types.ObjectId();
	},
};

exports.models = {
	createUsers: (num = 1) => {
		let users = [];
		for (let i = 0; i < num; i++) {
			users.push({
				name: "user" + i,
				email: "user" + i + "@mail.com",
				password: "password",
			});
		}

		if (num == 1) {
			return users[0];
		}
		return users;
	},
};

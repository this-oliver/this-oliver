import { UserModel } from "./models/user";
import type { UserDocument } from "./models/user";
import type { IUser } from "../types/user";
import type { BaseError } from "../types/error";

async function createUser (name: string, email: string, password: string) {
	const userCount = await UserModel.countDocuments({});

	if (userCount > 1) {
		throw { status: 400, message: "sorry buddy but there can only be one user in this server 🤪" } as BaseError;
	}

	try {
    return await UserModel.create(
		new UserModel({
			name: name,
			email: email,
			password: password,
		})
	);
  } catch (error) {

    if((error as Error).name === "ValidationError"){
      throw { status: 400, message: (error as any).message } as BaseError;
    }

    throw { status: 500, message: (error as Error).message || error || 'Failed to create user' } as BaseError;
  }
}

async function getUser (showSecrets?: boolean): Promise<UserDocument> {
	const user = showSecrets
		? await UserModel.findOne()
			.exec()
		: await UserModel.findOne()
			.select("-password -salt")
			.exec();
  
	if (user === null) {
		throw { status: 404, message: `user does not exist` } as BaseError;
	}

	return user as UserDocument;
}

async function getUserByEmail(email: string, showSecrets?: boolean): Promise<UserDocument>{
	const user = showSecrets 
		? await UserModel.findOne({ email: email.toLowerCase() })
			.exec()
		: await UserModel.findOne({ email: email.toLowerCase() })
			.select("-password -salt")
			.exec();

	if (user === null) {
		throw { status: 404, message: `user with email '${email}' does not exist` } as BaseError;
	}

	return user as UserDocument;
}

async function updateUser (patch: Partial<IUser>): Promise<UserDocument> {
	const user = await getUser();

	if (patch.email && patch.email !== user.email) {
		const emailExists = await UserModel.findOne({ email: patch.email, }).exec();

		if (emailExists) {
			throw { status: 400, message: `${patch.email} already exists` } as BaseError;
		}

		user.email = patch.email || user.email;
	}

	user.name = patch.name || user.name;

	if (patch.bio) {
		user.bio.short = patch.bio.short || user.bio.short;
		user.bio.long = patch.bio.long || user.bio.long;
	}

	return await user.save();
}

async function updateUserPassword (oldPwd: string, newPwd: string): Promise<UserDocument> {
	const user = await getUser(true);
	const isMatching = await user.verifyPassword(oldPwd);

	if (!isMatching) {
		throw { status: 401, message: "invalid credentials" } as BaseError;
	}

	user.password = newPwd;

	return user.save();
}

async function incrementUserVisits (): Promise<UserDocument> {
	const user = await getUser();
	
	user.visits = user.visits + 1;
	return await user.save();
}

export {
	UserModel,
	UserDocument,
	createUser,
	getUser,
	getUserByEmail,
	updateUser,
	updateUserPassword,
	incrementUserVisits
};
import mongoose from "mongoose";
import { IUser } from "../src/types/user";
import { INote } from "../src/types/note";

const mongo = {
	createObjectId: () => {
		return new mongoose.Types.ObjectId();
	},
};

const models = {
	createUsers: (num = 1): Partial<IUser>[] | Partial<IUser> => {
		if (num <= 1) {
			return {
				name: "user 0",
				email: "user0@mail.com",
				password: "password",
			};
		} else {
			const users: Partial<IUser>[] = [];
			
      for (let i = 0; i < num; i++) {
				users.push({
					name: `user${i}`,
					email: `user${i}@mail.com`,
					password: `password${i}`,
				});
			}
			return users;
		}
	},

	createNote: ({
    num = 1,
		publish = true,
		title = "test title",
		content = "content for stuff to test",
    tags = [] as string[],
  } = {}): Partial<INote> | Partial<INote>[] => {
		if(num <= 1) {
      return {
        title,
        content,
        tags,
        publish,
      };
    }
    else {
      const notes: Partial<INote>[] = [];
      for (let i = 0; i < num; i++) {
        notes.push({
          title: `${title} ${i}`,
          content: `${content} ${i}`,
          tags,
          publish,
        });
      }
      return notes;
    }
	},
};

export { mongo, models };

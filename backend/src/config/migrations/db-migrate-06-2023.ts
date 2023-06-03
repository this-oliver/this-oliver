/**
 * Date: June 2023
 *
 * Collections affected:
 * - users
 */
import { IExecution } from "./index";
import { UserModel } from "../../data/models/user";

/**
 * Users
 *
 * - replace `bio` field with `status`
 */
async function migrateUsers() {
  /**
   * update all user documents to have a `status` field
   * with the value of the `bio.short` field
   */
  const user = await UserModel.findOne();

  if(!user){
    throw new Error("User not found");
  }
  
  const userObj = user.toObject(); // convert to plain object
  const status = (userObj as any).bio?.short;

  // update user status
  await UserModel.updateOne(
    { _id: userObj._id },
    { status }
  );

  // remove old fields from user document (note: `.collection`)
  await UserModel.collection.updateMany(
    { },
    { $unset: { bio: 1, articles: 1, experiences: 1 } }
  );
}

export default <IExecution>{
  name: "06-2023",
  actions: [
    { description: "migrate users (bio.short -> status)", action: migrateUsers },
  ],
};

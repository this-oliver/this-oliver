/**
 * Date: May 2023
 *
 * Collections affected:
 * - users
 * - notes (previously known as articles)
 * - tags
 * - experiences
 */

import Mongoose from "mongoose";
import { IExecution } from "./index";
import { UserModel } from "../../data/models/user";
import { NoteModel } from "../../data/models/note";
import { ExperienceModel } from "../../data/models/experience";

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

  if(user){
    user.status = (user as any).bio?.short;
    
    // delete old fields
    delete (user as any).bio;
    delete (user as any).articles;
    delete (user as any).experiences;
    await user.save();
  }


  await UserModel.updateMany(
    { "bio.short": { $exists: true } },
    { $rename: { "bio.short": "status" } }
  );
}

/**
 * Notes
 *
 * - rename `articles` collection to `notes`
 * - convert all `tag` objects into strings
 * - remove `tag` collection
 */
async function migrateNotes() {
  // get all articles and tags
  const articles = await Mongoose.connection.db
    .collection("articles")
    .find()
    .toArray();

  // convert articles to notes and turn tags into strings
  await Promise.all(
    articles.map(async (article) => {
      const noteExists = await NoteModel.exists({ _id: article._id }).exec();

      if (!noteExists) {
        // convert tag objects to strings
        const tags = await _convertTags(article.tags);

        return await NoteModel.create({
          _id: article._id,
          title: article.title,
          content: article.content,
          tags: tags,
          publish: article.publish,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        });
      }

      return Promise.resolve();
    })
  );

  // convert tag objects to strings
  async function _convertTags(tags: any[]) {
    return await Promise.all(
      tags.map(async (tag) => {
        const isObjectId = Mongoose.Types.ObjectId.isValid(tag);

        if (isObjectId) {
          // fetch tag from db
          const tagDoc = await Mongoose.connection.db
            .collection("tags")
            .findOne({ _id: tag });

          return tagDoc?.name || tag;
        }

        return tag;
      })
    );
  }

  const collections = await Mongoose.connection.db.listCollections().toArray();
  // remove articles collection
  if(collections.find((collection) => collection.name === "articles") !== undefined){
    await Mongoose.connection.db.dropCollection("articles");
  }

  // remove tag collection
  if(collections.find((collection) => collection.name === "tags") !== undefined){
    await Mongoose.connection.db.dropCollection("tags");
  }

}

/**
 * Experiences
 *
 * - rename all `experience.type` values with 'projects' to 'project'
 */
async function migrateExperiences() {
  /**
   * update all experience documents such that the `type` field
   * with the value of 'projects' is changed to 'project'
   */
  await ExperienceModel.updateMany(
    { type: "projects" },
    { $set: { type: "project" } }
  );
}

export default <IExecution>{
  name: "05-2023",
  actions: [
    { description: "migrate users", action: migrateUsers },
    { description: "migrate notes", action: migrateNotes },
    { description: "migrate experiences", action: migrateExperiences },
  ],
};

import type { Document } from "mongoose";
import type { IUser, IUserPasskey, IUserPasskeyChallenge } from "../../types/user";
import Bcrypt from "bcrypt";
import Mongoose from "mongoose";

const SALT_WORK_FACTOR = 10;

const UserPasskeySchema = new Mongoose.Schema<IUserPasskey>(
  {
    name: { type: String, required: true },
    publicKey: { type: String, required: true }
  },
  { timestamps: true }
);

const UserPasskeyChallengeSchema = new Mongoose.Schema<IUserPasskeyChallenge>(
  {
    value: { type: String, required: true }
  },
  { timestamps: true }
);

const UserSchema = new Mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passkeys: [{ type: UserPasskeySchema }],
    passkeyChallenges: [{ type: UserPasskeyChallengeSchema }],
    salt: { type: String },
    status: { type: String, default: "" }
  },
  { timestamps: true }
);

/**
 * Perform some actions before saving the user model
 * - [ ] Hash the password before saving the user model
 */
UserSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  const passwordChanged = this.isModified("password");

  if (passwordChanged) {
    // generate a salt
    this.salt = await Bcrypt.genSalt(SALT_WORK_FACTOR);

    // overwrite the cleartext password with the hash
    this.password = await Bcrypt.hash(this.password, this.salt);

    this.save();
  }

  next();
});

/**
 * Add a custom method to the user model to verify the password
 */
UserSchema.methods.verifyPassword = async function (candidate: string) {
  return await Bcrypt.compare(candidate, this.password);
};

type UserDocument = IUser & Document & { verifyPassword: (candidate: string) => Promise<boolean>, createdAt: string };

const UserModel = Mongoose.model<IUser>("user", UserSchema);

export {
  UserDocument,
  UserModel
};

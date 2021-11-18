import mongoose, { NativeError } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { IUserDocument } from "../../domain/User";
import { Logger } from "../../config/Logger";

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<IUserDocument>(
  "save",
  async function (this, next: (err?: mongoose.CallbackError) => void) {
    try {
      if (!this.isModified("password")) {
        return next();
      }

      const hash = await bcrypt.hash(
        this.password,
        config.get("Hash.password.salt")
      );

      this.password = hash;

      return next();
    } catch (error) {
      return next(error as NativeError);
    }
  }
);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export { UserSchema, UserModel };

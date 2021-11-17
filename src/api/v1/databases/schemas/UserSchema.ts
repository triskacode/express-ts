import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { IUserDocument } from "../../domain/User";

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
    if (!this.isModified("password")) {
      return next();
    }

    bcrypt
      .hash(this.password, config.get("Hash.password.salt"))
      .then((hash: string) => {
        this.password = hash;

        return next();
      })
      .catch((err) => {
        return next(err);
      });
  }
);

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export { UserSchema, UserModel };

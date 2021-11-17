import mongoose from "mongoose";
import { ISessionDocument } from "../../domain/Session";
import { UserModel } from "./UserSchema";

const SessionSchema = new mongoose.Schema<ISessionDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    valid: {
      type: Boolean,
      required: true,
      default: true,
    },
    userAgent: {
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

const SessionModel = mongoose.model<ISessionDocument>("Session", SessionSchema);

export { SessionSchema, SessionModel };

const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../utils/authentication");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    profileImgUrl: {
      type: String,
      default: "/images/default-user-img.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndCreateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found!");
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const providedPasswordHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (providedPasswordHash !== hashedPassword) {
      throw new Error("Incorrect Password!");
    }

    const token = createTokenForUser(user);
    return token;
  }
);

const userModel = model("users", userSchema);

module.exports = { userModel };

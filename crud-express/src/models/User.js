const moongose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const environment = process.env.NODE_ENV;
const stage = require("../config")[environment];

const UserSchema = new moongose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("validate", function validateUser(next) {
  //if (!!this.userName && !!this.email && !!this.password) 
  next();

  //next(new Error("Dados inválidos"));
});

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified || !this.isNew) next();

  this.password = await bcrypt.hash(this.password, stage.saltingRounds);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    const payload = { user: this.userName };
    return jwt.sign(payload, "secret", {
      expiresIn: '60m',
      issuer: 'https://google.com'
    });
  }
};

UserSchema.plugin(mongoosePaginate);
module.exports = moongose.model("User", UserSchema);

const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchemas = new mongoose.Schema({
  fullName: { type: String },
  email: {
    type: String,
    unique: true,
    required: function() { return this.loginType === "email" || this.loginType === "google"; },
  },
  number: {
    type: String,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit phone number!`
    },
  },
  password: {
    type: String,
    required: function() { return this.loginType === "email"; }
  },
    address: { type: String, required: false },
    is_delete: { type: Boolean, default: false },
    token: { type: String, required: false },
    status: { type: Boolean, default: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: String, required: false },
}, { timestamps: true });

// Pre-save hook for password hashing
userSchemas.pre('save', function (next) {
    const isUser = this;
    if (!isUser.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(isUser.password, salt, function (err, hash) {
            if (err) return next(err);
            isUser.password = hash;
            console.log(hash);
            next();
        });
    });
});

// Method to generate JWT token
userSchemas.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model('user', userSchemas);

 module.exports = User
 



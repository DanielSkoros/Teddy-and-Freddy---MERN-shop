const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    address: {
        type: String,
        minLength: 2,
        maxLength: 64,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next){
   const user = this;
   if(user.isModified('password')){
       bcrypt.genSalt(SALT_I, (err, salt) => {
           if (err){
               return next(err);
           }else{
               bcrypt.hash(user.password, salt, (err, hash) => {
                   if (err){
                       return next(err)
                   }else{
                       user.password = hash;
                       next();
                   }
               })
           }
       })
   }else{
       next();
   }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback){
    const user = this;
    user.token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.save(function(err, user){
        if(err) return callback(err)
        callback(null, user)
    })

};

userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    jwt.verify(token, process.env.SECRET, function (err, decode) {
        user.findOne({"_id": decode, "token": token}, function (err, user) {
            if(err) return callback(err);
            callback(null, user);
        })
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    }
});

mongoose.model('users', userSchema);
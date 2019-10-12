const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        minLength: 10,
        required: true,
        trim: true
    },
    content: {
        type: String,
        minLength: 10,
        required: true
    }
}, {
    timestamps: true
});

mongoose.model('blog', blogSchema);
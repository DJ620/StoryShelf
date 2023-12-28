const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    description: String,
    infoLink: String,
    googleId: String,
    status: {type: String, default: "want to read"},
    progressType: {type: String, default: "Percent"},
    numPages: {type: Number, default: 0},
    totalLocation: {type: Number, default: 0},
    quotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "QuoteData"
        }
    ],
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "SessionData"
        }
    ]
});

const BookData = mongoose.model("BookData", BookSchema);

module.exports = BookData;
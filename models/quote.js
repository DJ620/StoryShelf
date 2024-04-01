const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    quote: String,
    page: Number,
    location: Number,
    character: String
});

const QuoteData = mongoose.model("QuoteData", QuoteSchema);

module.exports = QuoteData;
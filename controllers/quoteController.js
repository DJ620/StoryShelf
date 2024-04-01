const db = require("../models");

module.exports = {
    addQuote: function(req, res) {
        db.QuoteData.create(req.body.quoteData)
            .then(({_id}) => db.BookData.findOneAndUpdate({_id: req.body.bookId}, { $push: {quotes: _id}}, {new: true}))
            .then(dbBook => {
                res.json(dbBook);
            })
            .catch(err => {
                res.json(err);
            });
    },

    deleteQuote: function(req, res) {
        db.QuoteData.deleteOne({_id: req.params.quoteId})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    }
};
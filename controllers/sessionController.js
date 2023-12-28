const db = require("../models");

module.exports = {
    addSession: function(req, res) {
        db.SessionData.create(req.body.session)
            .then(({_id}) => db.BookData.findOneAndUpdate({_id: req.body.bookId}, { $push: {sessions: _id}}, {new: true}))
            .then(dbBook => {
                res.json(dbBook);
            })
            .catch(err => {
                res.json(err);
            });
    },

    deleteSession: function(req, res) {
        db.SessionData.deleteOne({_id: req.params.sessionId})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    }
};
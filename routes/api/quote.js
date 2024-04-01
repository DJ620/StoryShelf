const router = require("express").Router();
const quoteController = require("../../controllers/quoteController");

router.route("/add")
    .post(quoteController.addQuote);

router.route("/:quoteId")
    .delete(quoteController.deleteQuote);

module.exports = router;
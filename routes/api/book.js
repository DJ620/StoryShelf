const router = require("express").Router();
const bookController = require("../../controllers/bookController");

router.route("/add")
    .post(bookController.addBook);

router.route("/update")
    .put(bookController.updateBook);

router.route("/:id")
    .get(bookController.getAllBooks);

router.route("/individual/:id")
    .get(bookController.getSingleBook);

router.route("/:bookId")
    .delete(bookController.deleteBook);

module.exports = router;
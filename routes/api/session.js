const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

router.route("/add")
    .post(sessionController.addSession);

router.route("/:sessionId")
    .delete(sessionController.deleteSession);

    module.exports = router;
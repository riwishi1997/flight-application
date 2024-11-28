const express = require("express");
const router = express.Router();
const {getFormDetails, getDetails , getDetail , postDetails, putDetails, deleteDetails} = require ("../controllers/controls")

router.route("/getFormDetails").get(getFormDetails);

router.route("/getAllFlights").get(getDetails);

router.route("/getDetailsById/:id").get(getDetail);

router.route("/postDetails").post(postDetails);

router.route("/updateDetailsById/:id").put(putDetails);

router.route("/deleteDetailsById/:id").delete(deleteDetails);


module.exports = router;

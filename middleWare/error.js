const constants = require("../constants");
const errorHandle = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.status : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.NOT_FOUND:
      res.json({
        title: "NOT_FOUND",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("UNCAUGHT ERROR!!");
      console.log(err.message)
      console.log(err.stack)
      break;
  }
};

module.exports = errorHandle;

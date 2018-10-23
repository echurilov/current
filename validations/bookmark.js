const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewBookmark(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.query)) {
    errors.query = "Query field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewBookmark(data) {
  let errors = {};

  data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
  data.query = !isEmpty(data.query) ? data.query : "";

  if (Validator.isEmpty(data.user_id)) {
    errors.user_id = "User field is required";
  }

  if (Validator.isEmpty(data.query)) {
    errors.query = "Query field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

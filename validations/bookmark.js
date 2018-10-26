const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateBookmark = ({ user_id, query }) => {
  // let errors = {
  //   user_id: !user_id && "User field is required",
  //   query: !query && "Query field is required",
  // }
  // if (errors.user_id || errors.query) { throw errors }
  // return { user_id: user_id, query: query }
  let errors = {};

  data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
  data.query = !isEmpty(data.query) ? data.query : '';

  if (Validator.isEmpty(data.user_id)) {
    errors.user_id = 'User Id field is required';
  }

  if (Validator.isEmpty(data.query)) {
    errors.query = 'Query field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateBookmark;
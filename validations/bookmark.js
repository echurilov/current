// const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateBookmark = ({ user_id, query }) => {
  let errors = {
    user_id: !user_id && "User field is required",
    query: !query && "Query field is required",
  }
  if (errors.user_id || errors.query) { throw errors }
  return { user_id: user_id, query: query }
}

module.exports = validateBookmark;
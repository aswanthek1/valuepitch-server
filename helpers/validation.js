module.exports = {
  validateEmail: (email) => {
    return String(email)
      .toLowerCase()
      .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
  },
  validateLength: (text, min, max) => {
    if (text.length > max || text.length < min) {
      return false;
    } else {
      return true;
    }
  },
  validteDob: (dob) => {
    return Date(dob).match(
      /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/
    );
  },
};

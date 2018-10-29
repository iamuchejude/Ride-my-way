"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EMAIL_IS_VALID = function EMAIL_IS_VALID(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = re.test(String(email).toLowerCase());
  if (!isValid) {
    return false;
  }
  return true;
};

exports.default = EMAIL_IS_VALID;
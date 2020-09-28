'use strict';

const escapeStringRegexp = require('escape-string-regexp');

class StringUtil {
  static escapeString(str) {
    return escapeStringRegexp(str);
  }
}

module.exports = StringUtil;

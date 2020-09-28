'use strict';

const moment = require('moment');

class DateUtil {
  static formatToYMDHMS(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static formatToDate(d) {
    return moment(d).toDate();
  }

  static formatToYMD(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static diff(d1, d2, unitOfTime = 'days') {
    let diff = moment(d1).diff(moment(d2), unitOfTime);
    return Math.abs(diff) + 1;
  }
}

module.exports = DateUtil;

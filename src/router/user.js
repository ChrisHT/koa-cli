'use strict';

const UserCtrl = require('../controller/user');

module.exports = router => {
  router.post('/user/create', UserCtrl.createUser);
};

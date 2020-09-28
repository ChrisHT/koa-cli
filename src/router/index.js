'use strict';

const { routerPrefixV1 } = require('../lib/Constant');
const router = require('@koa/router')({
  prefix: routerPrefixV1,
  sensitive: true,
});
const RequestLog = require('../middlewares/RequestLog');
const ResponseHelper = require('../middlewares/ResponseHelper');

router.use('/', RequestLog, ResponseHelper);

require('./user')(router);

module.exports = router;

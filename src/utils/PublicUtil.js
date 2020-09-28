'use strict';

class PublicUtil {
  static async findAndOffset(model, opts) {
    let { offset = true, filter = {}, project = {}, options } = opts;
    let total = 0;
    let rows = [];
    let query = model.find(filter, project, options);
    if (opts.sort) {
      query = query.sort(opts.sort);
    } else {
      query = query.sort({ _id: -1 });
    }
    if (offset) {
      let _page = opts.page;
      let _rows = opts.rows;
      let result = await Promise.all([
        model.count(filter),
        query.skip((_page - 1) * _rows).limit(_rows),
      ]);
      total = result[0];
      rows = result[1];
    } else {
      let result = await query;
      total = result.length;
      rows = result;
    }
    return {
      total,
      rows,
    };
  }

  static async aggregateAndOffset(model, pipeline, opts) {
    let { offset = true, extraPipeline = [] } = opts;
    let total = 0;
    let rows = [];
    let sortAndOffsetPipeline = [];
    if (opts.sort) {
      sortAndOffsetPipeline.push({ $sort: opts.sort });
    } else {
      sortAndOffsetPipeline.push({ $sort: { _id: -1 } });
    }
    if (offset) {
      let _page = opts.page;
      let _rows = opts.rows;
      sortAndOffsetPipeline.push({ $skip: (_page - 1) * _rows }, { $limit: _rows });
      let result = await Promise.all([
        model.aggregate([...pipeline, { $count: 'count' }]),
        model.aggregate([...pipeline, ...sortAndOffsetPipeline, ...extraPipeline]),
      ]);
      total = result[0][0] ? result[0][0].count : 0;
      rows = result[1];
    } else {
      let result = await model.aggregate([...pipeline, ...sortAndOffsetPipeline, ...extraPipeline]);
      total = result.length;
      rows = result;
    }
    return {
      total,
      rows,
    };
  }
}

module.exports = PublicUtil;

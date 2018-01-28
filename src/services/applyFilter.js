const { sorter, select, filterQuery } = require('@feathersjs/commons')
const sift = require('sift')

module.exports = function (data, params) {
  // filter collected data
  const { query, filters } = filterQuery(params.query || {})
  console.log(query, filters)
  data = sift(query, data)
  const total = data.length
  if (filters.$sort) {
    data.sort(sorter(filters.$sort))
  }
  if (filters.$skip) {
    data = data.slice(filters.$skip)
  }
  if (typeof filters.$limit !== 'undefined') {
    data = data.slice(0, filters.$limit)
  }
  return Promise.resolve({
    total,
    limit: filters.$limit,
    skip: filters.$skip || 0,
    data: select(params)(data)
  })
}

const os = require('os')
const usage = require('usage')
const util = require('util')
const { sorter, select, filterQuery, _ } = require('@feathersjs/commons')
const sift = require('sift')

const getUsage = util.promisify(usage.lookup)

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    let data = []

    const cpus = os.cpus()
    data.push({group: 'host', name: 'architecture', value: os.arch()})
    data.push({group: 'host', name: 'cpu type', value: cpus[0].model})
    data.push({group: 'host', name: 'cpu cores', value: cpus.length})
    data.push({group: 'host', name: 'cpu speed (MHz)', value: cpus[0].speed})
    data.push({group: 'host', name: 'cpu load', value: os.loadavg()})
    data.push({group: 'host', name: 'memory total (bytes)', value: os.totalmem()})
    data.push({group: 'host', name: 'memory free (bytes)', value: os.freemem()})
    data.push({group: 'host', name: 'uptime (seconds)', value: os.uptime()})

    data.push({group: 'server', name: 'hostname', value: os.hostname()})
    const inet = os.networkInterfaces()
    Object.keys(inet).forEach(function(key) {
      const val = inet[key].map(function(v) {
        return v.address
      })
      data.push({group: 'server', name: 'network ' + key, value: val})
    })
    data.push({group: 'server', name: 'platform', value: os.platform()})
    data.push({group: 'server', name: 'release', value: os.release()})
    data.push({group: 'server', name: 'time', value: Date.now()})
    data.push({group: 'server', name: 'home directory', value: os.homedir()})
    data.push({group: 'server', name: 'temp directory', value: os.tmpdir()})
    const user = os.userInfo()
    data.push({group: 'server', name: 'user', value: user.username})
    data.push({group: 'server', name: 'user id', value: user.uid})
    data.push({group: 'server', name: 'user group', value: user.gid})
    data.push({group: 'server', name: 'user home', value: user.homedir})

    Object.keys(process.env).forEach(function(key) {
      const val = process.env[key]
      data.push({group: 'env', name: key, value: val})
    })

    data.push({group: 'node', name: 'process id', value: process.pid})
    data.push({group: 'node', name: 'parent process id', value: process.ppid})
    data.push({group: 'node', name: 'process name', value: process.title})
    data.push({group: 'node', name: 'node version', value: process.versions.node})
    data.push({group: 'node', name: 'v8 version', value: process.versions.v8})
    data.push({group: 'node', name: 'working directory', value: process.cwd()})
    data.push({group: 'node', name: 'process uptime (seconds)', value: process.uptime()})
    const result = await getUsage(process.pid)
    data.push({group: 'node', name: 'cpu usage (percent)', value: result.cpu})
    data.push({group: 'node', name: 'memory rss (byte)', value: result.memoryInfo.rss})
    data.push({group: 'node', name: 'memory virt (byte)', value: result.memoryInfo.vsize})

    const packageInfo = require('../../../package.json')
    data.push({group: 'node', name: 'alinex server version', value: packageInfo.version})

    // filter collected data
    const { query, filters } = filterQuery(params.query || {})
    data = sift(query, data)
    const total = data.length
    if (filters.$sort) {
      data.sort(this.sorter(filters.$sort))
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

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service

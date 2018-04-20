const os = require('os')
const usage = require('usage')
const util = require('util')
const mongoose = require('mongoose')
const applyFilter = require('../applyFilter')


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

    data.push({group: 'host', name: 'hostname', value: os.hostname()})
    const inet = os.networkInterfaces()
    const network = []
    Object.keys(inet).forEach(function (key) {
      let alias = 0
      inet[key].forEach(function (iface) {
        if (alias || iface.family !== 'IPv4' || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return
        }
        network.push(`${key} => ${iface.address}`)
        alias++
      })
    })
    data.push({group: 'host', name: 'network', value: network })
    data.push({group: 'host', name: 'platform', value: os.platform()})
    data.push({group: 'host', name: 'release', value: os.release()})
    data.push({group: 'host', name: 'time', value: Date.now()})
    data.push({group: 'host', name: 'home directory', value: os.homedir()})
    data.push({group: 'host', name: 'temp directory', value: os.tmpdir()})
    const user = os.userInfo()
    data.push({group: 'host', name: 'user', value: user.username})
    data.push({group: 'host', name: 'user id', value: user.uid})
    data.push({group: 'host', name: 'user group', value: user.gid})
    data.push({group: 'host', name: 'user home', value: user.homedir})

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
    data.push({group: 'node', name: 'event loop lag', value: await lag()})

    const packageInfo = require('../../../package.json')
    data.push({group: 'server', name: 'version', value: packageInfo.version})
    data.push({group: 'server', name: 'name', value: packageInfo.name})
    data.push({group: 'server', name: 'author', value: `${packageInfo.author.name} <${packageInfo.author.email}>`})
    data.push({group: 'server', name: 'copyright', value: packageInfo.copyright})

    data.push({group: 'mongo', name: 'server', value: this.options.app.get('mongodb')})
    data.push({group: 'mongo', name: 'version', value: await mongoVersion(this.options.app)})


    return applyFilter(data, params)
  }

}

function lag() {
  return new Promise(function(resolve) {
    const last = process.hrtime()
    setImmediate(function() {
      const delta = process.hrtime(last)
      resolve(`${delta[0]}s ${Math.round(delta[1]/1000)}ms`)
    })
  })
}

function mongoVersion(app) {
  return new Promise(function(resolve) {
    const mongoose = app.get('mongoose')
    const admin = new mongoose.mongo.Admin(mongoose.connection.db)
    admin.buildInfo(function (err, info) {
      resolve(info.version)
    })
  })
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service

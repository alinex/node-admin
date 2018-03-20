# Installation

The client installation depends on the device:
- Browser: access through the server root
- Desktop: download from server and install
- Mobile app: download from server (maybe later from play store and apple store)

To get the server up and running you have to install it on a linux system:

    $ npm install -g alinex-admin

## Run server

Start the server from it's installation directory using:

    $ npm start

Or use the global command (from the `bin` directory):

    $ admin-panel

You may also the environment settings to configure:

    $ export NODE_CONFIG='{"loglevel":"verbose"}'
    $ admin-panel

The most common JSON seetings are:
- `host` - use domain name or ip (default: localhost)
- `port` - server port used, lower range (<1024) are only possible if started as root (default: 3030)
- `loglevel` - 'error', 'warn', 'info', 'verbose', 'debug' or 'silly' (default on production: error)
- `mongodb` - database connection (default: "mongodb://localhost:27017/alinex_admin")

## Logs

The server logs will be written under `logs` directory:
- `access.log`
- `error.log`

Because no filehandles will be kept open it is safe to rotate the files using `logrotate` while the server is running.

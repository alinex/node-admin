# Configuration

The server setup is done in `config/default.json`. All values defined there are set within the app for later use.
Also the `<NODE_ENV>.json` is loaded, and if found, extend the default configuration.

So if you start the server using `NODE_ENV=production` the `config/production.json` will be used and overwrite the default settings. This is what already is done using the following command to start:

    $ npm start

## Environment

With the help of environment variables you may not only decide which configuration to use but you may also overwrite some values directly:

This allows you to override any configuration from the command line or shell environment. The `NODE_CONFIG` environment variable must be a JSON formatted string. Any configurations contained in this will override the configurations found and merged from the config files.

    $ export NODE_CONFIG='{"loglevel":"verbose"}'
    $ npm start

## Settings

__host__ and __port__

This is used to define there the server runs. If you use a port in the lower range (<1024) the server has to be started with root privilegs. Alternatively you may use a higher port and set a NAT routing for port 443 or 80.

    "host": "localhost",
    "port": 3030,

But keep in mind that if you change the server url the client has to be changed, too. You have to build the client with the new url because it is hardcoded within the client at build time.

__loglevel__

Set the level to be reported (including all levels before): 'error', 'warn', 'info', 'verbose', 'debug' or 'silly'. For production best is to use 'error' or 'info'.

    "loglevel": "info",

The logging will include:
- 'error' - error messages
- 'info' - each request
- 'verbose' - parameters and response values to the requests
- 'debug' - show request headers

__public__

This sets the directory used for the public files which are served by the application without changes.

    "public": "../public/",

__paginate__

This sets the default values if pagination is used.

    "paginate": {
      "default": 10,
      "max": 50
    },

__authentication__

Here you may change the complete setup of the user authentication.

    "authentication": {
      "secret": "8e7ea4c...",
      "strategies": [
        "jwt",
        "local"
      ],
      "path": "/authentication",
      "service": "users",
      "jwt": {
        "header": {
          "typ": "access"
        },
        "audience": "https://yourdomain.com",
        "subject": "anonymous",
        "issuer": "feathers",
        "algorithm": "HS256",
        "expiresIn": "1d"
      },
      "local": {
        "entity": "user",
        "usernameField": "email",
        "passwordField": "password"
      }
    },

__nedb__ and __mongodb__

This settings define the data stores which may be used like `nedb` for file store and `mongodb` for document database.

    "nedb": "../data",
    "mongodb": "mongodb://localhost:27017/alinex_admin"

As far as possible only `mongodb` should be used.

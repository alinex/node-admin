# Structure

## Configuration

Within the `config` directory the following configurations:

    default.json      # base configuration
    production.json   # used if run with NODE_ENV=production (`npm start`)

In this files you may change something like the `hostname`, `port` or the authentication.
More complex things should be changed in the code.

## Static, public

Within the `/public` path I have all files which will be served directly as they are:

    index.html        # the homepage
    web/              # the web client (supporting history mode)
    download/         # links to desktop app downloads
    error/            # error pages will be used on demand
      401.html
      404.html
      default.html

To integrate the development web client the `web` directory is a softlink to the client's `dist` directory.

## Logs

While started using `npm` the logs will be stored automatically into the `logs` directory:

    access.log
    error.log

## Codebase

The base files are:

    index.js            # Start script used to run the server
    app.js              # Setup of the express server and the middleware
    app.hooks.js        # General hooks
    logger.js           # Setup for winston logger
    authentication.js   # Setup of authentication
    channel.js          # setup of communication chanels to the client

And then the concrete logic is split in the following directories:

    middleware          # for additional middleware
    services            # all the REST services
    hooks               # scripts to be used in hook setups
    models              # data models

### Middleware

Are additional components which are loaded globally. This are e.g.:
- mongoose connection
- authentication
- logtail
- swagger

### Services

Each service is organized as a directory and contains at least three files:

    index.js           # the service setup
    hooks.js           # linking to hook scripts
    api.js             # API documentation (used by swagger)

To have a quick look what is going on, you may call the `/logtail` middleware to
check the last lines in the log.

### Hooks

Hooks are handler which are globally stored to be used in multiple services.
They are loaded into the service and referenced in it's hooks.

Common hooks are:
- logger - used for debugging and logs the service call before or after
- gravatar - adds gravatar url as `avatar` from `email`
- process-messages - checks new messages
- populate-user - add `user` data for `userId`

### Models

Data models for object bridges for the data store like mongoDB or RDBMS.

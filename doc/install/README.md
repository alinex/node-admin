# Installation

At first said this is more of a work base than a ready to install programm.
So you have to install the development version, configure and build your system and deploy it.

## Install Server

To get the server up and running you have to install it on a linux system:

    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install -y nodejs

At the moment there is no NPM package but I will make one later. This should be simply installable by:

    $ npm install -g alinex-admin

Alternatively you may also download and install the code from github:

    $ clone https://github.com/alinex/node-admin
    $ cd node-admin
    $ npm install

Setup live system:

    $ echo "export NODE_ENV=production" >> ~/.bash_profile
    $ source ~/.bash_profile

## Install MongoDB Server

As some modules use it as data store you have to use a local or remote MongoDB server:

    $ apt-get install mongodb

This will install MongoDB. Afterwards you have to create a first user account by hand to be able to login. The following code shows how to do so with the included start records.

    $ mongo alinex_admin < bin/setup.mongo
    MongoDB shell version: 2.6.10
    connecting to: alinex_admin
    WriteResult({ "nInserted" : 1 })

If you need host, port and user then call it like:

    $ mongo admin --host localhost --port 30222 -u alinex_mongoadmin -p kapu873jud < bin/setup.mongo

You may also use another name for the database instead of `alinex_admin`. But you have to change it in the configuration, too.

Now you have the default user and rights and are able to do the rest online through the system itself. Use the login displayed as placeholder in the form and delete this user later.

If you use another address for your mongodb server, set it within `config/production.json` as variable `mongodb` like:

    "mongodb": "mongodb://alinex_mongoadmin:mi2zae8Cai@localhost:31544"

## Add Client Code

The server itself works, but you should put the correct client also onto it. If you installed through npm this is already done else you should build the client as followed on a build machine:

    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ dpkg --add-architecture i386 && apt-get update
    $ sudo apt-get install -y nodejs make zip git g++ mongodb wine wine-development wine32-development
    $ wget https://dl.winehq.org/wine/wine-gecko/2.44/wine_gecko-2.44-x86_64.msi
    $ wine-development msiexec /i wine_gecko-2.44-x86.msi

Then you can download the clinet code and install it:

    $ git clone https://github.com/alinex/node-admin-client
    $ cd node-admin-client
    $ npm install

To build and install the client into the server use:

    $ API=http://192.168.11.7:3030 npm run build
    $ DEPLOY=root@192.168.11.7;/opt/admin npm run deploy

This command will build the website and electron builds and deploy them on the admin server.

If you have installed the admin server locally from source beside the client, it is already connected with symlinks.

## Run server

Start the server from it's installation directory using:

    $ npm start

Or use the global command (from the `bin` directory):

    $ admin-panel

To run it as a daemon you may call it using nohup or better use `pm2`.

You may also the environment settings to configure:

    $ export NODE_CONFIG='{"loglevel":"verbose"}'
    $ admin-panel

The most common JSON seetings are:
- `host` - use domain name or ip (default: localhost)
- `port` - server port used, lower range (<1024) are only possible if started as root (default: 3030)
- `loglevel` - 'error', 'warn', 'info', 'verbose', 'debug' or 'silly' (default on production: error)
- `mongodb` - database connection (default: "mongodb://localhost:27017/alinex_admin")

### Logs

The server logs will be written under `logs` directory:
- `access.log`
- `error.log`

Because no filehandles will be kept open it is safe to rotate the files using `logrotate` while the server is running.

## Install Client

The client installation depends on the device:
- Browser: access through the server root
- Desktop: download from server and install
- Mobile app: download from server (maybe later from play store and apple store)


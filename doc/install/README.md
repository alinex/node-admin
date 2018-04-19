# Installation

The client installation depends on the device:
- Browser: access through the server root
- Desktop: download from server and install
- Mobile app: download from server (maybe later from play store and apple store)

To get the server up and running you have to install it on a linux system:

    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install -y nodejs
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

## Develop Server

First install the general software:

    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ dpkg --add-architecture i386 && apt-get update
    $ sudo apt-get install -y nodejs make zip git g++ mongodb wine wine-development wine32-development
    $ wget https://dl.winehq.org/wine/wine-gecko/2.44/wine_gecko-2.44-x86_64.msi
    $ wine-development msiexec /i wine_gecko-2.44-x86.msi

Then you can download server and admin and install them:

    $ mkdir admin   
    $ cd admin
    $ git clone https://github.com/alinex/node-admin-client
    $ cd node-admin-client
    $ npm install
    $ cd ../node-admin
    $ git clone https://github.com/alinex/node-admin
    $ cd node-admin
    $ npm install

Setup local database with initial login:

    $ mongo
    MongoDB shell version: 2.6.10
    connecting to: test
    > use alinex_admin
    switched to db alinex_admin
    > db.users.insert({ "_id" : ObjectId("5a9ee71276122f55a3a94796"), "email" : "info@alinex.de", "password" : "$2a$12$OspunsZCdSM.yzMAr6N/r.K13vRGF02Oc5kcQBzPWUQejr6yBSW.2", "nickname" : "alinex", "disabled": false, "createdAt" : ISODate("2018-03-06T19:08:02.271Z"), "updatedAt" : ISODate("2018-03-06T19:08:02.271Z"), "__v" : 0 })
    WriteResult({ "nInserted" : 1 })

Now both are working in their directories using `npm run dev` or other commands.

## Build client

Therefore call the following commands within the client directory:

    $ API=http://192.168.11.7:3030 npm run build
    $ DEPLOY=root@192.168.11.7;/opt/admin npm run deploy

This command will build the website and electron builds and deploy them on the admin server.

If you have installed the admin server locally from source beside the client, it is already connected with symlinks.
 
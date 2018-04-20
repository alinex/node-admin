# Info Service

This service is publically available for debugging. It displays server information mainly used for debugging and analyzation.

## Model

The service will deliver record lists with:
- __group__ - string name like 'host', 'node', ...
- __name__ - string short name for the value
- __value__ - concrete value, mostly also string type

## find - information list

You can get a lot of server information using:

    $ curl -sX GET http://localhost:3030/info/ | prettyjson | head
    -
      group: host
      name:  architecture
      value: x64
    -
      group: host
      name:  cpu type
      value: Intel(R) Core(TM) i7-6500U CPU @ 2.50GHz

All in all this is a very large list but you may reduce it by selecting a specific
grooup of information:

    $ curl -sX GET http://localhost:3030/info/?group=node | prettyjson
    -
      group: node
      name:  process id
      value: 15459
    -
      group: node
      name:  parent process id
    -
      group: node
      name:  process name
      value: /home/alex/.nvm/versions/node/v8.9.3/bin/node

Using this method you can get a lot of information from the server. The Admin Application also has a info module which will show all of this in a pretty table.

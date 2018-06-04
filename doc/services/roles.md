# Roles Service

The role service will be used internally by the authorization service to get the users's abilities.
Also it is used within the access rights management through the client.

Only for authenticated users.

## Model

The roles have the following fields:

- `_id` - object id
- `__v` - integer // version id
- `name` - string
- `description`? - string
- `enabled`? - boolean // default is `false`
- `abilities` - list
  - `_id` - object id
  - `actions` - 'read', 'update', 'create', 'delete'
  - `subject` - name
  - `conditions`? - { field: check, ... }
  - `fields`? - name, ...
  - `inverted`? - flag // default is `false`
  - `reason`? - string // mainly to specify why user can't do something. See forbidden reasons for details
- `createdAt` - date/time account created at
- `updatedAt` - date/time the record was last changed

## find - list roles

    $ curl -H "Authorization: Bearer $JWT" -sX \
      GET http://localhost:3030/roles | prettyjson

## get - role record

Get a list of users.

    $ curl -H "Authorization: Bearer $JWT" -sX \
      GET http://localhost:3030/users/429ee71276122f55a3a94796 | prettyjson 

    _id:       429ee71276122f55a3a94796
    email:     demo@alinex.de
    nickname:  demo
    createdAt: 2018-03-06T19:08:02.271Z
    updatedAt: 2018-04-20T15:03:19.870Z
    __v:       0
    name:      Demo User
    position:  Test
    avatar:    https://www.gravatar.com/avatar/dc23461c186acb6dacd8e6137543fdec?s=60&d=mm

## create - new role

Create new role.

    $ curl -H "Authorization: Bearer $JWT" -sX \
      POST http://localhost:3030/roles \
      -H 'Content-Type: application/json' \
      --data-binary '{ "name" : "account-manager", "abilities": [{ "actions": ["read", "update"],  "subject": "users", "conditions": { "_id": "ME" } }] }' | prettyjson

    _id:       5b15a32a9b0fe539abcdd037
    name:      account-manager
    abilities: 
      - 
        actions: 
          - read
          - update
        subject: 
          - users
        fields: 
          (empty array)
        _id:        5b15a32a9b0fe539abcdd038
        conditions: 
          _id: ME
    createdAt: 2018-06-04T20:38:02.046Z
    updatedAt: 2018-06-04T20:38:02.046Z
    __v:       0

## update - replace record

## patch - change some values

## remove - role

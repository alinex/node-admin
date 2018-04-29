# User Service

The user service will be used internally by the authentication service to check for authenticated users.
Also it is used for user management and client.

The service is partly secured.

## Model

The user has the following fields are used:
- `email` - email address used for login
- `password` - `bcrypt` encrypted password
- `nickname` - nickname used to be displayed in the system
- `name` - fullname (for administration only)
- `position` - position within this area
- `avatar` - gravatar link as user icon
- `disabled` - flag to disable user
- `createdAt` - date/time account created at
- `updatedAt` - date/time the record was last changed

## find - list users

Only for authenticated users.

    $ curl -H 'Authorization: Bearer ?????-jwt-token-??????' 
      -sX GET http://localhost:3030/users | prettyjson
      
    total: 2
    limit: 10
    skip:  0
    data: 
      - 
        _id:       5a9ee71276122f55a3a94796
        email:     info@alinex.de
        createdAt: 2018-03-06T19:08:02.271Z
        updatedAt: 2018-03-06T19:08:02.271Z
        __v:       0
      - 
        _id:       429ee71276122f55a3a94796
        email:     demo@alinex.de
        nickname:  demo
        createdAt: 2018-03-06T19:08:02.271Z
        updatedAt: 2018-04-20T15:03:19.870Z
        __v:       0
        name:      Demo User
        position:  Test
        avatar:    https://www.gravatar.com/avatar/dc23461c186acb6dacd8e6137543fdec?s=60&d=mm

## get - user record

Get a list of users.

Only for authenticated users.

    $ curl -H 'Authorization: Bearer ?????-jwt-token-??????' 
      -sX GET http://localhost:3030/users/429ee71276122f55a3a94796 | prettyjson 

    _id:       429ee71276122f55a3a94796
    email:     demo@alinex.de
    nickname:  demo
    createdAt: 2018-03-06T19:08:02.271Z
    updatedAt: 2018-04-20T15:03:19.870Z
    __v:       0
    name:      Demo User
    position:  Test
    avatar:    https://www.gravatar.com/avatar/dc23461c186acb6dacd8e6137543fdec?s=60&d=mm

## create - new user

Create new user.

Only for authenticated users, password will be encrypted.

    $ curl -H 'Authorization: Bearer ?????-jwt-token-??????' 
      -sX POST http://localhost:3030/users
      -H 'Content-Type: application/json'
      --data-binary '{ "email" : "demo@alinex.de", "password" : "demo123", "nickname" : "demo", "disabled": false, "name" : "Demo User", "position" : "Test" }' | prettyjson

## update - replace record

Only for authenticated users, password will be encrypted.

## patch - change some values

Only for authenticated users, password will be encrypted.

## remove - user

Only for authenticated users.

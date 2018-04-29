# Chat Messages

The user service will be used internally by the authentication service to check for authenticated users.
Also it is used for user management and client.

The service is partly secured.

## Model

The user has the following fields are used:
- `userId` - reference to users entry
- `text` - message text
- `createdAt` - date/time account created at
- `updatedAt` - date/time the record was last changed

## find - list messages

Only for authenticated users.

    $ curl -H 'Authorization: Bearer ?????-jwt-token-??????' 
      -sX GET http://localhost:3030/users | prettyjson


## get - message record

Only for authenticated users.

## create - new message

Only for authenticated users.

    $ curl -H 'Authorization: Bearer ?????-jwt-token-??????' 
      -sX POST http://localhost:3030/messages
      -H 'Content-Type: application/json'
      --data-binary '{ "text" : "Hello to all of you." }' | prettyjson

    _id:       5ae4ced856d93b1bb460ecf7
    text:      Hello to all of you.
    userId:    5a9ee71276122f55a3a94796
    createdAt: 2018-04-28T19:43:20.056Z
    updatedAt: 2018-04-28T19:43:20.056Z
    __v:       0
    user: 
      _id:       5a9ee71276122f55a3a94796
      email:     info@alinex.de
      createdAt: 2018-03-06T19:08:02.271Z
      updatedAt: 2018-04-23T20:31:33.083Z
      __v:       0
      avatar:    https://www.gravatar.com/avatar/8a7755061e11e21d134a88e6a7a59b40?s=60&d=mm
      name:      Alexander Schilling
      nickname:  Alinex

## update - replace record

Only for authenticated users.

## patch - change some values

Only for authenticated users.

## remove - message

Only for authenticated users.

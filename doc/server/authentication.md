# Authentication

To make authentication easy and secure [JWT](https://auth0.com/docs/jwt) is used. This allows to use stateless server cluster and be easy to scale.

The JWT defines a compact and self-contained way for securely transmitting information between parties as a signed JSON object.
As storage a mongo DB is used. This may be loacal.

## Setup

As the users are stored in the mongo database you can use the `mongo` client to create your first user:

    $ mongo
    MongoDB shell version: 2.6.10
    connecting to: test
    > use alinex_admin
    switched to db alinex_admin
    > db.users.find()
    { "_id" : ObjectId("5a9ee71276122f55a3a94796"), "email" : "info@alinex.de", "password" : "$2a$12$OspunsZCdSM.yzMAr6N/r.K13vRGF02Oc5kcQBzPWUQejr6yBSW.2", "createdAt" : ISODate("2018-03-06T19:08:02.271Z"), "updatedAt" : ISODate("2018-03-06T19:08:02.271Z"), "__v" : 0 }

The following fields are used:
- email - email address used for login
- password - `bcrypt` encrypted password
- createdAt - date/time account created at
- updatedAt - date/time the record was last changed

## Login

Now you may get the JWT:

    $ curl -sX GET http://localhost:3030/authentication
      -H 'Content-Type: application/json'
      --data-binary '{ "strategy": "local", "email": "info@alinex.de", "password": "secret" }' | prettyjson
    accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiIxNGtyWGJ0RnJaSTJ1VmJsIiwiaWF0IjoxNTE1NDIxMzQ2LCJleHAiOjE1MTU1MDc3NDYsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjFlZGZkODc0LWNlMWEtNDNkZS05OTRlLTI4MzI1NDRiZDFlYyJ9.Zwu5XxxNu5QC6K53j358rCXFyiPIFu5TlrKoohq7Khs

This access Token can now be used to access restricted services:

    $ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiIxNGtyWGJ0RnJaSTJ1VmJsIiwiaWF0IjoxNTE1NDI1NTg0LCJleHAiOjE1MTU1MTE5ODQsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjkyMGZhY2IwLWVmZTItNDc1MS1iNGJjLTYyNGFiNDNmZmRmNyJ9.x4jSVMIMpVV7j0_ei402DvckHWUcgi0xOiO9r2trY68'
      -sX GET http://localhost:3030/messages

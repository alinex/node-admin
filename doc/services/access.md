# Access Control

This part contains services for authentication and authorization.

![Authentication & Authorization](auth.svg)

## Storage

All information to do authorization and authentication is stored in mongo DB collections: `users` and `roles`. Find out more about these in the administration services: [users](users.md) and [roles](roles.md).

## Authentication

As displayed in the graphic the user may come with Login Data, an Jason Web Token (JWT) or nothing. The authentication will identify the user and check it'S identification against validity.

To make authentication easy and secure [JWT](https://auth0.com/docs/jwt) is used. This allows to use stateless server cluster and be easy to scale.

### Json Web Token (JWT)

It is defined as an open standard in [RFC 7519](https://tools.ietf.org/html/rfc7519) and defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

The JWT defines a compact and self-contained way for securely transmitting information between parties as a signed JSON object consisting of three parts:

- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following with all three parts being Base64 encoded:

    xxxxx.yyyyy.zzzzz

#### Header

The header typically consists of two parts: the type of the token, which is JWT, and the hashing algorithm being used, such as HMAC SHA256 or RSA.

    {
      "alg": "HS256",
      "typ": "JWT"
    }

#### Payload

The second part of the token is the payload, which contains the claims. Claims are statements about the user.

The JWT specification defines seven claims that can be included in a token. These are registered claim names, and they are:

    iss - issuer: identifies the principal that issued the JWT
    sub - subject: identifies the principal that is the subject of the JWT
    aud - audience: identifies the recipients that the JWT is intended for as
          string or array
    exp - expirarion time: identifies the expiration time on or after which the
          JWT MUST NOT be accepted for processing
    nbf - not brfore: identifies the time before which the JWT MUST NOT be accepted
          for processing
    iat - issued at: identifies the time at which the JWT was issued
    jti - unique identifier: provides a unique identifier for the JWT

For your specific use case, you might then use what are called [public claim names](https://www.iana.org/assignments/jwt/jwt.xhtml) like:

    name - full name
    nickname - casual name
    gender - gender    
    email - preferred e-mail address

Finally, there are private claim names, which you can use as needed.

An example of payload could be:

    {
      aud: "https://yourdomain.com",
      email: "info@alinex.de",
      exp: 1521137648,
      iat: 1521051248,
      iss: "feathers",
      jti: "5fe711a3-b2e9-4bb5-af1d-3cfaa948eb43",
      sub: "anonymous",
      userId: "5a9ee71276122f55a3a94796"
    }

#### Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that like:

    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way. Only the server knows the secret so no one can make a valid JWT as the server itself and only accepts his own JWT.

As an example, if the JWT is changed on the way to the client or back on the next action the server will reject.

### Setup the JWT payload

The JWT payload may be specified within the `middleware/authentication.js`:

    app.service('authentication').hooks({
      before: {
        create: [
          authentication.hooks.authenticate(config.strategies),
          context => {
            // make sure params.payload exists
            context.params.payload = context.params.payload || {}
            // merge in additional properties
            Object.assign(context.params.payload, {
              email: context.params.user.email
            })
          }
        ],
        remove: [
          authentication.hooks.authenticate('jwt')
        ]
      }
    })

Keep in mind that the payload is sent on every request/response. So keep it as small as possible. Also the defined secret (see [configuation](config.md)) have to be larger than the payload for increased security.

### Login

Now you may get the JWT:

    $ curl -sX \
      POST http://localhost:3030/authentication \
      -H 'Content-Type: application/json' \
      --data-binary '{ "strategy": "local", "email": "demo@alinex.de", "password": "demo123" }' | prettyjson

    accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiIxNGtyWGJ0RnJaSTJ1VmJsIiwiaWF0IjoxNTE1NDIxMzQ2LCJleHAiOjE1MTU1MDc3NDYsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjFlZGZkODc0LWNlMWEtNDNkZS05OTRlLTI4MzI1NDRiZDFlYyJ9.Zwu5XxxNu5QC6K53j358rCXFyiPIFu5TlrKoohq7Khs

To work easy within the shell I will store the token in a shell variable:

    $ export JWT=$(curl -sX \
      POST http://localhost:3030/authentication \
      -H 'Content-Type: application/json' \
      --data-binary '{ "strategy": "local", "email": "demo@alinex.de", "password": "demo123" }' \
      | prettyjson --nocolor | awk '{print $2}' )

This access Token can now be used to access restricted services:

    $ curl -H "Authorization: Bearer $JWT" -sX \
      GET http://localhost:3030/messages \
      | prettyjson

## Authorization

After the user is identified the authorization will check the user's abilities. Which is what the user is allowed to do.

### Roles

For easy administration the user rights are specified through roles which combine some abilities to a named group. Each user can now be set on multiple roles, which define what he is allowed to do.

- name: string
- description?: string
- enabled?: flag // default is `false`
- abilities: list

The roles are stored in the MongoDB collection `roles` containing also the defined abilities as a list.

### Abilities

An ability is a right to do something. It contains:

- actions: 'read', 'update', 'create', 'delete'
- subject: name
- conditions?: { field: check, ... }
- fields?: name, ...
- inverted?: flag // default is `false`
- reason?: string // mainly to specify why user can't do something. See forbidden reasons for details

### Cache

To speed up this task an LRU-Cache is used.

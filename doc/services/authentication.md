# Authentication

To make authentication easy and secure [JWT](https://auth0.com/docs/jwt) is used. This allows to use stateless server cluster and be easy to scale.

As storage of the users a mongo DB is used.

## Json Web Token (JWT)

It is defined as an open standard in [RFC 7519](https://tools.ietf.org/html/rfc7519) and defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

The JWT defines a compact and self-contained way for securely transmitting information between parties as a signed JSON object consisting of three parts:
- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following with all three parts being Base64 encoded:

    xxxxx.yyyyy.zzzzz

__Header__

The header typically consists of two parts: the type of the token, which is JWT, and the hashing algorithm being used, such as HMAC SHA256 or RSA.

    {
      "alg": "HS256",
      "typ": "JWT"
    }

__Payload__

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

__Signature__

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that like:

    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way. Only the server knows the secret so no one can make a valid JWT as the server itself and only accepts his own JWT.

As an example, if the JWT is changed on the way to the client or back on the next action the server will reject.

## Setup the JWT payload

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

## Login

Now you may get the JWT:

    $ curl -sX POST http://localhost:3030/authentication
      -H 'Content-Type: application/json'
      --data-binary '{ "strategy": "local", "email": "info@alinex.de", "password": "secret" }' | prettyjson
    accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiIxNGtyWGJ0RnJaSTJ1VmJsIiwiaWF0IjoxNTE1NDIxMzQ2LCJleHAiOjE1MTU1MDc3NDYsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjFlZGZkODc0LWNlMWEtNDNkZS05OTRlLTI4MzI1NDRiZDFlYyJ9.Zwu5XxxNu5QC6K53j358rCXFyiPIFu5TlrKoohq7Khs

This access Token can now be used to access restricted services:

    $ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiIxNGtyWGJ0RnJaSTJ1VmJsIiwiaWF0IjoxNTE1NDI1NTg0LCJleHAiOjE1MTU1MTE5ODQsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjkyMGZhY2IwLWVmZTItNDc1MS1iNGJjLTYyNGFiNDNmZmRmNyJ9.x4jSVMIMpVV7j0_ei402DvckHWUcgi0xOiO9r2trY68'
      -sX GET http://localhost:3030/messages


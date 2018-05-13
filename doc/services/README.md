# Available Services

The following services are available. This is a detailed documentation with described examples but you may also use the integrated Swagger interface for a short overview of the methods and to test them out.

A lot of services needs login before they can they used. This is done with the authentication service and to use it in shell we use the following method to login:

    $ export JWT=$(curl -sX \
      POST http://localhost:3030/authentication \
      -H 'Content-Type: application/json' \
      --data-binary '{ "strategy": "local", "email": "demo@alinex.de", "password": "demo123" }' \
      | prettyjson --nocolor | awk '{print $2}' )

Further on the examples will use the `$JWT` to access restricted methods.

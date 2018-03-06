# Configuration

The server setup is done in `config/default.json` and `config/production.json`. All values defined are set within the app for later use.

    {
      "host": "localhost",
      "port": 3030,
      "public": "../public/",
      "paginate": {
        "default": 10,
        "max": 50
      },
      "authentication": {
        "secret": "8e7ea4c...",
        "strategies": [
          "jwt",
          "local"
        ],
        "path": "/authentication",
        "service": "users",
        "jwt": {
          "header": {
            "typ": "access"
          },
          "audience": "https://yourdomain.com",
          "subject": "anonymous",
          "issuer": "feathers",
          "algorithm": "HS256",
          "expiresIn": "1d"
        },
        "local": {
          "entity": "user",
          "usernameField": "email",
          "passwordField": "password"
        }
      },
      "nedb": "../data",
      "mongodb": "mongodb://localhost:27017/alinex_admin"
    }

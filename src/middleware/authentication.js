const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')

// class CustomVerifier extends jwt.Verifier {
//   // The verify function has the exact same inputs and 
//   // return values as a vanilla passport strategy
//   verify(req, payload, done) {
//     // do your custom stuff. You can call internal Verifier methods
//     // and reference this.app and this.options. This method must be implemented.
// 
//     // the 'user' variable can be any truthy value
//     // the 'payload' is the payload for the JWT access token that is generated after successful authentication
//     done(null, false, payload)
//   }
// }

module.exports = function (app) {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  // app.configure(jwt({ Verifier: CustomVerifier }))
  app.configure(jwt())
  app.configure(local())

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
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
}

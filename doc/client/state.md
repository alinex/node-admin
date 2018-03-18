# State Management

State management allows objects to have one or more states. As a state changes, the correct chain of events will be fired of and appropriate properties will be modified. By defining and separating the concepts involved in state management and enforcing certain rules, this gives the code more structure and maintainability.

![vuex](vuex.png)

## Store

The store is basically a container that holds the application state. It is reactive so a change of state will also trigger the change of elements using this state. And the only way to change state is to commit mutations. This ensures every state change leaves a track-able record, and enables tooling that helps us better understand the applications.

By providing the store option to the root instance, the store will be injected into all child components of the root and will be available on them as `this.$store`:

    computed: {
      count () {
        return this.$store.state.count
      }
    }

## State

Vuex uses a single state tree including all application level state objects and serves as the "single source of truth". For debugging the application a snapshot of the state tree may help. To modularize the application the single state tree is split into sub modules.

The `mapState` helper which generates computed getter functions for us, saving us some keystrokes:

    // in full builds helpers are exposed as Vuex.mapState
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: mapState({
        // arrow functions can make the code very succinct!
        count: state => state.count,
        // passing the string value 'count' is same as `state => state.count`
        countAlias: 'count',
      })
    }

We can also pass a string array to mapState when the name of a mapped computed property is the same as a state sub tree name.

    computed: mapState([
      // map this.count to store.state.count
      'count'
    ])

Use the spread operator to mix the outer object with the state object:

    computed: {
      localComputed () { .... },
      ...mapState({
        // ...
      })
    }

## Getters

Getters are methods defined in the store to retrieve derived states:

    const store = new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
      }
    })

You can then call them using:

    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodosCount
      }
    }

The `mapGetters` helper simply maps store getters to local computed properties:

    import { mapGetters } from 'vuex'

    export default {
      // ...
      computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'doneTodosCount'
        ])
      }
    }

## Mutations

The only way to actually change state in a Vuex store is by committing a mutation. Vuex mutations are very similar to events: each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will receive the state as the first argument:

    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })

The mutation is calles using a commit:

    store.commit('increment')

Keep in mind that all mutations have to be synchronous.

Also a helper is there to map mutations directly to component methods:

    import { mapMutations } from 'vuex'

    export default {
      // ...
      methods: {
        ...mapMutations([
          'increment', // map `this.increment()` to `this.$store.commit('increment')`

          // `mapMutations` also supports payloads:
          'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
          add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
        })
      }
    }

## Actions

Actions are similar to mutations, in reality actions will trigger mutations.
The real differences is that they may be asynchronous.

    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })

As before you may use `mapActions` here.

## Modules

Due to using a single state tree, all state of our application is contained inside one big object. However, as our application grows in scale, the store can get really bloated.

To help with that, Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules.

### Auth

The auth module is used for authentication through login/logout processes. 

It contains the following actions:
- `authenticate({ strategy: 'local', email, password })`
- `logout()`

States are:
- `auth.accessToken` - the encrypted JWT string
- `auth.errorOnAuthenticate` - `Error` which occured on last login
- `auth.errorOnLogout` - `Error` which occured on last logout
- `auth.isAuthenticatePending` - 'true' while login in progress
- `auth.isLogoutPending` - 'true' while logout in progress
- `auth.payload` - JWT payload data (decrypted)
- `auth.user` - record from the `users` service

### Users

This is used to access user information.

## Feathers integration

To use feathers client to connect services with the server and do authentication we use [feathers-vuex](https://github.com/feathers-plus/feathers-vuex). 

This is done by setting the store like:

    import Vue from 'vue'
    import Vuex from 'vuex'
    import feathersVuex from 'feathers-vuex'
    import feathersClient from '../feathers'

    const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

    Vue.use(Vuex)

    const store = new Vuex.Store({
      plugins: [
        service('users'),
        auth({ userService: 'users' })
      ]
    })

    export default store

As you see we connect the `users` service and initialize the authentication together with the users service.

To login or logout you should use the actions from the store:

    methods: {
      ...mapActions('auth', ['authenticate', 'logout'])
    }

Call login like:

    this.authenticate({
      strategy: 'local',
      email: 'info@alinex.de',
      password: 'secret'
    })
      .catch(() => {
        console.log(this.$store.state.auth.errorOnAuthenticate.message)
      })

This will set the store with the following data:

    auth:
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTllZTcxMjc2MTIyZjU1YTNhOTQ3OTYiLCJlbWFpbCI6ImluZm9AYWxpbmV4LmRlIiwiaWF0IjoxNTIxMzIxMzY3LCJleHAiOjE1MjE0MDc3NjcsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjY5YmEzMmFlLWZjZTEtNGU1ZC1hZDc2LTE5YjhhMjQwYzRlOSJ9.GNHPQhp9_H1EJb8rhamprBQr9ACSgFcmp5n3gIWKQbI"
      errorOnAuthenticate: null
      errorOnLogout: null
      isAuthenticatePending: false
      isLogoutPending: false
      payload:
        aud: "https://yourdomain.com"
        email: "info@alinex.de"
        exp: 1521407767
        iat: 1521321367
        iss: "feathers"
        jti: "69ba32ae-fce1-4e5d-ad76-19b8a240c4e9"
        sub: "anonymous"
        userId: "5a9ee71276122f55a3a94796"
      user:
        __v:0
        _id: "5a9ee71276122f55a3a94796"
        createdAt: "2018-03-06T19:08:02.271Z"
        email: "info@alinex.de"
        updatedAt: "2018-03-06T19:08:02.271Z"
        userService: "users"


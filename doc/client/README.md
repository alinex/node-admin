# Client

The client part is developed separately as [alinex-admin-client](https://github.com/alinex/node-admin-client) package. But the ready to use build files are included in the server directly.

## Development

The development code of the client will be transpiled using babel, webpack...
Therefore it is possible to use all modern features and also import/export for modules.

## Technology

The client is build using the [Quasar Framework](http://quasar-framework.org) which works with the [Vue.js](https://vuejs.org) library.

Additional Libraries:
- [FeathersJS Client](https://github.com/feathersjs/client) for server connection
- [Vuex](https://vuex.vuejs.org/en/intro.html) for state management
- [feathers-vuex](https://github.com/feathers-plus/feathers-vuex) to connect state to server
- [Vuelidate](https://monterail.github.io/vuelidate/) for validation
- [vue-i18n](http://kazupon.github.io/vue-i18n/en/) for app translations

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

## Mutations

## Actions

## Modules

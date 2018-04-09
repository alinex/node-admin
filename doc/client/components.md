# Components

In addition to the [Quasar Components](http://quasar-framework.org/components/) this application contains some additional ones.

## ax-loader

A component to make the elements visible only after the loading is finished and block them while sending data. In this time a spinner will be displayed.

    <template>
      ...
      <ax-loader :loading="loading" :sending="sending">
        ...content...
      </ax-loader>
      ...
    </template>

    <script>
    import axLoader from '../../components/axLoader'

    export default {
      data: () => ({
        ...
        loading: true,
        sending: false
      }),
      methods: {
        async send () {
          this.sending = true
          ... interact wih server
          this.sending = false
        }
      },
      async created () {
        ... initialize
        this.loading = false
      },
      components: { axLoader }
    }
    </script>

You put it arround your content and add the two boolean properties:
- `loading` - keep content away while not loaded
- `sending` - prevent changes on content while sending data

You don't need to supply both parameters, one is enough.

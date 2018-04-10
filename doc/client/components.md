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
    import axLoader from 'components/axLoader'

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

## ax-form-group

This element will build a responsive form part with title and content block.

Use it like:

    <template>
      ...
      <ax-form-group title="Part 1" subtitle="This part is neccessary, to...">
        <!-- content of the form -->
        <q-field icon="email" label="Email">
          <q-input v-model.trim="user.email" type="email" />
        </q-field>
      </ax-form-group>
      ...
    </template>

    <script>
    import axFormGroup from 'components/axFormGroup'

    export default {
      ...
      components: { axFormGroup }
    }
    </script>

As you see above you put it arround your form fields and may provide two parameters for the group header:
- `title`
- `subtitle`

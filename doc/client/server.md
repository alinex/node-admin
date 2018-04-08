# Server Connection

The client will connect to the REST server using the [FeathersJS Client](https://github.com/feathersjs/client). This is completely integrated into the client app.
The server URL will be 
- the URL given as `API` environment setting while building or
- port 3030 on the same host in development or
- a url defined in quasar.conf for production

It may be used directly or through the state management store described in the next chapter.

The base configuration is done in the `plugins/feathers.js`.

Keep in mind that if a page needs data which will be retrieved from the server you better put this into the `ax-loader` component to not run in to error because of uninitialized data.

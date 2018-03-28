# Modules

Each module consists of at least a start page which defines what to display in the content section.

Within the router you set the `meta.title` which is used as subtitle in the toolbar:

    { path: 'info',
      component: () => import('pages/info'),
      meta: { label: 'core.info.subtitle', public: true } },

The meta data is used for the [layout](layout.md).

Parameters are also possible in routes using syntax from [path-to-regexp](https://github.com/pillarjs/path-to-regexp#parameters):

    { path: 'users/:id',
      component: () => import('pages/users/detail'),
      meta: { module: 'core.users' } },

## Server Access

This can be done in two ways, directly through the feathers API or using the store.

To access server data directly zjtough the feathers API you may add a property which is set after component is created:

    data: () => ({
      tableData: []
    }),
    async created () {
      try {
        const data = await this.$feathers.service('info').find()
        this.tableData = data
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
      }
    }

## Create Module

The basic steps are:
1. make the neccessary REST Service working
2. add module translations under `i18n/en/...`
3. add a router entry in `router/routes.js`
4. add link to `components/sidebarMenu.vue`
5. create the pages under `pages`

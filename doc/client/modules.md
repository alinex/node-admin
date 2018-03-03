# Modules

Each module consists of at least a start page which defines what to display in the content section.

Within the router you set the `meta.title` which is used as subtitle in the toolbar:

    { path: 'info',
      component: () => import('pages/info'),
      meta: { title: 'Server Information' } },

## Data Loading

To access server data you may add a property which is set after component is created:

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

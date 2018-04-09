# Server Connection

The client will connect to the REST server using the [FeathersJS Client](https://github.com/feathersjs/client). This is completely integrated into the client this.$feathers.
The server URL will be 
- the URL given as `API` environment setting while building or
- port 3030 on the same host in development or
- a url defined in quasar.conf for production

It may be used directly or through the state management store described in the next chapter.

The base configuration is done in the `plugins/feathers.js`.

Keep in mind that if a page needs data which will be retrieved from the server you better put this into the `ax-loader` component to not run in to error because of uninitialized data.

## Direct use

Like described in the [Server REST API](../server/rest.md) the client can use the following methods:

### Find

Retrieves a list of all matching resources from the service:

    this.$feathers.service('info').find()

__Filtering__

You can also send additional filtering constraints on specific field values.
To get only records with 'group' equal 'node':

    this.$feathers.service('info').find({
      query: {
        group: 'node'
      }
    })

You may also use any of the built-in find operands ($le, $lt, $ne, $eq, $in, etc.) the general format is as follows.

| Operand | Usage | Comment |
| ------- | ----- | ------- |
| -       | `field: value` | Simple equality |
| `$ne`   | `field: {$ne: value}` | Field is not equal value |
| `$in`   | `field: {$in: [value, ...]}` | In list of values |
| `$nin`  | `field: {$nin: [value, ...]}` | Not in list of values |
| `$lt`   | `field: {$lt: value}` | Field lower than given value |
| `$lte`  | `field: {$lt: value}` | Field lower or equal than given value |
| `$gt`   | `field: {$lt: value}` | Field greater than given value |
| `$lte`  | `field: {$lt: value}` | Field greater or equal than given value |

For example, to find all records which are not in group 'node':

    this.$feathers.service('info').find({
      query: {
        name: {
          $ne: 'node'
        }
      }
    })

You can also specify multiple fields which habe to be all matching the defined parameters.
Thats like an _and_ search. To make alternative groups of restrictions use `$or`:

    this.$feathers.service('info').find({
      query: {
        $or: [
          { group: { $ne: 'node' } },
          { name: 'cpu' }
        ]
      }
    });

__Limit__

Most services support pagination here with the additional parameters. If nothing is
given the preconfigured default will be used.

`$limit` will return only the number of results you specify.
Retrieves the first ten values:

    this.$feathers.service('info').find({
      query: {
        $limit: 10
      }
    })

If you want to get only the number of records you may also set `$limit` to `0`.
This ensures that no record is retrieved but you get the meta info like totalmemin the returned page object.

__Offset (skip)__

`$skip` will skip the specified number of results. If you skip 2 records the result
will start with record number 3, so to show record 3 and 4:

    this.$feathers.service('info').find({
      query: {
        $limit: 2,
        $skip: 2
      }
    })

__Sorting__

`$sort` will sort based on the object you provide. It can contain a list of properties
by which to sort mapped to the order (1 ascending, -1 descending).

    this.$feathers.service('info').find({
      query: {
        $sort: {
          name: 1
        }
      }
    })

__Select columns__

`$select` allows to pick which fields to include in the result.

To only retrieve the fields 'name' and 'value' but not the group call:

    this.$feathers.service('info').find({
      query: {
        $select: [ 'name', 'value' ]
      }
    })

### Get

Retrieve a single resource from the service by its ID:

    this.$feathers.service('messages').get(this.$route.params.id)

`$select` allows to pick which fields to include in the record:

    this.$feathers.service('messages').get(this.$route.params.id, {
      query: {
        $select: [ 'text' ]
      }
    })

### Create

Create a new resource with data.

    this.$feathers.service('messages').create(
      { "text": "I really have to iron" }
    )

You may also create multiple records in one call:

    this.$feathers.service('messages').create([  
      { "text": "I really have to iron" },
      { "text": "Do laundry" }
    ])

### Update

Completely replace a single or multiple resources.

Given an ID the specified record will be replaced:

    this.$feathers.service('messages').update(this.data._id,  
      { "text": "I really have to do laundry" }
    )

### Patch

Merge the existing data of a single or multiple resources with the new data.

    this.$feathers.service('messages').patch(this.data._id,  
      { "read": true }
    )

When no id is given patch all records or select some using query parameters:

    this.$feathers.service('messages').patch(
      { "read": true }
    )

See the description for filtering in the `find` method above.

### Remove

Remove a single or multiple resources.

If an id is given only this will be removed.

    this.$feathers.service('messages').delete(this.data._id)

But you may also call it without an id but a filter definition:

    this.$feathers.service('messages').delete(
      { "read": true }
    )

See the description for filtering in the `find` method above.

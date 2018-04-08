# REST API

The concrete API is displayed through the included [Swagger](https://swagger.io/) API documentation which you can access through the `/swagger` URL.

The server may be called through plain HTTP Requests or using the Feathers Client through Socket.io. The following description shows both types.

| Service | HTTP method | Path        |
| ------- | ----------- | ----------- |
| .find() | GET  	      | /messages   |
| .get() 	| GET 	      | /messages/1 |
| .create() 	| POST 	  | /messages   |
| .update() 	| PUT 	  | /messages/1 |
| .patch() 	  | PATCH 	| /messages/1 |
| .remove() 	| DELETE 	| /messages/1 |

To help working on the command line install:

    $ npm install -g prettyjson

Now you can call any REST message using curl and display it in readable form:

    $ curl -sX GET http://localhost:3030/messages/ | prettyjson
    {"total":0,"limit":10,"skip":0,"data":[]}

## Find

Retrieves a list of all matching resources from the service:

    GET /info

    app.service('info').find();

### Filtering

You can also send additional filtering constraints on specific field values.
To get only records with 'group' equal 'node':

    GET /info?group=node

    app.service('info').find({
      query: {
        group: 'node'
      }
    });

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

    GET /info?name[$ne]=node

    app.service('info').find({
      query: {
        name: {
          $ne: 'node'
        }
      }
    });

You can also specify multiple fields which habe to be all matching the defined parameters.
Thats like an _and_ search. To make alternative groups of restrictions use `$or`:

    GET /info?$or[0][group][$ne]=node&$or[1][name]=cpu

    app.service('info').find({
      query: {
        $or: [
          { group: { $ne: 'node' } },
          { name: 'cpu' }
        ]
      }
    });

### Limit

Most services support pagination here with the additional parameters. If nothing is
given the preconfigured default will be used.

`$limit` will return only the number of results you specify.
Retrieves the first ten values:

    GET /info?$limit=10

    app.service('info').find({
      query: {
        $limit: 10
      }
    });

If you want to get only the number of records you may also set `$limit` to `0`.
This ensures that no record is retrieved but you get the meta info like totalmemin the returned page object.

### Offset (skip)

`$skip` will skip the specified number of results. If you skip 2 records the result
will start with record number 3, so to show record 3 and 4:

    GET /info?$limit=2&$skip=2

    app.service('info').find({
      query: {
        $limit: 2,
        $skip: 2
      }
    });

### Sorting

`$sort` will sort based on the object you provide. It can contain a list of properties
by which to sort mapped to the order (1 ascending, -1 descending).

    /info?$sort[name]=1

    app.service('info').find({
      query: {
        $sort: {
          name: 1
        }
      }
    });

### Select columns

`$select` allows to pick which fields to include in the result.

To only retrieve the fields 'name' and 'value' but not the group call:

    GET /info?$select[]=name&$select[]=value

    app.service('info').find({
      query: {
        $select: [ 'name', 'value' ]
      }
    });

## Get

Retrieve a single resource from the service by its ID:

    GET /messages/1

    app.service('messages').get(1);

`$select` allows to pick which fields to include in the record:

    GET /messages/1?$select[]=text

    app.service('messages').get(1, {
      query: {
        $select: [ 'text' ]
      }
    });

## Create

Create a new resource with data.

    POST /messages
    { "text": "I really have to iron" }

    app.service('messages').create(
      { "text": "I really have to iron" }
    );

You may also create multiple records in one call:

    POST /messages
    [
      { "text": "I really have to iron" },
      { "text": "Do laundry" }
    ]

    app.service('messages').create([  
      { "text": "I really have to iron" },
      { "text": "Do laundry" }
    ]);

## Update

Completely replace a single or multiple resources.

Given an ID the specified record will be replaced:

    PUT /messages/2
    { "text": "I really have to do laundry" }

    app.service('messages').update(2,  
      { "text": "I really have to do laundry" }
    );

## Patch

Merge the existing data of a single or multiple resources with the new data.

    PATCH /messages/2
    { "read": true }

    app.service('messages').patch(2,  
      { "read": true }
    );

When no id is given patch all records or select some using query parameters:

    PATCH /messages?complete=false
    { "complete": true }

See the description for filtering in the `find` method above.

## Remove

Remove a single or multiple resources.

If an id is given only this will be removed.

    DELETE /messages/2

But you may also call it without an id and a filter definition:

    DELETE /messages?read=true

See the description for filtering in the `find` method above.

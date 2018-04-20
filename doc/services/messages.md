# Chat Messages

The user service will be used internally by the authentication service to check for authenticated users.
Also it is used for user management and client.

The service is partly secured.

## Model

The user has the following fields are used:
- `user` - reference to users entry
- `text` - message text
- `createdAt` - date/time account created at
- `updatedAt` - date/time the record was last changed

## find - list messages

Only for authenticated users.

## get - message record

Only for authenticated users.

## create - new message

Password will be encrypted.

## update - replace record

Only for authenticated users.
Password will be encrypted.

## patch - change some values

Only for authenticated users.
Password will be encrypted.

## remove - message

Only for authenticated users.

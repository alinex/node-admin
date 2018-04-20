# Chat Messages

The user service will be used internally by the authentication service to check for authenticated users.
Also it is used for user management and client.

The service is partly secured.

## Model

The user has the following fields are used:
- `email` - email address used for login
- `password` - `bcrypt` encrypted password
- `nickname` - nickname used to be displayed in the system
- `name` - fullname (for administration only)
- `position` - position within this area
- `avatar` - gravatar link as user icon
- `disabled` - flag to disable user
- `createdAt` - date/time account created at
- `updatedAt` - date/time the record was last changed

## find - list users

Only for authenticated users.

## get - user record

Only for authenticated users.

## create - new user

Password will be encrypted.

## update - replace record

Only for authenticated users.
Password will be encrypted.

## patch - change some values

Only for authenticated users.
Password will be encrypted.

## remove - user

Only for authenticated users.

# Store Structure

The state management store contains the following structure.

### Auth

The auth module is used for authentication through login/logout processes. 

It contains the following actions:
- `authenticate({ strategy: 'local', email, password })`
- `logout()`

States are:
- `auth.accessToken` - the encrypted JWT string
- `auth.errorOnAuthenticate` - `Error` which occured on last login
- `auth.errorOnLogout` - `Error` which occured on last logout
- `auth.isAuthenticatePending` - 'true' while login in progress
- `auth.isLogoutPending` - 'true' while logout in progress
- `auth.payload` - JWT payload data (decrypted)
- `auth.user` - record from the `users` service

### Users

This is used to access user information.

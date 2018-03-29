# Store Structure

The state management store contains the following structure.

### Layout

Containing some general layout state:
- `layout.login` - is the login dialog opened

Possible mutations:
- `'layout/login'` - to switch state
- `'layout/login', bool` - to set state for opened login dialog

### Auth

The auth module is used for authentication through login/logout processes. 

States are:
- `auth.accessToken` - the encrypted JWT string
- `auth.errorOnAuthenticate` - `Error` which occured on last login
- `auth.errorOnLogout` - `Error` which occured on last logout
- `auth.isAuthenticatePending` - 'true' while login in progress
- `auth.isLogoutPending` - 'true' while logout in progress
- `auth.payload` - JWT payload data (decrypted)
- `auth.user` - record from the `users` service

It contains the following actions:
- `auth.authenticate({ strategy: 'local', email, password })`
- `auth.logout()`

### Users

This is used to access user information.

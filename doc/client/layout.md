# Layout

The whole application has a general 'default' layout which is used throughout most pages. It defines the basic page layout with:
- dropdown menu (account and settings)
- title bar
- side bar
- content area

## Files

- `layouts/default.vue` - general layout
- `components/sidebarMenu.vue` - definition of sidebar with module selection
- `components/loginDialog.vue` - dialog and handling of login

## Routes

Within the routes the following meta data is set to make the layout working:

    meta: { 
      label: 'core.info.subtitle', 
      public: true 
    }

The `label` is used as the key to get text for the subtitle in the toolbar from the i18n module. If not set the `title` field will be directly used or nothing.

If `public` is set the page will be also be shown if user isn'T authenticated. Else the user is forwarded to the login form.

# Structure

The client structure is really self explaining. The development code is set within the `src` directory excluding the `/quasar.conf.js`.

The `src` directory contains the parts defined in the following sections.

## assets/

Dynamic assets (processed by webpack) like images and bundled together.

## statics/

Pure static assets (directly copied) to the distribution directory.
Here the `favicon.png` belongs to.

## plugins/

App plugins (app initialization code)

## router/ 

Client router definition.

## store/

Setup of the state management store.

## layouts/

Page layouts (.vue files) defining the structure of the page.

## pages/  

Single pages (.vue files)

## components/

Components (.vue files) used in pages & layouts.

## mixins/

Code mixins (.js files) which are mixed into the component, layout or page.

## css/

CSS/Stylus/Sass/... files for your app

## i18n/

General app translations.

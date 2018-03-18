# Structure

The client structure is really self explaining. The development code is set within the `src` directory excluding the `/quasar.conf.js`.

The `src` directory contains the parts defined in the following sections.

## assets/

Dynamic assets (processed by webpack) like images.

## statics/

Pure static assets (directly copied) to the distribution directory.
Here the `favicon.png` belongs to.

## components/

Components (.vue files) used in pages & layouts.

## css/

CSS/Stylus/Sass/... files for your app

## layouts/

Page layouts (.vue files) defining the structure of the page.

## mixins/

Code mixins (.js files) which are mixed into the component, layout or page.

## pages/  

Single pages (.vue files)

## plugins/

app plugins (app initialization code)

## router/ 

Client router definition.

## store/

Setup of the state management store.

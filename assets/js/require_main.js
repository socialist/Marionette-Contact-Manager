requirejs.config({
  baseUrl: '/',
  paths: {
    backbone: 'vendor/backbone/backbone-min',
    localstorage: 'vendor/backbone.localStorage/backbone.localStorage-min',
    wreqr: 'vendor/backbone.wreqr/lib/backbone.wreqr.min',
    'backbone.syphon': 'vendor/backbone.syphon/lib/backbone.syphon.min',
    'backbone.select': 'vendor/backbone.select/dist/backbone.select.min',
    jquery: 'vendor/jquery/dist/jquery',
    json2: 'vendor/json2/json2',
    marionette: 'vendor/backbone.marionette/lib/backbone.marionette',
    underscore: 'vendor/underscore/underscore-min',
    tpl: 'vendor/requirejs-underscore-tpl/underscore-tpl',
    text: 'vendor/text/text',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min',
    tether: 'vendor/tether/dist/js/tether.min',
    'jquery.spinner': 'vendor/spin/javascripts/jquery.spin',

    app: 'assets/js/app'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore', 'json2'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    },
    localstorage: {
      deps: ['backbone']
    },
    tether: {
      exports: 'Tether'
    },
    bootstrap: {
      deps: ['jquery', 'tether']
    },
    'jquery.spinner': ['jquery'],
    wreqr: ['backbone'],
    'backbone.syphon': ['backbone'],
    'backbone.select': ['backbone'],
    tpl: ['text']
  }
});

require(['app', 'assets/js/apps/sidebar/sidebar_app'], function (ContactManager) {
  ContactManager.start();
});


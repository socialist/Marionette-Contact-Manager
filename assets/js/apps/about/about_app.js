/**
 * Created by socialist on 21.01.16.
 */
define(['app'], function (ContactManager) {
  ContactManager.module('AboutApp', function (AboutApp, ContactManager, Backbone, Marionette, $, _) {
    AboutApp.startWithParent = false;

    AboutApp.onStart = function () {
      console.log('Starting AboutApp');
    };

    AboutApp.onStop = function () {
      console.log('Stoping AboutApp');
    };
  });


  ContactManager.module('Routers.AboutApp', function (AboutAppRouter, ContactManager, Backbone, Marionette, $, _) {
    var API;

    AboutAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'about': 'showAbout'
      }
    });

    API = {
      showAbout: function () {
        require(['assets/js/apps/about/show/show_controller'], function (ShowController) {
          ContactManager.startSubApp('AboutApp');
          ShowController.showAbout();
          ContactManager.execute('set:active:sidebar', 'about');
        });
      }
    };

    ContactManager.on('about:show', function () {
      ContactManager.navigate('about');
      API.showAbout();
    });

    ContactManager.addInitializer(function () {
      new AboutAppRouter.Router({
        controller: API
      });
    });
  });

  return ContactManager.AboutAppRouter;
});
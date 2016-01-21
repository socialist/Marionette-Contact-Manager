/**
 * Created by socialist on 20.01.16.
 */
define([ 'marionette', 'backbone', 'assets/js/apps/config/marionette/regions/dialog'], function (Marionette, Backbone) {
  var ContactManager;

  ContactManager = new Marionette.Application();

  ContactManager.addRegions({
    sidebarRegion: '#HeaderRegion',
    mainRegion: '#MainRegion',
    dialogRegion: Marionette.Region.Dialog.extend({
      el: '#DialogRegion'
    })
  });

  ContactManager.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  ContactManager.getCurrentRoute = function () {
    return Backbone.history.fragment;
  };

  ContactManager.on('start', function () {
    var self = this;
    if (Backbone.history) {
      require(['assets/js/apps/contacts/contacts_app'], function () {
        Backbone.history.start();

        if (self.getCurrentRoute() === '') {
          ContactManager.trigger('contacts:list');
        }
      });
    }
  });

  return ContactManager;
});

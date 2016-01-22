/**
 * Created by socialist on 22.01.16.
 */
define(['app', 'backbone.select'], function (ContactManager) {
  ContactManager.module('Entities', function (Entities, ContactManager, Backbone, Marionette, $, _) {
    var initializeSidebar, API;

    Entities.Sidebar = Backbone.Model.extend({
      initialize: function () {
        Backbone.Select.Me.applyTo(this);
      }
    });

    Entities.SidebarCollection = Backbone.Collection.extend({
      model: Entities.Sidebar,

      initialize: function (models, options) {
        Backbone.Select.One.applyTo(this, models, options);
      }
    });

    initializeSidebar = function () {
      Entities.sidebarItems = new Entities.SidebarCollection([
          {name: 'Contacts', url: 'contacts', navigationTrigger: 'contacts:list'},
          {name: 'About', url: 'about', navigationTrigger: 'about:show'}
      ]);
    };

    API = {
      getSidebar: function () {
        if (Entities.sidebarItems === undefined) {
          initializeSidebar();
        }

        return Entities.sidebarItems;
      }
    };

    ContactManager.reqres.setHandler('sidebar:entities', function () {
      return API.getSidebar();
    });

  });

  return ;
});
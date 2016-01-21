/**
 * Created by socialist on 20.01.16.
 */
define(['app'], function (ContactsManager) {
  ContactsManager.module('ContactsApp', function (ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'contacts': 'listContacts'
      }
    });

    var API = {
      listContacts: function (criteria) {
        require(['assets/js/apps/contacts/list/list_controller'], function (ListController) {
          ListController.listContacts(criteria);
        });
      }
    };

    ContactManager.on('contacts:list', function () {
      ContactManager.navigate('contacts');
      API.listContacts();
    });

    ContactManager.addInitializer(function () {
      new ContactsApp.Router({
        controller: API
      });
    });
  });

  return ContactsManager.ContactsApp;
});
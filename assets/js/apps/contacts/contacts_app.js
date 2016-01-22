/**
 * Created by socialist on 20.01.16.
 */
define(['app'], function (ContactsManager) {
  ContactsManager.module('ContactsApp', function (ContactsManager, ContactsApp, Backbone, Marionette, $, _) {
    ContactsApp.startWithParent = false;

    ContactsApp.onStart = function () {
      console.log('starting ContactsApp');
    };

    ContactsApp.onStop = function () {
      console.log('stoping ContactsApp');
    };
  });


  ContactsManager.module('Routers.ContactsApp', function (ContactsAppRouter, ContactManager, Backbone, Marionette, $, _) {
    var API, executeAction;

    ContactsAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'contacts(/filter/criteria::criteria)': 'listContacts',
        'contacts/:id': 'showContact',
        'contacts/:id/edit': 'editContact'
      }
    });

    executeAction = function (action, arg) {
      ContactManager.startSubApp('ContactsApp');
      action(arg);
      ContactManager.execute('set:active:sidebar', 'contacts');
    }

    API = {
      listContacts: function (criteria) {
        require(['assets/js/apps/contacts/list/list_controller'], function (ListController) {
          executeAction(ListController.listContacts, criteria);
        });
      },

      showContact: function (id) {
        require(['assets/js/apps/contacts/show/show_controller'], function (ShowController) {
          executeAction(ShowController.showContact, id);
        });
      },

      editContact: function (id) {
        require(['assets/js/apps/contacts/edit/edit_controller'], function (EditController) {
          executeAction(EditController.editContact, id);
        });
      }
    };

    ContactManager.on('contacts:list', function () {
      ContactManager.navigate('contacts');
      API.listContacts();
    });

    ContactManager.addInitializer(function () {
      new ContactsAppRouter.Router({
        controller: API
      });
    });

    ContactManager.on('contacts:filter', function (criteria) {
      if (criteria) {
        ContactManager.navigate('contacts/filter/criteria:' + criteria);
      }
      else {
        ContactManager.navigate('contacts');
      }
    });

    ContactManager.on('contact:show', function (id) {
      ContactManager.navigate('contacts/' + id);
      API.showContact(id);
    });

    ContactManager.on('contact:edit', function (id) {
      ContactManager.navigate('contacts/' + id + '/edit');
      API.editContact(id);
    });
  });

  return ContactsManager.ContactsAppRouter;
});
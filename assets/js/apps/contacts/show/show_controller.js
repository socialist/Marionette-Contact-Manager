/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'assets/js/apps/contacts/show/show_view'], function (ContactManager, View) {
  ContactManager.module('ContactsApp.Show', function (Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
      showContact: function (id) {
        require(['assets/js/common/loader', 'assets/js/entities/contact'], function (CommonLoader) {
          var LoadingView, promise;

          LoadingView = new CommonLoader.Loading({
            title: 'Arificial Loading Delay',
            message: 'Data loading is delayed to demonstrate using a load view'
          });
          ContactManager.mainRegion.show(LoadingView);

          promise = ContactManager.request('contact:entity', id);
          promise.then(function (contact) {
            var contactView;

            if (contact !== undefined) {
              contactView = new View.Contact({
                model: contact
              });

              contactView.on('contact:edit', function (contact) {
                ContactManager.trigger('contact:edit', contact.get('id'));
              });
            }
            else {
              contactView = new View.MissingContact();
            }

            ContactManager.mainRegion.show(contactView);
          });
        });
      }
    };
  });

  return ContactManager.ContactsApp.Show.Controller;
});
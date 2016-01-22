/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'assets/js/apps/contacts/edit/edit_view'], function (ContactManager, View) {
  ContactManager.module('ContactsApp.Edit', function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
      editContact: function (id) {
        require(['assets/js/common/loader', 'assets/js/entities/contact'], function (CommonLoader) {
          var LoadingView, promise;
          LoadingView = new CommonLoader.Loading({
            title: 'Arificial Loading Delay',
            message: 'Data loading is delayed to demonstrate using a loading view'
          });
          ContactManager.mainRegion.show(LoadingView);

          promise = ContactManager.request('contact:entity', id);
          promise.then(function (contact) {
            var view;

            if (contact !== undefined) {
              view = new View.Contact({
                model: contact,
                generateTitle: true
              });

              view.on('form:submit', function (data) {
                if (contact.save(data)) {
                  ContactManager.trigger('contact:show', contact.get('id'));
                }
                else {
                  view.triggerMethod('form:data:invalid', contact.validationError);
                }
              });
            }
            else {
              view = new ContactManager.ContactsApp.Show.MissingContact();
            }

            ContactManager.mainRegion.show(view);
          });
        });
      }
    };
  });

  return ContactManager.ContactsApp.Edit.Controller;
});
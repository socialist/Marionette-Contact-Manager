/**
 * Created by socialist on 20.01.16.
 */
define(['app', 'assets/js/apps/contacts/list/list_view', 'assets/js/common/loader'], function (ContactManager, View, CommonView) {
  ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
      listContacts: function (criteria) {
        var LoadingView;

        LoadingView = new CommonView.Loading();
        ContactManager.mainRegion.show(LoadingView);

        require(['assets/js/entities/contact'], function () {
          var promise, contactsListLayout, contactsListPanel;

          promise = ContactManager.request('contact:entities');

          contactsListLayout = new List.Layout();
          contactsListPanel = new List.Panel();

          promise.then(function (contacts) {
            require(['assets/js/entities/common'], function (FilteredCollection) {
              var filteredContacts, contactsListView;

              filteredContacts = FilteredCollection({
                collection: contacts,
                
                filterFunction: function (filterCriteria) {
                  var criteria = filterCriteria.toLowerCase();
                  
                  return function (contact) {
                    if (contact.get('firstName').toLowerCase().indexOf(criteria) !== -1 ||
                        contact.get('lastName').toLowerCase().indexOf(criteria) !== -1 ||
                        contact.get('phoneNumber').toLowerCase().indexOf(criteria) !== -1) {
                      return contact;
                    }
                  };
                }
              });

              if (criteria) {
                filteredContacts.filter(criteria);
                contactsListPanel.once('show', function () {
                  contactsListPanel.triggerMethod('set:filter:criteria', criteria);
                });
              }

              contactsListView = new List.Contacts({
                collection: filteredContacts
              });

              contactsListPanel.on('contacts:filter', function (filterCriteria) {
                filteredContacts.filter(filterCriteria);
                ContactManager.trigger('contacts:filter', filterCriteria);
              });

              contactsListLayout.on('show', function () {
                contactsListLayout.panelRegion.show(contactsListPanel);
                contactsListLayout.contactsRegion.show(contactsListView);
              });

              contactsListView.on('childview:contact:edit', function (childView, args) {
                require(['assets/js/apps/contacts/edit/edit_view'], function (EditView) {
                  var model, view;

                  model = args.model;

                  view = new EditView.Contact({
                    model: model
                  });

                  view.on('form:submit', function (data) {
                    if (model.save(data)) {
                      childView.render();
                      view.trigger('dialog:close');
                      childView.flash('success');
                    }
                    else {
                      view.triggerMethod('form:data:invalid', model.validationError);
                    }
                  });

                  ContactManager.dialogRegion.show(view);
                });

              });

              contactsListPanel.on('contact:new', function () {
                require(['assets/js/apps/contacts/new/new_view'], function (NewView) {
                  var newContact, view;

                  newContact = ContactManager.request('contact:entity:new');

                  view = new NewView.Contact({
                    model: newContact
                  });

                  view.on('form:submit', function (data) {
                    if (contacts.length > 0) {
                      var highestId = contacts.max(function (c) {
                        return c.id;
                      }).get('id');
                      data.id = highestId + 1;
                    }
                    else {
                      data.id = 1;
                    }

                    if (newContact.save(data)) {
                      var newContactView;

                      contacts.add(newContact);
                      view.trigger('dialog:close');
                      newContactView = contactsListView.children.findByModel(newContact);
                      if (newContactView) {
                        newContactView.flash('table-success');
                      }
                    }
                    else {
                      view.triggerMethod('form:data:invalid', newContact.validationError);
                    }
                  });

                  ContactManager.dialogRegion.show(view);
                });
              });

              contactsListView.on('childview:contact:show', function (childView, args) {
                console.log(arguments);
                ContactManager.trigger('contact:show', args.model.get('id'));
              });

              contactsListView.on('childview:contact:delete', function (childView, args) {
                args.model.destroy();
              });

              ContactManager.mainRegion.show(contactsListLayout);

            });

          });
        });
      }
    };
  });

  return ContactManager.ContactsApp.List.Controller;
});
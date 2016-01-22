/**
 * Created by socialist on 20.01.16.
 */
define(['app', 'assets/js/apps/config/storage/localstorage'], function (ContactManager) {
  ContactManager.module('Entities', function (Entities, ContactManager, Backbone, Marionette, $, _) {
    var contacts, initializeContacts, API;

    Entities.Contact = Backbone.Model.extend({
      urlRoot: 'contacts',

      defaults: {
        firstName: '',
        lastName: '',
        phoneNumber: ''
      },

      validate: function (attrs, options) {
        var errors = {};

        if (!attrs.firstName) {
          errors.firstName = 'Can\'t be blank';
        }

        if (!attrs.lastName) {
          errors.lastName = 'Can\'t be blank';
        }
        else {
          if (attrs.lastName.length < 2) {
            errors.lastName = 'is to short';
          }
        }

        if (!attrs.phoneNumber) {
          errors.phoneNumber = 'Can\'t be blank';
        }

        if (!_.isEmpty(errors)) {
          return errors;
        }
      }
    });

    Entities.configureStorage(Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
      url: 'contacts',
      model: Entities.Contact,

      comparator: function (contact) {
        return contact.get('firstName') + ' ' + contact.get('lastName');
      }
    });

    Entities.configureStorage(Entities.ContactCollection);

    initializeContacts = function () {
      contacts = new Entities.ContactCollection([
        {id: 1, firstName: 'Alice', lastName: 'Arten', phoneNumber: '555-0184'},
        {id: 2, firstName: 'Bob', lastName: 'Brigham', phoneNumber: '555-0163'},
        {id: 3, firstName: 'Charlie', lastName: 'Campbell', phoneNumber: '555-0129'}
      ]);

      contacts.forEach(function (contact) {
        contact.save();
      });

      return contacts;
    };

    API = {
      getContactEntities: function () {
        var contacts, promise;

        contacts = new Entities.ContactCollection();

        promise = new Promise(function (resolve) {
          setTimeout(function () {
            contacts.fetch({
              success: function (data) {
                resolve(data);
              },
              error: function () {
                resolve(undefined);
              }
            });
          }, 1000);
        });

        return promise.then(function (contacts) {

          if (contacts.length === 0) {
            return initializeContacts();
          }

          return contacts;
        });
      },

      getContactEntity: function (contactId) {
        var contact;

        contact = new Entities.Contact({
          id: contactId
        });

        return new Promise(function (resolve) {
          setTimeout(function () {
            contact.fetch({
              success: function (data) {
                resolve(data);
              },
              error: function () {
                resolve(undefined);
              }
            });
          }, 1000);
        });
      }
    };

    ContactManager.reqres.setHandler('contact:entities', function () {
      return API.getContactEntities();
    });

    ContactManager.reqres.setHandler('contact:entity', function (id) {
      return API.getContactEntity(id);
    });

    ContactManager.reqres.setHandler('contact:entity:new', function (id) {
      return new Entities.Contact(id);
    });
  });

  return ;
});
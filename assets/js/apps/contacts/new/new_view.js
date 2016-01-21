/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'assets/js/apps/contacts/common/views'], function (ContactManager, CommonViews) {
  ContactManager.module('ContactsApp.New.View', function (View, ContactManager, Backbone, Marionette, $, _) {
    View.Contact = CommonViews.Form.extend({
      title: 'New Contact',

      onRender: function () {
        this.$('.js-submit').text('Create contact');
      }
    });
  });
  return ContactManager.ContactsApp.New.View;
});
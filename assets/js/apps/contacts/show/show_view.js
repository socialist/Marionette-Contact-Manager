/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'tpl!assets/js/apps/contacts/show/templates/view.tpl',
  'tpl!assets/js/apps/contacts/show/templates/missing.tpl'], function (ContactManager, viewTpl, missingTpl) {
  ContactManager.module('ContactsApp.Show.View', function (View, ContactManager, Backbone, Marionette, $, _) {
    View.MissingContact = Marionette.ItemView.extend({
      template: missingTpl
    });

    View.Contact = Marionette.ItemView.extend({
      template: viewTpl,

      events: {
        'click a,js-edit': 'editClicked'
      },

      editClicked: function (e) {
        e.preventDefault();
        this.trigger('contact:edit', this.model);
      }
    });
  });

  return ContactManager.ContactsApp.Show.View;
});
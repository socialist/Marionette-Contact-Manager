/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'tpl!assets/js/apps/about/show/templates/message.tpl'], function (ContactManager, aboutTpl) {
  ContactManager.module('AboutApp.Show.View', function (View, ContactManager, Backbone, Marionette, $, _) {
    View.Message = Marionette.ItemView.extend({
      template: aboutTpl
    });
  });

  return ContactManager.AboutApp.Show.View;
});
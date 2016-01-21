/**
 * Created by socialist on 21.01.16.
 */
define(['app', 'tpl!assets/js/apps/contacts/common/templates/form.tpl', 'backbone.syphon'], function (ContactManager, formTpl) {
  ContactManager.module('ContactsApp.Common.Views', function (Views, ContactManager, Backbone, Marionette, $, _) {
    Views.Form = Marionette.ItemView.extend({
      template: formTpl,

      events: {
        'click button.js-submit': 'submitClicked'
      },

      submitClicked: function (e) {
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      onFormDataInvalid: function (errors) {
        var $view, clearFormErrors, markErrors;

        $view = this.$el;

        clearFormErrors = function () {
          var $form = $view.find('form');

          $form.find('.help-inline.error').each(function () {
            $(this).remove();
          });

          $form.find('.control-group.error').each(function () {
            $(this).removeClass('error');
          });
        };

        markErrors = function (value, key) {
          var $controlGroup, $errorEl;

          $controlGroup = $view.find('#contact-' + key).parent();
          $errorEl = $('<span>', {
            class: 'help-inline error',
            text: value
          });

          $controlGroup.append($errorEl).addClass('has-error');
        };

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return ContactManager.ContactsApp.Common.Views;
});